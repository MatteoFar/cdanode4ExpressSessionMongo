import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import Home from "./views/home";
import Signup from "./views/inscription";
import Dashboard from "./views/dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
