const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

const uri = 'mongodb://localhost:27017';

const client = new MongoClient(uri, { useUnifiedTopology: true });

//regular
// client.connect(err => {
//     if (err) {
//         console.log(err);
//         return;
//     }
//     let db = client.db('test');
//     let cats = db.collection('cats');

//     cats.find({}, (err, result) => {
//         if (err) {
//             console.log(err);
//             return;
//         }

//         result.toArray((err, result) => {
//             console.log(result);
//         });
//     });
// });


//async
// (async function run() {
//     await client.connect();

//     let db = client.db('test');
//     let cats = db.collection('cats');

//     let firstCat = await cats.findOne({})
//     console.log(firstCat);
// })()


//promise
client.connect()
    .then(() => {
        const db = client.db('test');
        let cats = db.collection('cats');
        return cats.findOne({})
    })
    .then(res => console.log(res))


//chain promise
// client.connect()
//     .then(() => client
//         .db('test')
//         .collection('cats')
//         .findOne({}))
//     .then(res => console.log(res))