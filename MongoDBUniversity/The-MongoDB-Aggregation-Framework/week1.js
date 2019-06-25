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
    { // stage 4
        $limit: 5
    }
]);


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




























