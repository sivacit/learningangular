const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Rooms = new Schema({
        name: {
        type: String
        },
        _id:{
          type: Number
        }
    },
    {
      collection: 'sample_airbnb.listingsAndReviews'
    }
  );
  
  module.exports = mongoose.model('Rooms', Rooms);