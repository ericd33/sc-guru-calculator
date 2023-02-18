const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
  cardName: {
    type: String,
  },
  fullName: {
    type: String,
    required: true,
  },
  mainposition: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  club: {
    type: String,
    required: true,
  },
  league: {
    type: String,
    required: true,
  },
  overallStats: {
    type: Number,
    required: true,
  },
  pace: {
    type: Number,
    required: true,
  },
  shooting: {
    type: Number,
    required: true,
  },
  cardType: {
    type: String,
    required: true,
  },
  pace: {
    type: Number,
    required: true,
  },
  cardImg: {
    type: String,
    required:true
  },
  futwiz_id: {
    type: String,
    required:true,
  },
  dribbling: { required: true, type: Number },
  defending: { required: true, type: Number },
  physicality: { required: true, type: Number },
  buyCost: { required: true, type: Number },
  sellCost: { required: true, type: Number },
  rating: { required: true, type: Number },
  guruKey: {
    type: String,
  },
  imageURL: {
    type: String,
  },
});

module.exports = mongoose.model("Player", playerSchema);
