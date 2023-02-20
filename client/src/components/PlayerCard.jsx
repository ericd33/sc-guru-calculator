import { Typography, Grid, Paper } from '@mui/material';
import React from 'react'
import './playerCard.css'
const currency = require('currency.js')


export default function PlayerCard({data}) {

  return (
    <Grid item mx='auto' className="playerCard" style={{backgroundImage: `url(${data.cardImg})`}}>
      <Grid container direction={'column'} >


      <Paper className='playerPrice' sx={{backgroundColor: 'rgb(126, 218, 174)', textAlign:'center', fontWeight: 'bold'}} mx='auto'>
      <Typography variant='h7' mx='auto' >{currency(data.buyCost, {fromCents: true, precision: 0}).format()}</Typography>
      </Paper>

      <Typography variant='h5' mx='auto' >{data.overallStats}</Typography>
      </Grid>
      
    </Grid>
  )
}
