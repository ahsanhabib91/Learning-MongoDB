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

