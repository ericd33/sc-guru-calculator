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
  const [data, loadData] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [uid, setUID] = useState("");
  const [page, setPage] = useState(0);
  const [fields, setFields] = useState({
    leagues: [],
    clubs: [],
    countries: [],
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
    fetchData();
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
      await axios.post(`${API_URL}/addplayerbyuid`, { uid: uid });

      fetchData();
      console.log("player added");
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
        <Grid item container direction="column" mx="auto">
          <Grid item mx="auto">
            <Typography>Search Player</Typography>
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
                  <Typography>Filters</Typography>
                  <Select name="league" onChange={handleSearchFieldChange}>
                    <MenuItem value="">
                      All
                    </MenuItem>
                    {fields.leagues
                      ? fields.leagues.map((league) => (
                          <MenuItem value={league.name}>{league.name}</MenuItem>
                        ))
                      : null}
                  </Select>
                  <Select
                    name="country"
                    label="Country"
                    onChange={handleSearchFieldChange}
                  >
                    <MenuItem value="">All</MenuItem>
                    {fields.countries
                      ? fields.countries.map((country) => (
                          <MenuItem value={country.name}>
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
                    <MenuItem value="">All</MenuItem>
                    {fields.clubs
                      ? fields.clubs.map((club) => (
                          <MenuItem value={club.name}>{club.name}</MenuItem>
                        ))
                      : null}
                  </Select>
                </Grid>
              </Grid>
            </form>
          </Grid>
          <Grid item mx="auto">
            <form onSubmit={handleAddPlayer}>
              <TextField label="UID" value={uid} onChange={handleUIDChange} />
            </form>
          </Grid>
        </Grid>

        {loading ? (
          <Typography>Loading...</Typography>
        ) : (
          <Grid item container spacing={2}>
            {players &&
              players.map((player) => (
                <Grid item key={player.cardName}>
                  <PlayerCard data={player} />
                </Grid>
              ))}
          </Grid>
        )}
      </Grid>
      Page {page}: <Button onClick={()=>setPage(page - 1)}>-</Button>
      
      <Button onClick={()=>setPage(page + 1)}>+</Button>
    </div>
  );
};

export default App;
