const mongoose = require("mongoose");

const leagueSchema = new mongoose.Schema({
    name: { type: String },
});

module.exports = mongoose.model("League", leagueSchema);
