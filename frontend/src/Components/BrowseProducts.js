import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookCard from "./BookCard.js";
import * as Constant from "./Constant.js";
import Pagination from "./Pagination.js";

export default function BrowseProducts() {
  var [products, setProducts] = useState([]);
  let { number = 0 } = useParams();
  // const token = localStorage.getItem("jwt");

  useEffect(() => {
    products = []; // eslint-disable-line react-hooks/exhaustive-deps
    let url = `${Constant.SERVER_URL}product/all/${number}`;
    async function fetchMyAPI() {
      await fetch(url, {
        // headers: { Authorization: token },
      })
        .then((res) => res.json())
        .then((res) => setProducts([...products, ...res]))
        .catch((err) => console.error(err));
    }
    fetchMyAPI();
  }, [number]);

  if (products.length === 0)
    return (
      <div key={number}>
        <p className="home">{"Error No Product, Please Go Back."}</p>
        <Pagination number={number} />
      </div>
    );
  return (
    <>
      <Grid container spacing={2} columns={{ xs: 2, sm: 8, md: 12 }}>
        {products.map((p) => (
          <Grid key={p.productId} item xs={2} sm={4} md={4}>
            <BookCard book={p} />
          </Grid>
        ))}
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          margin={5}
          justifyContent="center">
          <Grid item xs={12}>
            <Pagination number={number} />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
