import { Grid } from "@mui/material";
import { Header } from "../components";
const MainPage = () => {
  return (
    <>
      <Header />
      <Grid container spacing={3} style={{ width: "%100" }}>
        <Grid item xs={12} md={4}>
          List
        </Grid>
        <Grid item xs={12} md={8}>
          Map
        </Grid>
      </Grid>
    </>
  );
};

export default MainPage;
