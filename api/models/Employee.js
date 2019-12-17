const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let employee = new Schema ({
    empName: {
        type: String
    },
    empRole: {
        type: String
    },
    empSal: {
        type: String
    }
}, 
{
    collection: "employee"
}
)
module.exports =  mongoose.model("Employee", employee)