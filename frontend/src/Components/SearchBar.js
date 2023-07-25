import SearchIcon from "@mui/icons-material/Search";
import { Box, IconButton, TextField } from "@mui/material";
import { useState } from "react";
import BrowseProducts from "./BrowseProducts.js";
import * as Constant from "./Constant.js";
import ProductList from "./ProductList.js";

export default function SearchBar() {
  const [input, setInput] = useState("");
  // const token = localStorage.getItem("jwt");
  const [products, setProducts] = useState([]);

  function handleClick() {
    let url = `${Constant.SERVER_URL}product/${input}`;
    fetch(url, {
      // headers: { Authorization: token },
    })
      .then((res) => res.json())
      .then((res) => setProducts([...res]))
      .catch((err) => console.error(err));
  }

  function handleChange(e) {
    setInput(e.target.value);
  }

  const search = (
    <>
      <TextField
        sx={{ width: { xs: "80%", sm: "85%", md: "90%" }, marginTop: 2 }}
        id="search-bar"
        className="text"
        onChange={handleChange}
        label="Search book by name"
        variant="outlined"
        placeholder="Search..."
        size="small"
      />
      <IconButton
        type="button"
        aria-label="search"
        onClick={handleClick}
        sx={{ marginTop: 2 }}>
        <SearchIcon style={{ fill: "blue" }} />
      </IconButton>
    </>
  );

  return (
    <>
      <Box marginBottom={5} marginX={2}>
        {search}
      </Box>
      <Box>
        {products.length > 0 ? (
          <ProductList products={products} />
        ) : (
          <BrowseProducts />
        )}
      </Box>
    </>
  );
}
