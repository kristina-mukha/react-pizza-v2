import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home.jsx";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound.jsx";
import "./scss/app.scss";

function App() {
  return (
    <div className="App">
      <div className="layoutMain">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
