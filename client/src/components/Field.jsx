import React from "react";

import { Grid, Typography } from "@mui/material";
import { useState } from "react";
import PlayerCard from "./PlayerCard";

export default function Field({ formation }) {
  
  console.log('re render formation')
  return (
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
        <PlayerCard sm data={forward.cardData}/></Grid>):<Grid item xs={1} md={5 / formation.forwards.length}>{forward.positionName}</Grid>)}
        {formation && formation.midfielders.map((mid) => 
        mid.cardData?(<Grid item xs={1} md={5 / formation.midfielders.length}>
        <PlayerCard sm data={mid.cardData}/></Grid>):<Grid item xs={1} md={5 / formation.midfielders.length}>{mid.positionName}</Grid>)}
        {formation && formation.defenders.map((def) => 
        def.cardData?(<Grid item xs={1} md={5 / formation.defenders.length}>
        <PlayerCard sm data={def.cardData}/></Grid>):<Grid item xs={1} md={5 / formation.defenders.length}>{def.positionName}</Grid>)}
        
        <Grid item xs={1} sm={1} zeroMinWidth md={5}>
        {formation && formation.gk.cardData? <PlayerCard sm data={formation.gk.cardData}/>:""}
        </Grid>
      </Grid>
    </Grid>
  );
}
