const express = require("express");
require("dotenv").config();
const env = process.env;
const app = express();
const cors = require("cors");
const axios = require('axios');
const cheerio = require('cheerio');
const mongoose = require('mongoose');
const Player = require('./model/Player.js');
const Country = require('./model/Country.js');
const League = require('./model/League.js');
const Club = require('./model/Club.js');
const Position = require("./model/Position.js");
mongoose.set('strictQuery', false);
app.use(cors());
// Middlewares
app.use(express.json());

// Routes
// app.use("/");

app.get("/",(req, res) => {
    res.send("Hello World");
})

app.post("/getplayers", async (req, res) => {
  const {fullName, league, club, country, position} = req.body
  const query = {}

  if (fullName && fullName.length > 0) query.fullName = {$regex: fullName, $options: 'i'}
  if (league && league.length > 0) query.league = league
  if (club && club.length > 0) query.club = club
  if (country && country.length > 0) query.country = country
  if (position && position.length > 0) query.mainposition = position

  try {
    const players = await Player.find(query);
    res.send(players);
  } catch(err) {
    console.log(err);
  }

})

app.post("/getfields", async (req, res) => {
  const countries = await Country.find();   
  const leagues = await League.find();
  const clubs = await Club.find();
  const positions = await Position.find();

  res.send({countries, leagues, clubs, positions})
})

app.post("/getall", async (req, res) => {
    const players = await Player.find();
    return res.send(players);
})

app.post("/addplayerbyuid", async (req, res) => {
  console.log('addplayer')
    axios.get('https://api.soccerguru.live/players/'+ req.body.uid).then(async (response)=> {

    const newPlayer = new Player({
        cardName: response.data.card.card_name,
        fullName: response.data.card.full_name,
        mainposition: response.data.card.position,
        country: response.data.card.nationality,
        club: response.data.card.team_name,
        league: response.data.card.league,
        pace: response.data.card.pace,
        shooting: response.data.card.shooting,
        passing: response.data.card.passing,
        dribbling: response.data.card.dribbling,
        defending: response.data.card.defending,
        physicality: response.data.card.physicality,
        buyCost: response.data.card.value,
        sellCost: response.data.card.bin,
        guruKey: response.data.card.uuid,
        rating: response.data.card.rating,
        overallStats: response.data.card.shooting + response.data.card.pace + response.data.card.passing + response.data.card.dribbling + response.data.card.defending + response.data.card.physicality,
    })
        try {

            //Check if country, league, club exists, if it doesn't add it
            const newCountry = new Country({
                name: newPlayer.country
            });
            const newLeague = new League({
                name: newPlayer.league
            });
            const newClub = new Club({
                name: newPlayer.club
            });
            if (!await Country.findOne({name: newCountry.name})) await newCountry.save();
            if (!await League.findOne({name: newLeague.name})) await newLeague.save();
            if (!await Club.findOne({name: newClub.name})) await newClub.save();
            if (!await Player.findOne({guruKey: newPlayer.guruKey})) await newPlayer.save();
            if (!await Position.findOne({name: newPlayer.mainposition})) await new Position({name: newPlayer.mainposition}).save();

        }catch(error) {
            console.log(error)
        }

      }); 

      res.send('ok');

})

  main().catch((err) => console.log(err));
  async function main() {
    await mongoose.connect(process.env.DB_CONNECTION);
  }
  
// Starting the server...
app.listen(process.env.PORT || 5000, () => {
    console.log('server started');
  });