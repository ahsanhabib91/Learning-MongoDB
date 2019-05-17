// 04 Exploring The Shell  The Server
// --dbpath, --logpath, --fork

// 06 Diving Into Create Operations
db.collection.insertOne({ name: "Habib", age: 29, hobbies: ['reading', 'coding'] });
db.collection.insertMany([
    { name: "John", age: 22, hobbies: ['writing', 'gaming']}, 
    { name: "Doe", age: 31, hobbies: ['walking', 'running', 'reading', 'coding']}
]);
// reasponse:
/*
{
    "acknowledged" : true,
    "insertedIds" : [
        ObjectId("sdfasbfajsdf")
        ......
        ObjectId("wererwqdf123123")
    ]
}
*/
// OLD way
db.collection.insert({ name: "Harry", age: 29, hobbies: ['reading', 'coding'] });   
// reasponse: WriteResult({ "ninserted": 1 })

db.collection.insert([{ name: "Mr.A", age: 29}, { name: "Mr.B", age: 45}, { name: "Mr.C", age: 67}]);   
// reasponse: BulkWriteResult({ "ninserted": 3, ....  })

db.collection.insert([{ name: "Mr.A", age: 29}, { name: "Mr.B", age: 45}], {ordered: false});   
// default: true. If false, then inserts all the documents which does not have error such as same _id's