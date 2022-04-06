import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserProvider from "./context/UserContext";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";

function App() {
  return (
    <Router>
      <UserProvider>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
        </Routes>
      </UserProvider>
    </Router>
  );
}

export default App;
