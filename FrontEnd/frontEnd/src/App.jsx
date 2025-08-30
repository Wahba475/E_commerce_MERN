import React from "react";
import NavBar from "./components/NavBar";
import "./index.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Footer from "./components/Footer";
import Products from "./pages/Products";
import Cart from "./pages/Cart";

export default function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />

      </Routes>
      <Footer />
    </div>
  );
}
