import AppRouter from "./routers/AppRouter";
import { CssBaseline } from "@mui/material";
import { PlacesDataProvider } from "./context/PlacesDataContext";
import { InfoCardProvider } from "./context/InfoCardContext";

const App = () => {
  return (
    <InfoCardProvider>
      <PlacesDataProvider>
        <CssBaseline>
          <AppRouter />
        </CssBaseline>
      </PlacesDataProvider>
    </InfoCardProvider>
  );
};

export default  App ;