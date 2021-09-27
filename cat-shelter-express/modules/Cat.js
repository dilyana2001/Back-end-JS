const mongoose = require('mongoose');

const catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    breed: String,
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Person'
    }
});

// catSchema.methods.getInfo = function() {
//     console.log(`${this.name} and ${this.age}`)
// }

// catSchema.virtual('birthYear')
//     .get(function() {
//         return 2021 - this.age;
//     })
//     //     // .set()


module.exports = mongoose.model('Cat', catSchema);