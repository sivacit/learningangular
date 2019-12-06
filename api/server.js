const express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    mongoose = require('mongoose'),
    config = require('./DB');

let Device = require('./Device')
mongoose.Promise = global.Promise;
mongoose.connect(config.DB, { useNewUrlParser: true }).then(
  () => {console.log('Database is connected') },
  err => { console.log('Cannot connect to the database'+ err)}
);

const app = express();
app.use(bodyParser.json());
app.use(cors());
// app.use(express.static(path.join(__dirname,'../dist/angular7crud')));

app.post("/devices", function(req, res){
  let dev = new Device(req.body);
  dev.save()
    .then(dev => {
      res.status(200).json({'Device': 'Device in added successfully'});
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
})

app.get("/devices", function (req, res) {
  Device.find(function (err, devList){
  if(err){
    console.log(err);
  }
  else {
    res.json(devList);
  }
});
});

app.put("/devices/:id", function (req, res) {
  Device.findByIdAndUpdate(req.params.id, req.body, (err, device) => {
      if (err) {
          return res.status(500).send({error: "unsuccessful"})
      };
      res.send({success: "success"});
  })
});

app.delete("/devices/:id", function (req, res) {
  Device.deleteOne({_id: req.params.id}, (err, device) => {
      if (err) {
          console.log(err)
          return res.status(500).send({error: "unsuccessful"})
      };
      res.send({success: "success"});
  })
});

app.get("/devices/:id", function (req, res) {
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


const port = process.env.PORT || 3000;

const server = app.listen(port, function(){
  console.log('Listening on port ' + port);
});
