const mongoose = require('mongoose');

const CrimeSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true,
  },
  location: {
    type: {
      type: String,
      default: "Point" // GeoJSON point type
    },
    coordinates: {
      type: [Number], // Array of longitude and latitude
      required: true,
    }
  }
});

module.exports = mongoose.model('Crime', CrimeSchema);
