var express = require('express');
var router = express.Router()
let Product = require('./models/Product')

router.post("/", function(req, res){
let dev = new Product(req.body);
dev.save().then(dev => {
    res.status(200).json({'message': 'Product added successfully'});
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
})

  
router.get("/", function (req, res) {
    Product.find(function (err, devList){
    if(err){
        console.log(err);
    }
    else {
        res.json(devList);
    }
    });
});
      

    
module.exports = router;