const express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    mongoose = require('mongoose'),
    config = require('./DB');
var devicesRoute = require('./device.route');
var productRoute = require('./product.route');
var empRoute = require('./emp.route');

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

app.use('/devices', devicesRoute);
app.use('/products', productRoute);
app.use('/employee', empRoute);

const port = process.env.PORT || 3000;
const server = app.listen(port, function(){
  console.log('Listening on port ' + port);
});
