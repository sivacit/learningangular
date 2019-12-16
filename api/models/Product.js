const mongoose = require('mongoose');
const Schema = mongoose.Schema;
module.exports = mongoose.model("Product", new Schema({
    name:{
        type: String
    },
    description:{
        type: String
    },
    qty:{
        type: String
    }
},
{
    collection: "product"
}
));