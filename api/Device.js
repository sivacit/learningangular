const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let Device = new Schema({
        name:{
            type: String
        },
        description:{
            type: String
        }
    },
    {
        collection: "device"
    }
)
module.exports = mongoose.model("Device", Device)