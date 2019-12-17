var express = require('express');
var router = express.Router()
let Employee = require('./models/Employee')

router.post("/", function(req, res){
let dev = new Employee(req.body);
dev.save().then(dev => {
    res.status(200).json({'Employee': 'Employee added successfully'});
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
})
  
router.get("/", function (req, res) {
Employee.find(function (err, devList){
if(err){
    console.log(err);
}
else {
    res.json(devList);
}
});
});
  
router.put("/:id", function (req, res) {
    Employee.findByIdAndUpdate(req.params.id, req.body, (err, emp) => {
        if (err) {
            return res.status(500).send({error: "unsuccessful"})
        };
        res.send({success: "success"});
    })
  });
  
  router.delete("/:id", function (req, res) {
    Employee.deleteOne({_id: req.params.id}, (err, emp) => {
        if (err) {
            console.log(err)
            return res.status(500).send({error: "unsuccessful"})
        };
        res.send({success: "success"});
    })
  });
  
router.get("/:id", function (req, res) {
    let id = req.params.id;
    Employee.findById(id, function (err, emp){
      if (err){
        console.log(err)
      }
      else{
        res.json(emp);
      }    
    });
  });  

module.exports = router;