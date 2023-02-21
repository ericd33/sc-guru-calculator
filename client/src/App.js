import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FormControl,
  TextField,
  Grid,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Typography,
  Select,
  MenuItem,
  Button,
  Input,
} from "@mui/material";
import PublicIcon from '@mui/icons-material/Public';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import AppsIcon from '@mui/icons-material/Apps';
import PlayerCard from "./components/PlayerCard";
import RadarIcon from '@mui/icons-material/Radar';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SCField from './components/Field';
import formationsJson from './formations.json';
const fwPositions = ["ST", "LW", "RW", "CF"];
const midPositions = ["LM", "CM", "RM", "CAM", "CDM"];
const defPositions = ["LB", "CB", "RB", "RWB", "LWB"];

const App = () => {

  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [data, loadData] = useState({league: '', club: '', country: '', position: ''});
  const [searchQuery, setSearchQuery] = useState("");
  const [uid, setUID] = useState("");
  const [page, setPage] = useState(0);
  const [Plsort, setPlsort] = useState('OVR Descending')
  const [fields, setFields] = useState({
    leagues: [''],
    clubs: [''],
    countries: [''],
  });
  const [fieldData, setFieldData] = useState({
    OVR: 0,
    ChemPoints: 0,
  })
  const [formation, setFormation] = useState(formationsJson[0].formation);
  const API_URL = process.env.REACT_APP_API_URL;
  const fetchData = async () => {
    try {
      setLoading(true)
      const response = await axios.post(`${API_URL}/getplayers`, {
        fullName: searchQuery,
        page: page,
        ...data,
        Plsort
      });

      setPlayers(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };


  const fetchFields = async () => {
    try {
      const response = await axios.post(`${API_URL}/getfields`);
      setFields(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchFields();
  }, []);
  
  useEffect(()=> {
    let overallTeamStats = 0;
    formation.forwards.map((forward, index) => {
      //calculate overall stats of players
      if (forward.cardData !== "") {
        overallTeamStats += forward.cardData.overallStats;
        return setFieldData({...fieldData, OVR: overallTeamStats})
      }
    })

    formation.midfielders.map((midfielder, index) => {
      //calculate overall stats of players
      if (midfielder.cardData !== "") {
        overallTeamStats += midfielder.cardData.overallStats;
        return setFieldData({...fieldData, OVR: overallTeamStats})
      }
    })

    formation.defenders.map((defender, index) => {
      //calculate overall stats of players
      if (defender.cardData !== "") {
        overallTeamStats += defender.cardData.overallStats;
        return setFieldData({...fieldData, OVR: overallTeamStats})
      }
    })

    if (formation.gk.cardData !== "") {
      overallTeamStats += formation.gk.cardData.overallStats;
      return setFieldData({...fieldData, OVR: overallTeamStats})
    }

    
  },[formation])
  useEffect(() => {
  fetchData();
  },[page, data])

  const handleSearch = async (event) => {
    event.preventDefault();
    fetchData();
  };

  const assignPlayerHandler = (event) => {
    event.preventDefault();
    const playerDataToAdd = JSON.parse(event.currentTarget.getAttribute('data'));
    let changed = false;
    formation.forwards.map((forward, index) => {
      if (fwPositions.includes(playerDataToAdd.mainposition) && forward.cardData === "" && !changed) {
        const newformation = {...formation};
        newformation.forwards[index].cardData = playerDataToAdd;
        changed = true;
        return setFormation(newformation);
      }
    })
    formation.midfielders.map((midfielder, index) => {
      if (midPositions.includes(playerDataToAdd.mainposition) && midfielder.cardData === "" && !changed) {
        const newformation = {...formation};
        newformation.midfielders[index].cardData = playerDataToAdd;
        changed = true;
        return setFormation(newformation);
      }
    })

    formation.defenders.map((defender, index) => {
      if (defPositions.includes(playerDataToAdd.mainposition) && defender.cardData === "" && !changed) {
        const newformation = {...formation};
        newformation.defenders[index].cardData = playerDataToAdd;
        changed = true;
        return setFormation(newformation);
      }
    })
    if (formation.gk.cardData === "" && playerDataToAdd.mainposition === "GK") {
      const newformation = {...formation};
      newformation.gk.cardData = playerDataToAdd;
      return setFormation(newformation);
    }
  }

  const handleAddPlayer = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${API_URL}/addplayerbyuid`, { uid: uid });
      fetchData();
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleUIDChange = (event) => {
    setUID(event.target.value);
  };

  const resetFiltersHandler = (event) => {
    event.preventDefault();
    setLoading(true);
    setSearchQuery('')
    setPage(0);
    loadData({league: '', club: '', country: '', position: ''})
  }

  const handleSearchFieldChange = (event) => {
    loadData({ ...data, [event.target.name]: event.target.value });
  };

  const pickFormationHandler = (event) => {
    event.preventDefault();
    const formationToPick = JSON.parse(event.target.value);
    console.log(formationToPick)
    setFormation(formationToPick);
  }

  const handleSort = (event) => {
    setPlsort(event.target.value)
  }

  return (
    <div>
      <Grid container spacing={2} paddingTop={5} direction="column">
        <Grid item container direction="row" mx="auto">
          <Grid item mx="auto">
          <form onSubmit={handleAddPlayer} >
              <TextField label="Add player by UID" value={uid} onChange={handleUIDChange} />
              <Button variant="outlined" type="submit">Add</Button>
            </form>
          </Grid>
          <Grid item mx="auto" >
          <form onSubmit={handleSearch}>
              <Grid container direction='column' spacing={2}>
                <Grid item mx='auto' sx={{display:'flex'}}>
                  <TextField
                    value={searchQuery}
                    onChange={handleInputChange}
                  />
                  <Button variant='contained' type="submit">Search</Button>
                </Grid>
                <Grid item mx='auto' sx={{display:'flex'}}>
                  <Button variant='contained' onClick={resetFiltersHandler}><RestartAltIcon></RestartAltIcon></Button>
                  <Select startAdornment={<EmojiEventsIcon/>} value={data.league} name="league" onChange={handleSearchFieldChange}>
                    <MenuItem value="" key='Alll'>
                      All
                    </MenuItem>
                    {fields.leagues
                      ? fields.leagues.map((league) => (
                          <MenuItem key={league.name} value={league.name}>{league.name}</MenuItem>
                        ))
                      : null}
                  </Select>
                  <Select
                    variant='outlined'
                    startAdornment={<PublicIcon/>}
                    name="country"
                    onChange={handleSearchFieldChange}
                  >
                    <MenuItem key='allco' value="">All</MenuItem>
                    {fields.countries
                      ? fields.countries.map((country) => (
                          <MenuItem key={country.name} value={country.name}>
                            {country.name}
                          </MenuItem>
                        ))
                      : null}
                  </Select>
                  <Select
                  startAdornment={<Diversity3Icon/>}
                    name="club"
                    onChange={handleSearchFieldChange}
                  >
                    <MenuItem value="" key='allcl'>All</MenuItem>
                    {fields.clubs
                      ? fields.clubs.map((club) => (
                          <MenuItem key={club.name} value={club.name}>{club.name}</MenuItem>
                        ))
                      : null}
                  </Select>
                  <Select
                  startAdornment={<RadarIcon/>}
                  variant='outlined'
                    name="position"
                    onChange={handleSearchFieldChange}
                  >

                    <MenuItem value="" key='allpos'>All</MenuItem>
                    {fields.positions
                      ? fields.positions.map((position) => (
                          <MenuItem key={position.name} value={position.name}>{position.name}</MenuItem>
                        ))
                      : null}
                  </Select>
                  <Select name='Plsort' onChange={handleSort}>
                    <MenuItem key='OVR Ascending' value='OVR Ascending'>OVR Ascending</MenuItem>
                    <MenuItem key='OVR Descending' value='OVR Descending'>OVR Descending</MenuItem>
                    <MenuItem key='Cost Ascending' value='Cost Ascending'>Cost Ascending</MenuItem>
                    <MenuItem key='Cost Descending' value='Cost Descending'>Cost Descending</MenuItem>
                    <MenuItem key='Rating Ascending' value='Rating Ascending'>Rating Ascending</MenuItem>
                    <MenuItem key='Rating Descending' value='Rating Descending'>Rating Descending</MenuItem>
                  </Select>
                </Grid>
              </Grid>
            </form>
            
          </Grid>
          <Grid item mx="auto">
          Page {page}: <Button variant='outlined' onClick={()=>(page > 0)?setPage(page - 1):""}>-</Button>
      
        <Button variant='outlined' onClick={()=>setPage(page + 1)}>+</Button>
          </Grid>
        </Grid>
        
        {loading ? (
          <Typography>Loading...</Typography>
        ) : (
          <Grid item container spacing={2}>
            {players &&
              players.map((player) => (
                  <PlayerCard key={player.guruKey} onAssignPlayer={assignPlayerHandler} data={player} />
              ))}
          </Grid>
        )}
      </Grid>
      <div style={{display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column'}}>
      <Select startAdornment={<AppsIcon/>} px='auto' onChange={pickFormationHandler}> 
        {formationsJson && formationsJson.map((formation) => {
          return <MenuItem key={formation.name} value={JSON.stringify(formation.formation)} >{formation.name}</MenuItem>
        })}
      </Select>
      </div>
      <Typography textAlign='center'>{'OVR:' + fieldData.OVR}</Typography>
      <SCField formation={formation}/>
    </div>
  );
};

export default App;
