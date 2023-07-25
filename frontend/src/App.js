import Header from "./Components/Header.js";
import Login from "./Components/Login.js";

import { Container } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import BrowseProducts from "./Components/BrowseProducts.js";
import Cart from "./Components/Cart.js";
import Home from "./Components/Home.js";
import Logout from "./Components/Logout.js";
import Order from "./Components/Order.js";
import ProductDetail from "./Components/ProductDetail.js";
import SearchBar from "./Components/SearchBar.js";
import SignUp from "./Components/SignUp.js";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Container maxWidth="md">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/" element={<Home />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/product-detail/:id" element={<ProductDetail />} />
          <Route path="/search-bar" element={<SearchBar />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/cart/remove/:id" element={<Cart />} />
          <Route path="/order" element={<Order />} />
          <Route path="/browse-products/:number" element={<BrowseProducts />} />
        </Routes>
      </Container>
      {/* <Link to="/">Home</Link>
          <Link to="/browse-products/0">New Books</Link>
          <Link to="/search-bar">Search Books</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/order">Order</Link>
          <Link to="/sign-up">Sign up</Link>
          <Link to="/login">Login</Link>
          <Link to="/logout">Logout</Link> */}
    </BrowserRouter>
  );
}
