import { Grid } from "@mui/material";
import BookCard from "./BookCard";

export default function ProductList({ products }) {
  return (
    <>
      <Grid container spacing={2} columns={{ xs: 2, sm: 8, md: 12 }}>
        {products.map((p) => (
          <Grid item xs={2} sm={4} md={4}>
            <BookCard book={p} />
          </Grid>
        ))}
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          margin={5}
          justifyContent="center"></Grid>
      </Grid>
    </>
  );
}
