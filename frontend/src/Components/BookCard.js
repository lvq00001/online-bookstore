import { Box, Button, Paper, Typography } from "@mui/material";
import * as React from "react";
import { Link } from "react-router-dom";

export default function BookCard({ book }) {
  return (
    <div>
      <Paper elevation={3} sx={{ pb: 1 }}>
        <Box sx={{ width: "90%" }} margin={1}>
          <img
            src={book.image}
            alt=""
            width="100%"
            height="350px"
            className="img"
          />
        </Box>
        <Typography
          variant="BUTTON TEXT"
          component="h6"
          margin={1}
          sx={{
            display: "-webkit-box",
            overflow: "hidden",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 1,
          }}>
          {book.name}
        </Typography>
        <Typography
          variant="subtitle1"
          component="h6"
          marginLeft={1}
          sx={{ color: "error.main" }}>
          {Number(book.price).toLocaleString()} đ
        </Typography>
        <Typography marginLeft={1} variant="subtitle1" component="h6">
          <Button variant="outlined" sx={{ backgroundColor: "#0080FF" }}>
            <Link
              target="_blank"
              to={`/product-detail/${book.productId}`}
              className="detailLink">
              Chi tiết
            </Link>
          </Button>
        </Typography>
      </Paper>
    </div>
  );
}
