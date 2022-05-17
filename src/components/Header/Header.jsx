import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Search, SearchIconWrapper, StyledInputBase } from "./Header.style";
import { Autocomplete } from "@react-google-maps/api";
import { useState } from "react";

const Header = ({ setCoordinates }) => {
  const [autoCompleteRef, setAutoCompleteRef] = useState(null);
  const onLoad = (autoComplete) => setAutoCompleteRef(autoComplete);
  const onPlaceChanged = () => {
    const lat = autoCompleteRef.getPlace().geometry.location.lat();
    const lng = autoCompleteRef.getPlace().geometry.location.lng();
    console.log(lat, lng);
    setCoordinates({ lat, lng });
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "block", sm: "block" } }}
          >
            Your Trip Advisor
          </Typography>
          <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
          </Autocomplete>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
