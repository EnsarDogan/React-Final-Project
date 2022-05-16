import { Grid } from "@mui/material";
import { Header, List, Map } from "../components";
import { useState, useEffect } from "react";
import { getPlacesData } from "../api";
import { useLoadScript } from "@react-google-maps/api";
import { useContext } from "react";
import { PlacesDataContext } from "../context/PlacesDataContext";

const libraries = ["places"];
const MainPage = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });
  const { places, setPlaces } = useContext(PlacesDataContext);
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState("restaurants");
  const [rating, setRating] = useState(0);
  const [coordinates, setCoordinates] = useState({});

  const getData = async () => {
    try {
      setIsLoading(true);
      const response = await getPlacesData(
        type,
        { lat: coordinates.lat + 2, lng: coordinates.lng - 2 },
        { lat: coordinates.lat - 2, lng: coordinates.lng + 2 }
      );
      setPlaces(response?.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords }) =>
      setCoordinates({ lat: coords.latitude, lng: coords.longitude })
    );
  }, []);

  useEffect(() => {
    getData();
  }, [type, coordinates]);

  return (
    <div style={{ height: "100vh" }}>
      {loadError ? (
        "error"
      ) : !isLoaded ? (
        "loading..."
      ) : (
        <Header style={{ height: "5%" }} setCoordinates={setCoordinates} />
      )}
      <Grid container style={{ height: "90%" }}>
        <Grid item xs={12} md={4}>
          <List
            places={places}
            isLoading={isLoading}
            setType={setType}
            type={type}
            rating={rating}
            setRating={setRating}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          {loadError ? (
            "error"
          ) : !isLoaded ? (
            "loading..."
          ) : (
            <Map places={places} rating={rating} coordinates={coordinates} />
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default MainPage;
