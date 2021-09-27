const mongoose = require('mongoose');

const Cat = require('./modules/Cat');
const Person = require('./modules/Person');
const uri = 'mongodb://localhost:27017/test';


mongoose.connect(uri);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => console.log(`Connected to Database...`));

// let person = new Person({
//     name: 'Dilyana'
// });


//CRUD
// cat.save()
//     .then(result => console.log(result))
//     .catch(err => console.log(err));


// Cat.find({})
//     .then((person) => {
//         // person.forEach(x => x.getInfo())
//         person.forEach(x => console.log(`Im born ${x.birthYear}`))
//     })
//     .catch(err => console.log(err));


// Cat.findOneAndUpdate({ name: 'Fatty' }, { name: 'Skinny' })
//     .then(result => console.log(result))
//     .catch(err => console.log(err));


// Cat.deleteOne({ name: 'Perna' })
//     .then(result => console.log(result))
//     .catch(err => console.log(err));