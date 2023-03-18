import { Typography, Grid, Paper, Button } from '@mui/material';
import React, { useState } from 'react'
import { useEffect } from 'react';
import './playerCard.css'
const currency = require('currency.js')


export default function PlayerCard({data, sm, onAssignPlayer, onRemovePlayer, chem}) {

  const [borderCalc, setBorderCalc] = useState("")

  useEffect(()=>{
    if ((!chem) || (chem < 5)) {
      setBorderCalc('3px outset red');
    }
    else if (chem >= 7) {
      setBorderCalc('3px outset green');
    }
    else if (chem >= 5) {
      setBorderCalc('3px outset orange');
    }

  },[chem])
  return (
    <Grid container mx='auto' className="playerCard" direction='column' style={{backgroundImage: `url(${data.cardImg})`, width:sm?'100px':'200px', height:sm?'150px':'300px', border:sm?borderCalc:"none"}}>
      <Grid item xs={6} md={sm?12:9} sx={{width:'100%'}}>

          {sm?"":<Button onClick={onAssignPlayer} style={{padding:0, margin:0}} className='addpbutton' data={JSON.stringify(data)} variant='contained' >+</Button>}
          {!sm?"":<Button onClick={onRemovePlayer} size='small' style={{padding:0, margin:0, minWidth:'25px', backgroundColor:'red'}} className='addpbutton' data={JSON.stringify(data)} variant='contained' >x</Button>}

      </Grid>
      <Grid item xs={6} md={1} mx='auto' direction='column-reverse' >

      <Paper className='playerPrice' sx={{backgroundColor: 'rgb(126, 218, 174)', textAlign:'center', fontWeight: 'bold'}} mx='auto'>
      <Typography variant='h7' mx='auto' >{sm?"":currency(data.buyCost, {fromCents: true, precision: 0}).format()}</Typography>
      </Paper>
      <Paper>
      <Typography variant='h5' mx='auto' sx={{textAlign:'center'}} >{sm?"":data.overallStats}</Typography>
      </Paper>
      </Grid>
      
    </Grid>
  )
}
