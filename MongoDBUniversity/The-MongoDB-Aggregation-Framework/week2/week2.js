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