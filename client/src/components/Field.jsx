import React from "react";

import { Grid, Typography } from "@mui/material";
import PlayerCard from "./PlayerCard";
import { useEffect, useState } from "react";

export default function Field({ formation, onRemovePlayer }) {

  const [teamChem, setTeamChem] = useState(0)

  const chemCalculator = () => {
    const players = []
    // store all players inside an array
    formation.forwards.forEach((forward) => {
      players.push(forward)
    });
    formation.midfielders.forEach((mid) => {
      players.push(mid)
    });
    formation.defenders.forEach((def) => {
      players.push(def)
    });
    players.push(formation.gk)
    
    // check for chemistry
    players.forEach((player, index) => {
      let pnchem = 0;
      if(player.positionName == player.cardData.mainposition) {
        pnchem = 2;
      }
      if (player.cardData != "") {
        
        
        players.forEach((subplayer) => {
          if (subplayer.cardData != "" && subplayer.cardData.guruKey != player.cardData.guruKey) {
            
            if (player.cardData.league == subplayer.cardData.league) {
              pnchem = pnchem + 1
        
            }
            if (player.cardData.country == subplayer.cardData.country) {
              pnchem = pnchem + 1
              
            }
            if (player.cardData.club == subplayer.cardData.club) {
              pnchem = pnchem + 1
              
            }

            if(player.positionName == player.cardData.mainposition) {
              if (pnchem > 7) pnchem = 7;
            } else if (player.positionName != player.cardData.mainposition) {
              if (pnchem > 5) pnchem = 5;
            }
            
          }
        })
      }
      players[index].chem = pnchem
    });
    let nchem = 0;
    players.forEach((player) => {
      if (player.cardData != "") {
        nchem = nchem + (player.chem?player.chem:0);
      }
    })
    setTeamChem(nchem);
  }

  useEffect(()=> {
    // checkPositionsChem();
    chemCalculator();
  },[formation])
  return (
    <>
    <Typography mx='auto' textAlign='center'>{'Team Chemistry: '+teamChem}</Typography>
    <Grid container spacing={3} paddingTop={11} mx="auto" width="650px">
      <Grid
        item
        container
        columns={5}
        rows={4}
        width="650px"
        height="900px"
        xs={6}
        style={{
          backgroundImage: "url(scfield.jpg)",
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {formation && formation.forwards.map((forward) => 
        forward.cardData?(<Grid item xs={1} md={5 / formation.forwards.length}>
        <PlayerCard onRemovePlayer={onRemovePlayer} sm data={forward.cardData} chem={forward.chem}/></Grid>):<Grid item xs={1} md={5 / formation.forwards.length}>{forward.positionName}</Grid>)}
        {formation && formation.midfielders.map((mid) => 
        mid.cardData?(<Grid item xs={1} md={5 / formation.midfielders.length}>
        <PlayerCard onRemovePlayer={onRemovePlayer} sm data={mid.cardData} chem={mid.chem}/></Grid>):<Grid item xs={1} md={5 / formation.midfielders.length}>{mid.positionName}</Grid>)}
        {formation && formation.defenders.map((def) => 
        def.cardData?(<Grid item xs={1} md={5 / formation.defenders.length}>
        <PlayerCard onRemovePlayer={onRemovePlayer} sm data={def.cardData} chem={def.chem}/></Grid>):<Grid item xs={1} md={5 / formation.defenders.length}>{def.positionName}</Grid>)}
        
        <Grid item xs={1} sm={1} zeroMinWidth md={5}>
        {formation && formation.gk.cardData? <PlayerCard sm onRemovePlayer={onRemovePlayer} chem={formation.gk.chem} data={formation.gk.cardData}/>:""}
        </Grid>
      </Grid>
    </Grid>
    </>
  );
}
