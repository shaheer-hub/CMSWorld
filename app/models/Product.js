const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    name: String,
    price:Number,
    details:String,
    category:[{type:mongoose.Schema.ObjectId , ref:'Category'}]
}, {
    timestamps: true
});

module.exports = mongoose.model('Product', ProductSchema);