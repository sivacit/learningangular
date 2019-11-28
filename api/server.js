const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');

// create express app
const app = express();

// parse request    s of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
// parse requests of content-type - application/json
app.use(bodyParser.json())

// define a simple route
app.get('/welcome', (req, res) => {
    res.json({"message": "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes."});
});

// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});