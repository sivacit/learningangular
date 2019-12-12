var express = require('express');
var router = express.Router()
let Device = require('./Device')

router.post("/", function(req, res){
let dev = new Device(req.body);
dev.save().then(dev => {
    res.status(200).json({'Device': 'Device in added successfully'});
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
})
  
router.get("/", function (req, res) {
Device.find(function (err, devList){
if(err){
    console.log(err);
}
else {
    res.json(devList);
}
});
});
  
router.put("/:id", function (req, res) {
    Device.findByIdAndUpdate(req.params.id, req.body, (err, device) => {
        if (err) {
            return res.status(500).send({error: "unsuccessful"})
        };
        res.send({success: "success"});
    })
  });
  
  router.delete("/:id", function (req, res) {
    Device.deleteOne({_id: req.params.id}, (err, device) => {
        if (err) {
            console.log(err)
            return res.status(500).send({error: "unsuccessful"})
        };
        res.send({success: "success"});
    })
  });
  
router.get("/:id", function (req, res) {
    let id = req.params.id;
    Device.findById(id, function (err, device){
      if (err){
        console.log(err)
      }
      else{
        res.json(device);
      }    
    });
  });  

module.exports = router;