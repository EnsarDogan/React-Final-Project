import {
  CircularProgress,
  Grid,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";
import { PlaceCard } from "../";
import { useState, useEffect, createRef } from "react";

const List = ({
  places,
  isLoading,
  type,
  setType,
  rating,
  setRating,
}) => {
  const [elementReferences, setElementReferences] = useState({});
  useEffect(() => {
    setElementReferences((prevReferences) =>
      places?.reduce((prev, place) => {
        return {
          ...prev,
          [place?.location_id]:
            prevReferences?.[places?.location_id] || createRef(),
        };
      }, {})
    );
  }, [places]);
  return (
    <div style={{ padding: "10px" }}>
      <Typography variant="h4">Food and Dining Around You</Typography>
      {isLoading ? (
        <div>
          <CircularProgress />
        </div>
      ) : (
        <>
          <FormControl
            style={{ minWidth: 120, margin: 10, marginBottom: 30 }}
            size="small"
          >
            <InputLabel id="type">Type</InputLabel>
            <Select
              id="type"
              value={type}
              onChange={(e) => {
                setType(e.target.value);
              }}
              label="Type"
            >
              <MenuItem value="restaurants">Restaurants</MenuItem>
              <MenuItem value="hotels">Hotels</MenuItem>
              <MenuItem value="attractions">Attractions</MenuItem>
            </Select>
          </FormControl>
          <FormControl
            style={{ minWidth: 120, margin: 10, marginBottom: 30 }}
            size="small"
          >
            <InputLabel id="rating">Rating</InputLabel>
            <Select
              id="rating"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              label="Rating"
            >
              <MenuItem value={0}>All</MenuItem>
              <MenuItem value={3}>Above 3.0</MenuItem>
              <MenuItem value={4}>Above 4.0</MenuItem>
              <MenuItem value={4.5}>Above 4.5</MenuItem>
            </Select>
          </FormControl>
          <Grid
            container
            spacing={3}
            style={{ height: "75vh", overflow: "auto" }}
          >
            {places &&
              places
                ?.filter((place) => Number(place?.rating) > rating)
                .map((place) => (
                  <Grid
                    ref={elementReferences?.[place?.location_id]}
                    item
                    xs={12}
                  >
                    <PlaceCard
                      place={place}
                      reference={elementReferences?.[place?.location_id]}
                    />
                  </Grid>
                ))}
          </Grid>
        </>
      )}
    </div>
  );
};

export default List;
