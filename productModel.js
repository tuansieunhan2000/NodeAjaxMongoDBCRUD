//import
const mongoose = require("mongoose");
//connect DB
mongoose.connect('mongodb://localhost:27017/ProductList', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

//tạo schema
var productSchema = mongoose.Schema({
    productID: Number,
    productName: String,
    price: Number,
    quantity: Number
});
//tạo model
var productModel = mongoose.model("product", productSchema);

//export
module.exports = productModel;

// productModel.create({ productID: 10,
//     productName: "moi",
//     price: 4000,
//     quantity: 5}).then((data)=>{
//         console.log(data);
//     }).catch((err)=>console.log(err));