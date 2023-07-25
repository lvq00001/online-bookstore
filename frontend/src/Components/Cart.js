import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {
  BottomNavigation,
  Box,
  Button,
  Container,
  Paper,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CartCard from "./CartCard.js";
import * as Constant from "./Constant.js";

function Cart() {
  const [cart, setCart] = useState([]);
  const token = localStorage.getItem("jwt");
  const user = localStorage.getItem("user");
  const [check, setCheck] = useState(new Map());
  const navigate = useNavigate();

  useEffect(() => {
    let url = Constant.SERVER_URL + "customer/cart/" + user;
    fetch(url, {
      headers: { Authorization: token },
    })
      .then((res) => res.json())
      .then((res) => setCart([...cart, ...res]))
      .catch((err) => console.error(err));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function RemoveFromCart(productId) {
    let url = `${Constant.SERVER_URL}customer/remove-from-cart/${user}`;
    var productDTO = { productId: productId, quantity: 1 };
    fetch(url, {
      headers: { Authorization: token, "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(productDTO),
    })
      .then((res) => {
        if (res.status === 200) {
          alert("Remove from cart");
          window.location.reload();
        }
      })
      .catch((err) => console.error(err));
  }

  function HandleCheck(id, stock, e) {
    if (check.has(id)) {
      check.delete(id);
    } else {
      check.set(id, stock);
    }
    console.log(check);
  }

  const tableData = cart.map((item) => (
    <CartCard
      key={item.productId}
      HandleCheck={HandleCheck}
      item={item}
      RemoveFromCart={RemoveFromCart}
    />
  ));

  function handleBuy() {
    let keys = [];
    check.forEach(function (value, key) {
      keys = [...keys, { productId: key, quantity: value }];
    });

    var url = `${Constant.SERVER_URL}customer/checking-order/${user}`;
    fetch(url, {
      headers: { Authorization: token, "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(keys),
    })
      .then(() => navigate("/order"))
      .catch((err) => console.error(err));
  }
  if (token === null) return <p className="home">Please Login First.</p>;
  if (cart.length === 0) return <p className="home">Nothing in your cart</p>;

  return (
    <>
      <Container maxWidth="sm">
        <Typography variant="h5" component="p" margin={2}>
          CART
        </Typography>
        <Box marginBottom={10}>{tableData}</Box>

        <Paper
          sx={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
          }}
          elevation={3}>
          <BottomNavigation sx={{ backgroundColor: "red" }}>
            <Button
              startIcon={<CheckCircleIcon />}
              onClick={handleBuy}
              sx={{ color: "white" }}>
              Buy Now
            </Button>
          </BottomNavigation>
        </Paper>
      </Container>
    </>
  );
}

export default Cart;
