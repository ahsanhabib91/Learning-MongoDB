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














































