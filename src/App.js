import "./styles.css";
import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./Main.js";
import Admin from "./Admin.js";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Main />} />
        <Route exact path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}
