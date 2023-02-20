import { Typography, Grid } from '@mui/material';
import React from 'react'
import './playerCard.css'

export default function PlayerCard({data}) {

  return (
    <Grid item mx='auto' className="playerCard" style={{backgroundImage: `url(${data.cardImg})`}}>
      <Typography variant='h4' >{data.overallStats}</Typography>
    </Grid>
  )
}
