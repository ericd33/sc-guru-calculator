const mongoose = require("mongoose");

const formationSchema = new mongoose.Schema({
    pos1: { type: String },
    pos2: { type: String },
    pos3: { type: String },
    pos4: { type: String },
    pos5: { type: String },
    pos6: { type: String },
    pos7: { type: String },
    pos8: { type: String },
    pos9: { type: String },
    pos10: { type: String },
    pos11: { type: String },
});

module.exports = mongoose.model("Formation", formationSchema);
