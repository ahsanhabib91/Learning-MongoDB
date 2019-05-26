// 08 Update Operations
// Some queries are based on users.json
// Query Selectors: https://docs.mongodb.com/manual/reference/operator/update/

// Definition:  db.collection.updateOne(filter, update, options)
// Definition:  db.collection.updateMany(filter, update, options)


// Fields
db.users.updateOne({ _id: ObjectId("5cea197460ce58c093334976") }, 
{ 
    $set: { 
        hobbies: [
            {title: 'Sports', frequency: 5}, 
            {title: 'Cooking', frequency: 3}, 
            {title: 'Hiking', frequency: 1}
        ] 
    } 
}) // filter->ObjectId("5cea197460ce58c093334976"), update_field: hobbies
db.users.updateMany({"hobbies.title": "Sports"}, { $set: { isSporty: true } })
db.users.updateMany({ _id: ObjectId("5cea197460ce58c093334976") }, { $set: { age: 40, phone : 123456789, } })
db.users.updateOne({ isSporty: { $exists: false } },  { $inc: { age: 3 }, $set: {isSporty: false} }) // filter document where field: isSporty exists. Then update age by increasing filed: age by 3 and added field isSporty to false
db.users.updateOne({ isSporty: { $exists: false } },  { $inc: { age: 3 }, $set: {age: 40} }) // ERROR: cannot make operation on same field
db.users.updateOne({ name: "Chris" }, { $min: { age: 35 } }) // update age=35 if age<35
db.users.updateOne({ name: "Chris" }, { $max: { age: 35 } }) // update age=35 if age>35
db.users.updateOne({ name: "Chris" }, { $mul: { age: 2 } }) // update age = (age * 2)
db.users.updateMany({ isSporty: true }, { $unset: { phone: "" } }) // drop field: phone, where (isSporty === true)
db.users.updateMany({}, { $rename: { age: "totalAge" } }) // rename the field: age to totalAge
db.users.updateOne({ name: "Maria" }, { $set: { age: 29, hobbies: [{title: "Good Food", frequency: 3}], isSporty: false } }, { upsert: true }) // Find and update. If no data found then create


// Array
db.users.find({ $and: [{ "hobbies.title": "Sports"}, {"hobbies.frequency": { $gte: 3 }  }] }).pretty()
db.users.find({ hobbies: { $elemMatch: { title: "Sports", frequency: {$gte:3} } } }).pretty()
db.users.updateMany({ hobbies: { $elemMatch: { title: "Sports", frequency: {$gte:3} } } }, { $set: { "hobbies.$.highFrequency": true } }) // update documents inside the hobbies array.  
db.users.updateMany({ "hobbies.frequency": {$gt:2} }, { $set: { "hobbies.$.goodFrequency": true } }) // only update the first matched document of the hobbies array. Lec-112.
db.users.updateMany({age: {$gt: 30}}, { $inc: { "hobbies.$[].frequency": -1 } }) // update frequency of all documents inside array_field: hobbies







