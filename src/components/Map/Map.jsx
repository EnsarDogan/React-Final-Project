import { useState, useContext } from "react";
import { GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";
import { Paper, Rating, Typography } from "@mui/material";
import { InfoCardContext } from "../../context/InfoCardContext";
import MapStyle from "./Map.style.js";

const fakeImg =
  "https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg";
const mapContainerStyle = { width: "100%", height: "100%" };
const options = {
  disableDefaultUI: true,
  zoomControl: true,
  //to be able to change the color of the map thanks to https://snazzymaps.com/
  styles: MapStyle,
};
const Map = ({ places, rating, coordinates, setCoordinates }) => {
  const [selectedMarker, setSelectedMarker] = useState(null);
  const { setInfoCardClicked } = useContext(InfoCardContext);

  // to get the data according to the double clicked center on map
  const onMapDbClick = (event) => {
    setCoordinates({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    });
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        padding: 2,
        boxShadow: "0px 0px 5px 2px rgba(0,0,0,0.31)",
      }}
    >
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={coordinates}
        zoom={8}
        options={options}
        onDblClick={onMapDbClick}
      >
        {places?.length > 0
          ? places
              ?.filter((place) => Number(place?.rating) > rating)
              .map((place) => (
                <Marker
                  position={{
                    lat: Number(place?.latitude),
                    lng: Number(place?.longitude),
                  }}
                  animation={window.google.maps.Animation.DROP}
                  onClick={() => setSelectedMarker(place)}
                />
              ))
          : null}
        {selectedMarker ? (
          <InfoWindow
            position={{
              lat: Number(selectedMarker.latitude),
              lng: Number(selectedMarker.longitude),
            }}
            onCloseClick={() => setSelectedMarker(null)}
          >
            <Paper
              elevation={3}
              style={{
                padding: "10px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                width: "200px",
                cursor: "pointer",
              }}
              //to be able to pass the clicked one smootly on List
              onDoubleClick={() =>
                setInfoCardClicked(selectedMarker.location_id)
              }
            >
              <Typography variant="subtitle2" gutterBottom>
                {selectedMarker?.name}
              </Typography>
              <img
                alt=""
                src={
                  selectedMarker?.photo
                    ? selectedMarker.photo?.images?.large?.url
                    : fakeImg
                }
              />
              <Rating
                name="read-only"
                size="small"
                value={Number(selectedMarker?.rating)}
                readOnly
              />
            </Paper>
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </div>
  );
};

export default Map;
