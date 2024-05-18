const mongoose = require('mongoose');
const {Schema} = mongoose ;

const thingSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    userId: { type: String, required: true },
    price: { type: Number, required: true },
},
{
    timestamps: true,
    collection: 'img',
},
);

module.exports = mongoose.model('Thing', thingSchema);