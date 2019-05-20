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
}) // https://docs.mongodb.com/manual/reference/operator/query/expr/#op._S_expr
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
} )


