import React from "react";
import TextField from "@mui/material/TextField";

function SearchBar(props) {

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      props.onSearch(event.target.value);
    }
  };

  return (
    <TextField
      label="Search"
      variant="outlined"
      color="primary"
      onKeyPress={handleKeyPress}
    />
  );
}

export default SearchBar;
