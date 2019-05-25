// 1.
db.users.insertMany([
    { name: "John", age: 22, hobbies: ['writing', 'gaming'], phone: "5645465465"}, 
    { name: "Doe", hobbies: ['walking'], phone: 123456789},
    { name: "Pol", hobbies: ['sports', 'coding'], phone: "123456789"},
    { name: "Pol", hobbies: ['sports', 'coding', 'running'], phone: 123456789},
])

// 2.
db.users.insertMany([
    { name: "John", age: 22, hobbies: [{title: 'writing', frequency: 5}, {title: 'gaming', frequency: 10}], phone: "5645465465"}, 
    { name: "Doe", hobbies: [{title: 'writing', frequency: 30}], phone: 123456789},
    { name: "Pol", hobbies: [{title: 'coding', frequency: 4}, {title: 'gaming', frequency: 8}, {title: 'sports', frequency: 3}], phone: "123456789"},
    { name: "Anna", hobbies: [{title: 'sports', frequency: 6}, {title: 'coding', frequency: 3}, {title: 'gaming', frequency: 7}], phone: 123456789},
])

// 3.
db.sales.insertMany([{volume: 100, target: 120},{volume: 89, target: 80},{volume: 200, target: 177}])

// 4.
db.supplies.insertMany([
    { "_id" : 1, "item" : "binder", "qty": 100 , "price": 12 },
    { "_id" : 2, "item" : "notebook", "qty": 200 , "price": 8 },
    { "_id" : 3, "item" : "pencil", "qty": 50 , "price": 6 },
    { "_id" : 4, "item" : "eraser", "qty": 150 , "price": 3 },
])

// 5.
db.users.insertOne( { name: "Chris", age: 27, hobbies: ['writing', 'cocking', 'hiking'], phone: "5645465465"})

//6.
db.inventory.insertMany([
    {
        _id: ObjectId("5234cc89687ea597eabee675"),
        code: "xyz",
        tags: [ "school", "book", "bag", "headphone", "appliance" ],
        qty: [
               { size: "S", num: 10, color: "blue" },
               { size: "M", num: 45, color: "blue" },
               { size: "L", num: 100, color: "green" }
             ]
     },
     {
        _id: ObjectId("5234cc8a687ea597eabee676"),
        code: "abc",
        tags: [ "appliance", "school", "book" ],
        qty: [
               { size: "6", num: 100, color: "green" },
               { size: "6", num: 50, color: "blue" },
               { size: "8", num: 100, color: "brown" }
             ]
     },
     {
        _id: ObjectId("5234ccb7687ea597eabee677"),
        code: "efg",
        tags: [ "school", "book" ],
        qty: [
               { size: "S", num: 10, color: "blue" },
               { size: "M", num: 100, color: "blue" },
               { size: "L", num: 100, color: "green" }
             ]
     },
     {
        _id: ObjectId("52350353b2eff1353b349de9"),
        code: "ijk",
        tags: [ "electronics", "school" ],
        qty: [
               { size: "M", num: 100, color: "green" }
             ]
     }
])

// 7.
db.scores.insertMany([{ _id: 1, results: [ 82, 85, 88 ] }, { _id: 2, results: [ 75, 88, 89 ] }])

// 8.
db.survey.insertMany([
  { _id: 1, results: [ { product: "abc", score: 10 }, { product: "xyz", score: 5 } ] },
  { _id: 2, results: [ { product: "abc", score: 8 }, { product: "xyz", score: 7 } ] },
  { _id: 3, results: [ { product: "abc", score: 7 }, { product: "xyz", score: 8 } ] }
])