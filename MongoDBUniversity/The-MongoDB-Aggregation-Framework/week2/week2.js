db.movies.aggregate([
    {
        $group: {
            _id: "$year",
            num_films_in_year: { $sum: 1 }
        },
    }, 
    {
        $sort: { num_films_in_year: 1 }
    }
])


db.icecream_data.aggregate([
    {
        $group: {
            _id: null,
            max_avg_high_tmp: { $max: "$trends.avg_high_tmp" }
        }
    },
])
db.icecream_data.aggregate([
    {
        $project: {
            _id: 0,
            max_avg_high_tmp: { $max: "$trends.avg_high_tmp" }
        }
    },
])


db.students.insertMany([
    { "_id": 1, "quizzes": [ 10, 6, 7 ], "labs": [ 5, 8 ], "final": 80, "midterm": 75 },
    { "_id": 2, "quizzes": [ 9, 10 ], "labs": [ 8, 8 ], "final": 95, "midterm": 80 },
    { "_id": 3, "quizzes": [ 4, 5, 5 ], "labs": [ 6, 5 ], "final": 78, "midterm": 70 }
 ])

 db.students.aggregate([
    {
      $group: {
        _id: null,
        quizMax: { $max: "$quizzes"},
        labMax: { $max: "$labs" },
        examMax: { $max: [ "$final", "$midterm" ] }
      }
    }
 ])

// Lab - $group and Accumulators
db.movies.aggregate([
    {
        $match: { 
            // $and : [ {awards: { $regex: /Won/ }}, {awards: { $regex: /Oscar/ }}]
            awards: /Won \d{1,2} Oscars?/
        }
    },
    { 
        $group: { 
            _id: null, 
            highest_rating: { 
                $max: "$imdb.rating" 
            },
            lowest_rating: { 
                $min: "$imdb.rating" 
            },
            average_rating: { 
                $avg: "$imdb.rating" 
            },
            deviation: { 
                $stdDevSamp: "$imdb.rating" 
            },
        } 
    },
])


// The $unwind Stage
db.movies.aggregate([
    {
        $match: {
            "imdb.rating": { $gt: 0 },
            year: { $gte: 2010, $lte: 2015 },
            runtime: { $gte: 90 }
        }
    },
    {
        $unwind: "$genres"
    },
    {
        $group: {
            _id: {
                year: "$year",
                genre: "$genres",
            },
            average_rating: { $avg: "$imdb.rating" }
        }
    },
    { 
        $sort: {
            "_id.year": -1,
            "average_rating": -1,
            // "_id.genre": -1,
        } 
    }
]) // First $sort will perform on "_id.year". Then the sort will perform among the same "average_rating"/"_id.genre".
db.movies.aggregate([
    {
        $match: {
            "imdb.rating": { $gt: 0 },
            year: { $gte: 2010, $lte: 2015 },
            runtime: { $gte: 90 }
        }
    },
    {
        $unwind: "$genres"
    },
    {
        $group: {
            _id: {
                year: "$year",
                genre: "$genres",
            },
            average_rating: { $avg: "$imdb.rating" }
        }
    },
    { 
        $sort: {
            "_id.year": -1,
            "average_rating": -1,
        } 
    },
    {
        $group: {
            _id : "$_id.year",
            genre: { $first: "$_id.genre" },
            average_rating: { $first: "$average_rating" },
        }
    },
    {
        $sort : {
            _id: -1
        }
    }
])

// Lab - $unwind
db.movies.aggregate([
    {
        $match: {
            languages: "English"
        }
    },
    {
        $project: { _id: 0, cast: 1, "imdb.rating": 1 } // keeping only the data necessary for the aggregation stages that follow
    },
    {
        $unwind: "$cast"
    },
    {
        $group: {
            _id: "$cast",
            numFilms: { $sum: 1 },
            average: { $avg: "$imdb.rating" }
        }
    },
    {
        $addFields: {
            average: { 
                $divide: [ {$trunc: {$multiply: [ "$average", 10 ]} }, 10 ] 
            }
        }
    },
    {
        $sort : {
            // _id: 1,
            numFilms: -1
        }
    },
    {
        $limit: 1
    }
])

// The $lookup Stage
db.air_alliances.aggregate([
    {
        $lookup: {
            from: "air_airlines",
            localField: "airlines", // Field of air_alliances
            foreignField: "name",
            as: "airlines"
        }
    }
]).pretty()

// Lab - Using $lookup
db.air_routes.aggregate([
    {
        $match: { airplane: /747|380/ }
    },
    {
        $lookup: {
            from: "air_alliances",
            localField: "airline.name",
            foreignField: "airlines",
            as: "airlines"
        }
    },
    {
        $unwind: "$airlines"
    },
    {
        $group: {
            _id: "$airlines.name",
            no_of_routes: { $sum: 1 }
        }
    }
]).pretty()


// $graphLookup: Simple Lookup
db.parent_reference.aggregate([
    {
        $match: {
            name: "Eliot"
        }
    },
    {
        $graphLookup: {
            from: 'parent_reference',
            startWith: '$_id',
            connectFromField: '_id', // from where the value is taken  
            connectToField: 'reports_to', // To where the value is searched
            as: 'all_reports'
        }
    }
]).pretty()
db.parent_reference.aggregate([
    {
        $match: {
            name: "Shannon"
        }
    },
    {
        $graphLookup: {
            from: 'parent_reference',
            startWith: '$reports_to',
            connectFromField: 'reports_to', // from where the value is taken 
            connectToField: '_id', // To where the value is searched
            as: 'bosses'
        }
    }
]).pretty()
db.child_reference.aggregate([
    {
        $match: {
            name: "Dev"
        }
    },
    {
        $graphLookup: {
            from: 'child_reference',
            startWith: '$direct_reports',
            connectFromField: 'direct_reports', // from where the value is taken 
            connectToField: 'name', // To where the value is searched
            as: 'all_reports'
        }
    }
]).pretty()
db.child_reference.aggregate([
    {
        $match: {
            name: "Dev"
        }
    },
    {
        $graphLookup: {
            from: 'child_reference',
            startWith: '$direct_reports',
            connectFromField: 'direct_reports', // from where the value is taken 
            connectToField: 'name', // To where the value is searched
            as: 'till_2_level_reports',
            maxDepth: 0,
            depthField: 'level' // how far a document is from the source input document("Dev" in this case)
        }
    }
]).pretty()
db.air_airlines.aggregate([
    {
        $match: {
            name: "TAP Portugal"
        }
    },
    {
        $graphLookup: {
            from: 'air_routes',
            startWith: '$base',
            connectFromField: 'dst_airport', // from where the value is taken 
            connectToField: 'src_airport', // To where the value is searched
            as: 'chain',
            maxDepth: 1,
            restrictSearchWithMatch: {
                'airline.name': 'TAP Portugal'
            }
        }
    }
]).pretty()


// Facets: Single Facet Query
db.movies.aggregate([
    {
        $sortByCount: "$year"
    }
]).pretty() // id:1
// "id:1 === id:2"
db.movies.aggregate([
    {
        $group: {
            _id: '$year',
            count: { $sum: 1 }
        }
    },
    {
        $sort: { 
            count: -1 
        }
    }
]).pretty() // id:2

// The $bucket Stage
db.movies.aggregate([
    {
        $bucket: {
            groupBy: "$imdb.rating",
            boundaries: [0, 5, 8, Infinity],
            default: "Other"
        }
    }
]).pretty()



































