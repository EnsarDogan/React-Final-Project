import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";

import MainPage from "../pages/MainPage";

const AppRouter = () => {
    return <Router>
        <Routes>
            <Route path="/" element={<MainPage />} />
        </Routes>
    </Router>
}

export default AppRouter;