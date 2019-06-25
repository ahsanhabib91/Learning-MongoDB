// 09 Understanding Delete Operations

// https://docs.mongodb.com/manual/reference/method/db.collection.deleteOne/
// https://docs.mongodb.com/manual/reference/method/db.collection.deleteMany/

db.users.deleteOne({ name: "Chris" }) // Delete 1 document where name === "Chris"
db.users.deleteMany({ age: {$exists: false}, isSporty: true }) // Delete matching documents where field (age exists and isSporty === true)

db.collection.deleteMany({}) // remove all documents inside the collection
db.collection.drop() // drop/remove the collection
db.dropDatabase() // drop/remove the entire database


