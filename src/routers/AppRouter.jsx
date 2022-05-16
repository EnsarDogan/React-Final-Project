import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import AdviseDetailsPage from "../pages/AdviseDetailsPage";

import MainPage from "../pages/MainPage";

const AppRouter = () => {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/advise/:id" element={<AdviseDetailsPage />} />
        </Routes>
      </Router>
    );
}

export default AppRouter;