import React from "react";

import { Grid, Typography } from "@mui/material";
import PlayerCard from "./PlayerCard";
import { useEffect, useState } from "react";

export default function Field({ formation }) {

  const [teamChem, setTeamChem] = useState(0)

  const checkPositionsChem = () => {
    formation.forwards.forEach((forward, index) => {
      if (forward.positionName == forward.cardData.mainposition) {
        formation.forwards[index].chem = formation.forwards[index].chem?formation.forwards[index].chem:0 + 2;
      }
    });
    formation.midfielders.forEach((mid, index) => {
      if (mid.positionName == mid.cardData.mainposition) {
        formation.midfielders[index].chem = formation.midfielders[index].chem?formation.midfielders[index].chem:0 + 2;
      }
    });
    formation.defenders.forEach((def, index) => {
      if (def.positionName == def.cardData.mainposition) {
        formation.defenders[index].chem = formation.defenders[index].chem?formation.defenders[index].chem:0 + 2;
      }
    }
    );
    if (formation.gk.positionName == formation.gk.cardData.mainposition) {
      formation.gk.chem = formation.gk.chem?formation.gk.chem:0 + 2;
    }
  }

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
    let nchem = 0;
    players.forEach((player, index) => {
      if (player.chem) {
        nchem = nchem + player.chem;
      }
      if (player.cardData != "") {

        players.forEach((subplayer) => {
          if (subplayer.cardData != "" && subplayer.cardData.guruKey != player.cardData.guruKey) {
            if (player.cardData.league == subplayer.cardData.league) {
              nchem = nchem + 1;
              player.chem = (player.chem?player.chem:0) + 1
            }
            if (player.cardData.country == subplayer.cardData.country) {
              nchem = nchem + 1;
              player.chem = (player.chem?player.chem:0) + 1
            }
            if (player.cardData.club == subplayer.cardData.club) {
              nchem = nchem + 1;
              player.chem = (player.chem?player.chem:0) + 1
            }
          }
        })
      }
    });
    setTeamChem(nchem);
  }

  useEffect(()=> {
    checkPositionsChem();
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
        <PlayerCard sm data={forward.cardData} chem={forward.chem}/></Grid>):<Grid item xs={1} md={5 / formation.forwards.length}>{forward.positionName}</Grid>)}
        {formation && formation.midfielders.map((mid) => 
        mid.cardData?(<Grid item xs={1} md={5 / formation.midfielders.length}>
        <PlayerCard sm data={mid.cardData} chem={mid.chem}/></Grid>):<Grid item xs={1} md={5 / formation.midfielders.length}>{mid.positionName}</Grid>)}
        {formation && formation.defenders.map((def) => 
        def.cardData?(<Grid item xs={1} md={5 / formation.defenders.length}>
        <PlayerCard sm data={def.cardData} chem={def.chem}/></Grid>):<Grid item xs={1} md={5 / formation.defenders.length}>{def.positionName}</Grid>)}
        
        <Grid item xs={1} sm={1} zeroMinWidth md={5}>
        {formation && formation.gk.cardData? <PlayerCard sm data={formation.gk.cardData}/>:""}
        </Grid>
      </Grid>
    </Grid>
    </>
  );
}
