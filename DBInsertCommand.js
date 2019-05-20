// 1.
db.users.insertMany([
    { name: "John", age: 22, hobbies: ['writing', 'gaming'], phone: "5645465465"}, 
    { name: "Doe", hobbies: ['walking'], phone: 123456789},
    { name: "Pol", hobbies: ['sports', 'coding'], phone: "123456789"},
    { name: "Pol", hobbies: ['sports', 'coding', 'running'], phone: 123456789},
])

// 2.
db.users.insertMany([
    { name: "John", age: 22, hobbies: [{title: 'writing', frequency: 2}, {title: 'gaming', frequency: 1}], phone: "5645465465"}, 
    { name: "Doe", hobbies: [{title: 'coding', frequency: 3}], phone: 123456789},
    { name: "Pol", hobbies: [{title: 'writing', frequency: 4}, {title: 'coding', frequency: 5}], phone: "123456789"},
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