db.collections.aggregate([ { // stage 1
    "$match": {

    }
}, { // stage 2
    "$project": {

    }
}, {} ], {});
// pipelines are always an array of one or more stages
// stages are composed of one or more aggregation operators or expressions
// expressions may take a single argument or an array of arguments.

// Operators always appear in the KEY position of a document. There's Aggregation-Operators and Query-Operators
// expression always appear in a value position

// $match is a filter rather than a find.
// In $match, we cannot use $where operator. if use $test operator then $match must be the first stage of the pipeline
// $match uses the same syntex as find

// $match is like filter() method and $project is like map()

// mongo "mongodb://cluster0-shard-00-00-jxeqq.mongodb.net:27017,cluster0-shard-00-01-jxeqq.mongodb.net:27017,cluster0-shard-00-02-jxeqq.mongodb.net:27017/aggregations?replicaSet=Cluster0-shard-0" --authenticationDatabase admin --ssl -u m121 -p aggregations --norc




db.solarSystem.aggregate([
    { // stage 1
        $match: {

        }
    }, 
    { // stage 2
        $project: {
            _id: 0,
            name: 1,
            numberOfMoons: 1
        }
    }, 
    { // stage 3
        $sort: { numberOfMoons: -1 }
    },
    { 
        allowDiskUse: true // $sort operation with aggregation pipeline are limited to 100MB RAM by default. To handle large datasets, mention { allowDiskUse: true }
    },
    { // stage 4
        $limit: 5
    },
    { // stage 5
        $count: "numberOfMoons"
    }
]);
// if $sort place early i.e. before $project, unwind in group stage, it can advantage of indxes. Otherwise the $sort will perform in-memory sort which will increase the memory consumption of the server.
// $sort operation with aggregation pipeline are limited to 100MB RAM by default. To handle large datasets, mention { allowDiskUse: true }

db.movies.find({ 
    "imdb.rating": { $gte: 7 },
    "genres": { $nin: ['Crime', 'Horror'] },
    $or: [ { rated: "PG" }, { rated: "G" } ],
    languages: { $all: [ "English" , "Japanese" ] }
})

var pipeline = [ { $match: { "imdb.rating": { $gte: 7 }, "genres": { $nin: ['Crime', 'Horror'] }, $or: [ { rated: "PG" }, { rated: "G" } ], languages: { $all: [ "English" , "Japanese" ] } } }, { $project:  {_id: 0, title: 1, rated: 1} } ]

var pipeline = [ { 
    $match: { 
        "imdb.rating": { $gte: 7 },
        "genres": { $nin: ['Crime', 'Horror'] },
        $or: [ { rated: "PG" }, { rated: "G" } ],
        languages: { $all: [ "English" , "Japanese" ] }   
    },
    $project: {
        _id: 0,
        title: 1,
        rated: 1
    }
} ]

var pipeline = [
    {
        $match: { 
            $split: [ "$title", " " ]
        }
    }, 
    {
        $project: {
            title: 1,
        }
    }
];

db.movies.aggregate(pipeline).itcount()

db.movies.aggregate([ { $match: { writers: { $elemMatch: { $exists: true } } } }, { $project: { writers: 1 } } ])

db.movies.aggregate([ { $project: { _id: 0, title: 1, title_size: { $size: { $split: [ "$title", " " ]}} } }, { $match: { title_size : { $eq: 1 } } } ])

db.movies.aggregate([ { $match: { title: "labors of love"} }, { $project: { _id: 0, title: 1 } } ]).itcount()




var favorites = [
    "Sandra Bullock",
    "Tom Hanks",
    "Julia Roberts",
    "Kevin Spacey",
    "George Clooney"];
    ["Sandra Bullock","Tom Hanks","Julia Roberts","Kevin Spacey","George Clooney"]
db.movies.aggregate([
    {
        $match: {
            "tomatoes.viewer.rating": { $gte: 3 }
        }
    },
    {
        $addFields: {
            "num_favs": { $setIntersection: [ "$cast", ["Sandra Bullock","Tom Hanks","Julia Roberts","Kevin Spacey","George Clooney"] ] }
        }
    },
    {
        $match: {
            num_favs: { $ne: null }
        }
    },
    {
        $project: {
            _id: 0,
            num_favs: 1,
            num_favs_size: {$size: "$num_favs"},
            rating: "$tomatoes.viewer.rating"
        }
    },
    {
        $match: {
            num_favs_size: { $gt: 0 }
        }
    }
]).itcount();


// Answer of Chapter 2: Lab: Using Cursor-like Stages
var favorites = [
    "Sandra Bullock",
    "Tom Hanks",
    "Julia Roberts",
    "Kevin Spacey",
    "George Clooney"];
    ["Sandra Bullock","Tom Hanks","Julia Roberts","Kevin Spacey","George Clooney"]
db.movies.aggregate([
    {
        $match: {
            "tomatoes.viewer.rating": { $gte: 3 },
            cast: { $elemMatch: { $exists: true } },
            countries: "USA",
        }
    },
    {
        $addFields: {
            "num_favs": {$size: { $setIntersection: [ "$cast", favorites ] }}
        }
    },
    {
        $sort: { num_favs: -1, "tomatoes.viewer.rating": -1, title: -1 }
    },
    {
        $project: {
            title: 1
        }
    },
    { $skip: 24 },
    { $limit: 1 },
], { allowDiskUse: true }).pretty();



// Answer of Chapter 2: Lab - Bringing it all together
db.movies.aggregate([
    {
        $match: {
            languages: "English",
            "imdb.rating": { $gte: 1 },
            "imdb.votes": { $gte: 1 },
            year: { $gte: 1990 }
        }
    },
    {
        $addFields: {
            "scaled_votes": {
                $add: [
                  1,
                  {
                    $multiply: [
                      9,
                      {
                        $divide: [
                          { $subtract: ["$imdb.votes", 5] },
                          { $subtract: [1521105, 5] }
                        ]
                      }
                    ]
                  }
                ]
            }
        }
    },
    {
        $addFields: {
            normalized_rating: { $avg: ["$scaled_votes", "$imdb.rating"] }
        }
    },
    {
        $sort: { normalized_rating: 1 }
    },
    { $limit: 1 },
    { 
        $project: { title: 1  }
     }
], { allowDiskUse: true }).pretty()



x_max = 1521105
x_min = 5
min = 1
max = 10
x = imdb.votes

{
    $add: [
      1,
      {
        $multiply: [
          9,
          {
            $divide: [
              { $subtract: ["$imdb.votes", 5] },
              { $subtract: [1521105, 5] }
            ]
          }
        ]
      }
    ]
}



















