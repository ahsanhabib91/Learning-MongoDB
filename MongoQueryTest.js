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


// Writeconcern
db.collection.insertOne({ name: "Ahsan", age: 29, hobbies: ['reading', 'coding'] }, {writeConcern: {w:0}});
// default w: 1. response:{ "acknowledged" : false } although the data inserted

db.collection.insertOne({ name: "Chris", age: 29, hobbies: ['reading', 'coding'] }, {writeConcern: {w:1}})
/*{
	"acknowledged" : true,
	"insertedId" : ObjectId("5ce0f288bcb7c9c63cee264e")
}*/

db.collection.insertOne({ name: "Chris", age: 29, hobbies: ['reading', 'coding'] }, {writeConcern: {w:1, j:true} })
// default j: false or undefined. The insert added to the journal and waiting for the journal editing to finish. Therefore takes a little more time

db.collection.insertOne({ name: "Talha", age: 29, hobbies: ['reading', 'coding'] }, {writeConcern: {w:1, j:true, wtimeout: 200} })
// wtimeout time limit for the operation to finish

// Atomicity: MongoDB CRUD operations are Atomic on the Document level(Including Embeded Document). 

/**
 * DB import command: mongoimport tv-shows.json -d movieData -c movies --jsonArray --drop
 * -d: Database name
 * -c: Collection name
 * --jsonArray: its a json array
 * --drop: drop if the database exists
 */