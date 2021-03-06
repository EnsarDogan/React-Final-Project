import {
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
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { InfoCardContext } from "../../context/InfoCardContext";

import "./placeCard.css";
const PlaceCard = ({ place, reference }) => {
  const { infoCardClicked } = useContext(InfoCardContext);
  const navigate = useNavigate();
  const fakeImg =
    "https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg";

  //to be able to pass the clicked one smootly on List
  if (infoCardClicked === place?.location_id) {
    reference?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="cardContainer">
      <Card
        elevation={10}
        onClick={(e) => navigate(`/advise/${place.location_id}`)}
      >
        <CardMedia
          style={{ height: 350 }}
          image={place?.photo ? place.photo.images.large.url : fakeImg}
          title={place?.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5">
            {place?.name}
          </Typography>
          <Box display="flex" justifyContent="space-between" my={1.5}>
            <Rating name="read-only" value={Number(place?.rating)} readOnly />
            <Typography gutterBottom component="legend">
              {place?.num_reviews} review{place?.num_reviews > 1 ? "s" : ""}
            </Typography>
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Typography gutterBottom component="legend">
              Price
            </Typography>
            <Typography gutterBottom variant="subtitle1">
              {place?.price_level}
            </Typography>
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Typography component="legend">Ranking</Typography>
            <Typography gutterBottom variant="subtitle1">
              {place?.ranking}
            </Typography>
          </Box>
          {place?.awards?.map((award) => (
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
          {place?.cuisine?.map(({ name }) => (
            <Chip gutterBottom key={name} size="small" label={name} />
          ))}
          {place?.address ? (
            <Typography variant="body2" color="textSecondary">
              <LocationOnIcon />
              {place?.address}
            </Typography>
          ) : null}
          {place?.phone ? (
            <Typography variant="body2" color="textSecondary">
              <PhoneIcon /> {place?.phone}
            </Typography>
          ) : null}
        </CardContent>
        <CardActions>
          <Button
            size="small"
            color="primary"
            onClick={() => window.open(place?.web_url, "_blank")}
          >
            Trip Advisor
          </Button>
          <Button
            size="small"
            color="primary"
            onClick={() => window.open(place?.website, "_blank")}
          >
            Website
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}

export default PlaceCard;
