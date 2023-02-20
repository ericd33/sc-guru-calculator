const Player = require('/model/Player.js');

async function addPlayer(req, res) {

    try{
        const player = new Player({
            cardName: req.body.cardName,
            fullName: req.body.fullName,
            mainPosition: req.body.mainPosition,
            country: req.body.country,
            club: req.body.club,
            league: req.body.league,
            overallStats: req.body.overallStats,
            pacing: req.body.pacing,
            shooting: req.body.shooting,
            passing: req.body.passing,
            dribbling: req.body.dribbling,
            defending: req.body.defending,
            physicality: req.body.physicality,
            buyCost: req.body.buyCost,
            sellCost: req.body.sellCost,
            guruKey: req.body.guruKey,
            imageURL: req.body.imageURL
        });
        await player.save();
        res.send('Player added successfully');

    } catch (eror){
        res.send('Error: ' + error);
    }
    
}

module.exports = {
    getAll,
    addPlayer
}