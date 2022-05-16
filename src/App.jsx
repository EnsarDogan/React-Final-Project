import AppRouter from "./routers/AppRouter";
import { CssBaseline } from "@mui/material";
import { PlacesDataProvider } from "./context/PlacesDataContext";

const App = () => {
  return (
    <PlacesDataProvider>
      <CssBaseline>
        <AppRouter />
      </CssBaseline>
    </PlacesDataProvider>
  );
};

export default  App ;