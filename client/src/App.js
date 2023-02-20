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
import PlayerCard from "./components/PlayerCard";

const App = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [data, loadData] = useState({league: '', club: '', country: '', position: ''});
  const [searchQuery, setSearchQuery] = useState("");
  const [uid, setUID] = useState("");
  const [page, setPage] = useState(0);
  const [fields, setFields] = useState({
    leagues: [''],
    clubs: [''],
    countries: [''],
  });
  const API_URL = process.env.REACT_APP_API_URL;
  const fetchData = async () => {
    try {
      const response = await axios.post(`${API_URL}/getall`, {page});
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

  useEffect(() => {
  setLoading(true);
  fetchData();
  },[page])

  const handleSearch = async (event) => {
    event.preventDefault();
    setLoading(true);
    console.log(data);
    try {
      const response = await axios.post(`${API_URL}/getplayers`, {
        fullName: searchQuery,
        ...data,
      });

      setPlayers(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddPlayer = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${API_URL}/addplayerbyuid`, { uid: uid }).then(() => fetchData());
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

  const handleSearchFieldChange = (event) => {
    loadData({ ...data, [event.target.name]: event.target.value });
  };

  return (
    <div>
      <Grid container spacing={2} paddingTop={5} direction="column">
        <Grid item container direction="row" mx="auto">
          <Grid item mx="auto">
            <form onSubmit={handleSearch}>
              <Grid container direction='column'>
                <Grid item mx='auto'>
                  <TextField
                    label="Search"
                    value={searchQuery}
                    onChange={handleInputChange}
                  />
                  <Button type="submit">Search</Button>
                </Grid>
                <Grid item mx='auto'>
                  <Select value={data.league} label='All' name="league" onChange={handleSearchFieldChange}>
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
                    name="country"
                    label="Country"
                    onChange={handleSearchFieldChange}
                  >
                    <MenuItem key='allco' value=" ">All</MenuItem>
                    {fields.countries
                      ? fields.countries.map((country) => (
                          <MenuItem key={country.name} value={country.name}>
                            {country.name}
                          </MenuItem>
                        ))
                      : null}
                  </Select>
                  <Select
                    name="club"
                    label="Club"
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
                    name="position"
                    label="Position"
                    onChange={handleSearchFieldChange}
                  >
                    <MenuItem value="" key='allcl'>All</MenuItem>
                    {fields.positions
                      ? fields.positions.map((position) => (
                          <MenuItem key={position.name} value={position.name}>{position.name}</MenuItem>
                        ))
                      : null}
                  </Select>
                </Grid>
              </Grid>
            </form>
          </Grid>
          <Grid item mx="auto">
            <form onSubmit={handleAddPlayer}>
              <TextField label="Add player by UID" value={uid} onChange={handleUIDChange} />
              <Button variant="outlined" type="submit">Add</Button>
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
                  <PlayerCard key={player.fullName} data={player} />
              ))}
          </Grid>
        )}
      </Grid>
      
    </div>
  );
};

export default App;
