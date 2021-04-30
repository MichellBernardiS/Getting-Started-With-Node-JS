// const mongo = require('mongoose');

// mongo.connect(dbInet, {useMongoClient : true}, (err) => {
//     console.log('Mongodb connected', err);
// });

// const Message = mongo.model('Message', {
//     name: String,
//     message: String
// });

const MongoClient = require('mongodb').MongoClient;

const dbInet = "mongodb+srv://user:kPecV82tTNHh6f3j@learnode.vx5jo.mongodb.net/Learnode?retryWrites=true&w=majority";

const client = new MongoClient.connect(dbInet, {useNewUrlParser: true, useUnifiedTopology: true}, (err, clients) => {
    if(err){
        return console.log("Connection failed")
    }
    console.log("Connection Established");
});

// async function defineSchema() {
//     try {
//         await client.connect();
        
//         var dbo = client.db('Learnode');
//         dbo.command({
//             collMod: "Messages",
//             validator: {
//                 $jsonSchema: {
//                     bsonType: "object",
//                     required: ["name", "message"],
//                     properties: {
//                         name: {
//                             bsonType: "string",
//                             description: "must be a string and is required"
//                         },
//                         messages: {
//                             bsonType: "string",
//                             description: "is required"
//                         },
//                         date: {
//                             bsonType: "timestamp",
//                             default: Date.now
//                         }
//                     }
//                 }
//             },
//             validationlevel: "moderate"
//         });
//     }finally {
//         await client.close();
//     }    
// }

async function getMessages(){
    try{
        var resultArray = [];
        MongoClient.connect(dbInet, function(err, db){
            assert.equal(null, err);
            var cursor = db.collection('Messages').find();
            cursor.forEach(function(doc, err){
                assert.equal(null, err);
                resultArray.push(doc);
            }, function(){
                db.close();
            })
        })
    }catch(error){
        console.log('Could not fetch messages ${error}');
    }
}

async function sendMessage(data) {
    var newMessages = {
        name: data.username,
        message: data.message
    };

    try{
        MongoClient.connect(dbInet, function(err, db){
            assert.equal(null, err);

            db.collection('Messages').insert(newMessages, function(err, result){
                assert.equal(null, err);
                console.log('New Message Inserted');
                db.close();
            });
        });
    }catch(error){
        console.log('Could not insert message into DB');
    }
}

exports.sendMessage = sendMessage;
exports.getMessages = getMessages;
