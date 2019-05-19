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
