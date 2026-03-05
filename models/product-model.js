;
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/ecommerceDb');

const productSchema = mongoose.Schema({
    name :String,
    image :Buffer,
    panelcolor :String,
    discount : {
        type :String,
        default :"0",
    },
    textcolor :String,
    price : String,
    bgcolor :String,
})

module.exports = mongoose.model("product" ,productSchema);