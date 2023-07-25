import { useParams } from "react-router-dom";
import * as Constant from "./Constant.js";
import { useEffect, useState } from "react";
import { Alert, Box, Button, Grid, Paper, Typography } from "@mui/material";

export default function ProductDetail() {
  const [quantity, setQuantity] = useState(1);
  const user = localStorage.getItem("user");
  const token = localStorage.getItem("jwt");
  let { id } = useParams();
  const [product, setProduct] = useState({
    productId: "",
    name: "",
    image: "",
    price: "",
    stock: "",
    info: "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    var url = `${Constant.SERVER_URL}product/id/${id}`;
    fetch(url, {
      headers: { Authorization: token },
    })
      .then((res) => res.json())
      .then((res) => setProduct({ ...res }));
    console.log(product);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const right = (
    <div className="imgProductDetail">
      <img
        sx={{ height: { xs: "200px", sm: "300px", md: "600px" } }}
        src={`${product.image}`}
        alt={product.name}
        width="100%"></img>
    </div>
  );

  function AddToCart(productId) {
    var url = `${Constant.SERVER_URL}customer/add-to-cart/${user}`;
    var productDTO = { productId: productId, quantity: quantity };
    fetch(url, {
      headers: { Authorization: token, "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(productDTO),
    })
      .then((res) => {
        if (res.status === 200) {
          // alert("Added to cart");
          setMessage("success");
        }
      })
      .catch((err) => console.error(err));
  }

  const left = (
    <div className="productDetail">
      <Typography
        variant="h5"
        component="p"
        sx={{ fontWeight: "bold", typography: { sm: "body1", xs: "body2" } }}
        margin={1}
        padding={1}>
        {product.name}
      </Typography>
      <Typography
        variant="h6"
        component="p"
        sx={{ color: "red", typography: { sm: "body1", xs: "body2" } }}
        marginX={1}
        padding={1}>
        {`Price: ${Number(product.price).toLocaleString()} đ`}
      </Typography>
      <Typography
        variant="body1"
        component="p"
        marginX={1}
        sx={{ typography: { sm: "body1", xs: "body2" } }}
        padding={1}>{`Stock: ${product.stock}`}</Typography>
      <Typography
        variant="body1"
        component="p"
        sx={{ typography: { sm: "body1", xs: "body2" } }}
        margin={1}
        padding={1}
        marginBottom={5}>
        {"Qty:  "}
        <input
          type="number"
          id="quantity"
          value={quantity}
          min="1"
          max={product.stock}
          onChange={(e) => setQuantity(e.target.value)}
        />
      </Typography>
      <Typography marginBottom={5}>
        <Button
          className="addToCartButton"
          variant="outlined"
          color="primary"
          onClick={() => AddToCart(product.productId)}>
          Add to cart
        </Button>
      </Typography>
    </div>
  );

  const bookContent = product.info.split(/[.?!],/)[0];
  const author = product.info.split(/[.?!],/)[1];
  const info = (
    <div>
      <Typography
        variant="h6"
        component="p"
        sx={{ fontWeight: "bold" }}
        margin={1}>
        Product Information :{" "}
      </Typography>
      <Typography
        variant="subtitle1"
        component="p"
        sx={{ fontStyle: "italic" }}
        margin={1}>
        Author: {author}
      </Typography>
      <Typography variant="body1" component="p" margin={1}>
        Content: {bookContent}
      </Typography>
    </div>
  );

  return (
    <Box sx={{ m: 1, p: 1 }}>
      {message === "success" ? (
        <Box sx={{ margin: 2 }}>
          <Alert
            onClose={() => {
              setMessage("");
            }}>
            Added to cart
          </Alert>
        </Box>
      ) : (
        <div></div>
      )}

      <Grid
        container
        spacing={{ xs: 0, md: 1 }}
        columns={{ xs: 4, sm: 8, md: 12 }}>
        <Grid item xs={6}>
          <Paper elevation={3}>{right}</Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper
            elevation={3}
            sx={{
              height: { xs: "300px", sm: "400px", md: "521px" },
              paddingTop: 1,
              paddingBottom: 10,
            }}>
            {left}
          </Paper>
        </Grid>

        <Paper elevation={3} sx={{ m: 1, p: 2 }}>
          <Grid item xs={12}>
            {info}
          </Grid>
        </Paper>
      </Grid>
    </Box>
  );
}
