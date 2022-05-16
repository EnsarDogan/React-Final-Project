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

  const getData = async () => {
    try {
      setIsLoading(true);
      const response = await getPlacesData();
      setPlaces(response?.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div style={{ height: "100vh" }}>
      <Header style={{ height: "5%" }} />
      <Grid container style={{ height: "90%" }}>
        <Grid item xs={12} md={4}>
          <List places={places} isLoading={isLoading} />
        </Grid>
        <Grid item xs={12} md={8}>
          {loadError ? (
            "error"
          ) : !isLoaded ? (
            "loading..."
          ) : (
            <Map places={places} />
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default MainPage;
