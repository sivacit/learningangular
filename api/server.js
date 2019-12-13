const express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    mongoose = require('mongoose'),
    config = require('./DB');
var devices = require('./device.route');

mongoose.Promise = global.Promise;
mongoose.connect(config.DB, { useNewUrlParser: true }).then(
  () => {console.log('Database is connected') },
  err => { console.log('Cannot connect to the database'+ err)}
);

const app = express();
app.use(bodyParser.json());
app.use(cors());
// app.use(express.static(path.join(__dirname,'../dist/angular7crud')));

app.get("/", function(req, res){
  res.send("First page deployed!")
})
app.use('/devices', devices);

const port = process.env.PORT || 3000;
const server = app.listen(port, function(){
  console.log('Listening on port ' + port);
});
