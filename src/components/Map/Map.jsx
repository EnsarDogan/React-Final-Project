import { useState, useCallback, memo } from "react";
import { GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";
import { Paper, Rating, Typography, useEventCallback } from "@mui/material";

const fakeImg =
  "https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg";
const mapContainerStyle = { width: "100%", height: "100%" };
const coordinates = { lat: 41.0082, lng: 28.9784 };
const options = { disableDefaultUI: true, zoomControl: true };
const Map = ({ places }) => {
  const [selectedMarker, setSelectedMarker] = useState(null);
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
        zoom={10}
        options={options}

        // onClick={() => alert("yood")}
        // onDblClick={() => alert("ooooo")}
      >
        {places?.length > 0
          ? places?.map((place, i) => (
              <Marker
                key={i}
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
              onDoubleClick={() => alert("iii")}
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

export default memo(Map);
