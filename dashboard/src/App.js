import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";

import Students from "./pages/students";
import Login from "./pages/login";

const apiUrl = "http://localhost:3001/students";

axios.interceptors.request.use(
  (config) => {
    const currentUrl = window.location.href;
    const allowedOrigins = [apiUrl];
    const token = localStorage.getItem("token");

    if (allowedOrigins.includes(currentUrl)) {
      config.headers.authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/students" element={<Students />} />
      </Routes>
    </Router>
  );
}

export default App;
