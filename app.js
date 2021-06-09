// import + tao app
const express = require("express");
const productModel = require("./productModel");
const app = express();
const bodyParser = require("body-parser");
const e = require("express");
var path = require('path');



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// API, router

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.get("/", (req, res)=>{
	res.render('index', { title: 'Express' });
})
// Lấy toàn bộ
app.get("/api", (req, res) => {
  productModel
    .find()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.json(err));
});
// lấy cụ thể 1 data
app.get("/api/:id", (req, res) => {
  let id = req.params.id;
  console.log(id);
  productModel
    .findOne({ _id: id })
    .then((data) => {
      if (data) {
        res.json(data);
      } else {
        res.json("khong tim thay");
      }
    })
    .catch((err) => res.json(err));
});
// them data
app.post("/api", function (req, res) {
  console.log(req.body);
  if (
    !req.body.productID ||
    !req.body.productName ||
    !req.body.price ||
    !req.body.quantity
  ) {
    res.send("vui long dien day du thong tin");
  } else {
    var newProduct = new productModel({
      productID: req.body.productID,
      productName: req.body.productName,
      price: req.body.price,
      quantity: req.body.quantity,
    });

    newProduct.save(function (err, _Person) {
      if (err) res.end("loi roi ban oi");
      else res.json(req.body);
    });
  }
});
// xoá data
app.delete("/api/:id", (req, res) => {
  let id = req.params.id;
  console.log(id);
  productModel
    .deleteOne({ _id: id })
    .then((data) => {
        if(data.deletedCount){
            res.json("xoa thanh cong");
        }else{
            res.json("xoa that bai")
        }
    })
    .catch((err) => {
      res.json(err);
    });
});
// sửa data
app.put("/api/:id", (req, res) => {
    let id = req.params.id;
    console.log(req.body);
    var productInfo = req.body;
   productModel.updateOne(
    { _id: id },
    {
      productID: productInfo.productID,
      productName: productInfo.productName,
      price: productInfo.price,
      quantity: productInfo.quantity,
    }).then((data) => {
        if(data.nModified){
            res.json("Sua thanh cong")
        }
        else{
            res.json("Sua that bai");
        }
      })
      .catch((err) => res.json(err));
  });
// tao cong nghe
app.listen(3011);
