const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');
config = require('./DB');
mongoose = require('mongoose');
rooms = require('./Rooms')
const app = express();

// parse request    s of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
// parse requests of content-type - application/json
app.use(bodyParser.json())

mongoose.Promise = global.Promise;
    mongoose.connect(config.DB, { useNewUrlParser: true }).then(
      () => {console.log('Database is connected') },
      err => { console.log('Can not connect to the database'+ err)}
);

// define a simple route
app.get('/welcome', (req, res) => {
    let name = rooms.find({"_id":"10030955"}, function(err, rooms) {
        res.json({"message": "Welcome to " + rooms});    
    })
});

// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});