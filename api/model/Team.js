const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
    formation: { type: String },
    players: { type: Array },
    chemistry: { type: Number },
});

module.exports = mongoose.model("Team", teamSchema);
