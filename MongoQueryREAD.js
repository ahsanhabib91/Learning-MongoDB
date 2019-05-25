// 07 Read Operations - A Closer Look
// The queries are based on tv-shows.json

// Query Selectors: https://docs.mongodb.com/manual/reference/operator/query/#query-selectors


// Comparison Operators
db.movies.find({ runtime: { $gt: 60 } })
db.movies.find({ runtime: { $in: [30, 42] } }) // match all docs with runtime: 30 or 40
db.movies.find({ runtime: { $nin: [30, 42] } }) // match all docs where runtime: not equal 30 or 40
db.movies.find({ "rating.average": { $lte: 5 } }) // can query embeded document
db.movies.find({ genres: "Drama" }) // whether Drama exists in genres array
db.movies.find({ genres: [ "Drama" ] }) // genres is exactly array [ "Drama" ]


// Logical Operators
db.movies.find({ $or: [ {"rating.average": {$lt: 5}}, {"rating.average": {$gt: 9.3}} ] }) // match documents (<5 or >9.3)
db.movies.find({ $nor: [ {"rating.average": {$lt: 5}}, {"rating.average": {$gt: 9.3}} ] }) // match documents (!<5 or !>9.3). i.e. (>5 and <9.3). $nor	Joins query clauses with a logical NOR returns all documents that fail to match both clauses. i.e. neither condition met.
db.movies.find({ $and: [ {"rating.average": {$gt: 9}}, {"genres": "Drama"} ] }) // match documents (rating.average>9 and "Drama" in genres)
// another way: 
db.movies.find({"rating.average": {$lt: 5}, "genres": "Drama"}) // match documents (rating.average>9 and "Drama" in genres). Default to and
/**
 * But, for same Fields like "genres",
 * db.movies.find({"genres": "Drama", "genres": "Action"}) === db.movies.find({"genres": "Action"}). 
 * Therefore to get the correct results, this needs to be done using the $and operator
 * db.movies.find({ $and: [ {"genres": "Drama"}, {"genres": "Action"} ] })
 */
db.movies.find({ runtime: { $not: {$eq: 60} } }) // match documents where, runtime !== 60
// it also equvalent to: db.movies.find({ runtime: {$ne: 60} })


// Element Operators
db.collection.find({ field_name: { $exists: true } }) // match documents where, Field field_name exists. It includes all type of age values including null, undefined
db.collection.find({ age: {$exists: true, $ne: null} }) // match documents where, Field field_name exists and field_name!==(null/undefined)
db.collection.find({ field_name: { $exists: true, $gte: 22 } }) // match documents where, Field field_name exists and field_name>=22.
db.collection.find({ field_name: { $exists: false } }) // match documents where, Field field_name does not exists.
db.collection.find({ field_name: { $type: ["double", "string"] } }) // match documents where, type of Field field_name is double or string. Ref: https://docs.mongodb.com/manual/reference/operator/query/type/#available-types


// Evaluation Operators
db.movies.find({ summary: { $regex: /musical/ } }) // match documents where, Field summary has the word musical.
db.movies.find({ summary: { $regex: 'musical' } }) // match documents where, Field summary has the word musical.
db.collection.find({ $expr: { $gt: ["$field_1", "$field_2"] } }) // match documents where, field_1 > field_2. Only in mongodb V3.6
db.sales.find({
    $expr: {
        $gt: [ {
            $cond: {
                if: { $gt: ["$volume", 190] },
                then: { $subtract: ["$volume", 30] },
                else: "$volume"
            }
        },
        "$target"]
    }
}) // DBInsertCommand.js -> #3
db.supplies.find( {
    $expr: {
       $lt:[ {
          $cond: {
             if: { $gte: ["$qty", 100] },
             then: { $divide: ["$price", 2] },
             else: { $divide: ["$price", 4] }
           }
       },
       5 ] }
} ) // https://docs.mongodb.com/manual/reference/operator/query/expr/#op._S_expr


// Array Operators
db.users.find({ "hobbies.title": "coding" }) // DBInsertCommand.js -> #2 and #5
db.users.find({hobbies: {$size: 3}}) // match documents where, array Field hobbies length size 3
db.inventory.find( { tags: { $all: [ "appliance", "school", "book" ] } } ) // DBInsertCommand.js -> #4. match documents where, array_Field tags contains "appliance", "school", "book"
db.inventory.find({ tags: ["appliance", "school", "book"]  }).pretty() // exact match
db.scores.find({ results: { $elemMatch: { $gte: 80, $lt: 85 } } }) // DBInsertCommand.js -> #7
db.survey.find({ results: { $elemMatch: { product: "xyz", score: { $gte: 8 } } } }) // DBInsertCommand.js -> #8 match documents where, the results array contains at least one element with both product equal to "xyz" and score greater than or equal to 8.
db.users.find({ $and: [ {"hobbies.title": "writing"}, {"hobbies.frequency": {$gte: 7}} ] }).pretty() // DBInsertCommand.js -> #2 match documents where, any element of hobbies array contains title: "writing" and  any element of hobbies array contains frequency: >=8
db.users.find({ hobbies: { $elemMatch: { title: "writing", frequency: {$gte: 8} } } }).pretty() // DBInsertCommand.js -> #2 match documents where, the hobbies array contains at least one element with both title === "writing" and frequency >= 8.
/* Note the difference between $and and $elemMatch */



// Projection
db.movies.find({}, {_id: 0, name: 1, genres: 1 , runtime: 1, rating: 1}).pretty() // return all documents but only with fields name, genres, runtime, rating. Exclude others. _id is added. to exclude it, make it 0.
db.movies.find({}, {"schedule.time": 1}).pretty() // 
db.movies.find({ genres: "Action" }, {"genres.$": 1}).pretty() // 
db.movies.find({ genres: { $all: ["Drama", "Horror"]} }, {"genres.$": 1}).pretty() // 
db.movies.find({ genres: "Drama"}, { genres: { $elemMatch: { $eq: "Horror" } } }).pretty() // 
db.movies.find({ "rating.average": { $gt: 9 }}, { genres: { $elemMatch: { $eq: "Horror" } } }).pretty() // 
db.movies.find({ "rating.average": { $gt: 9 }}, { genres: { $slice: 2 }, name: 1 }).pretty() // 
db.movies.find({ "rating.average": { $gt: 9 }}, { genres: { $slice: [1, 2] }, name: 1 }).pretty() // in $slice[1, 2] => 1 is the element item to skip. 2 is the data we want to limit
