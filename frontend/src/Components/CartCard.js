import { Button, Grid, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";

function CartCard({ HandleCheck, item, RemoveFromCart }) {
  return (
    <div>
      <Paper elevation={3}>
        <Grid container spacing={0}>
          <Grid item xs={2}>
            <Stack spacing={5}>
              <div></div>
              <input
                key={item.productId}
                type="checkbox"
                id="choose"
                onChange={() => HandleCheck(item.productId, item.stock)}
              />
              <div></div>
            </Stack>
          </Grid>

          <Grid item xs={3} paddingTop={1}>
            <img src={`${item.image}`} alt={item.name} height="100px"></img>
          </Grid>

          <Grid item xs={6} marginTop={1}>
            <Stack spacing={0}>
              <Typography variant="subtitle1" component="p">
                {item.name}
              </Typography>
              <Typography variant="h6" component="p" color="red">
                {Number(item.price).toLocaleString()} đ
              </Typography>
              <Stack direction="row" spacing={2} marginTop={1} marginBottom={1}>
                <Typography variant="subtitle2" component="p" marginTop={1}>
                  Qty: {item.stock}
                </Typography>
                <Button
                  startIcon={<DeleteIcon />}
                  onClick={() => RemoveFromCart(item.productId)}></Button>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

export default CartCard;
