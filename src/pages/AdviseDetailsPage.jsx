import { useParams } from "react-router-dom";
import { useContext } from "react";
import { PlacesDataContext } from "../context/PlacesDataContext";
import {
  Grid,
  Box,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Chip,
  Rating,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
const AdviseDetailsPage = () => {
  const fakeImg =
    "https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg";
  const { id } = useParams();
  const { places } = useContext(PlacesDataContext);
  const selected = places.filter((place) => place.location_id === id)[0];

  return (
    <div>
      <Grid
        container
        style={{
          marginTop: 20,
          padding: 10,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Grid item xs={12} md={4} style={{ padding: 5 }}>
          <Card>
            <CardMedia
              style={{ height: 350 }}
              image={
                selected?.photo ? selected.photo.images.large.url : fakeImg
              }
              title={selected?.name}
            />
          </Card>
        </Grid>
        <Grid item xs={12} md={8} style={{ padding: 5 }}>
          <Card>
            <CardContent>
              <Typography
                gutterBottom
                variant="h4"
                style={{ textAlign: "center", margin: 10 }}
              >
                {selected?.name}
              </Typography>
              <Box display="flex" justifyContent="space-between" my={1.5}>
                <Rating
                  name="read-only"
                  value={Number(selected?.rating)}
                  readOnly
                />
                <Typography component="legend">
                  {selected?.num_reviews} review
                  {selected?.num_reviews > 1 ? "s" : ""}
                </Typography>
              </Box>
              <Box display="flex" justifyContent="space-between">
                <Typography component="legend">Price</Typography>
                <Typography gutterBottom variant="subtitle1">
                  {selected?.price_level}
                </Typography>
              </Box>
              <Box display="flex" justifyContent="space-between">
                <Typography component="legend">Ranking</Typography>
                <Typography gutterBottom variant="subtitle1">
                  {selected?.ranking}
                </Typography>
              </Box>
              {selected?.awards?.map((award) => (
                <Box
                  display="flex"
                  justifyContent="space-between"
                  my={1}
                  alignItems="center"
                >
                  <img src={award.images.small} />
                  <Typography variant="subtitle2" color="textSecondary">
                    {award.display_name}
                  </Typography>
                </Box>
              ))}

              {selected?.cuisine?.map(({ name }) => (
                <Chip key={name} size="small" label={name} />
              ))}
              {selected?.address ? (
                <Typography gutterBottom variant="body2" color="textSecondary">
                  <LocationOnIcon />
                  {selected?.address}
                </Typography>
              ) : null}
              {selected?.phone ? (
                <Typography variant="body2" color="textSecondary">
                  <PhoneIcon /> {selected?.phone}
                </Typography>
              ) : null}
              <Typography
                gutterBottom
                variant="h6"
                color="textPrimary"
                style={{ paddingTop: 10, textAlign: "center" }}
              >
                {selected?.description}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                color="primary"
                onClick={() => window.open(selected?.web_url, "_blank")}
              >
                Trip Advisor
              </Button>
              <Button
                size="small"
                color="primary"
                onClick={() => window.open(selected?.website, "_blank")}
              >
                Website
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default AdviseDetailsPage;
