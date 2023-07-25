import { Grid } from "@mui/material";

export default function Footer() {
  const contact = (
    <div id="decorateText">
      <h4>Contact Us</h4>
      <p>Hotline: 123.456.789</p>
      <p>Email: abc@bookstore.com</p>
    </div>
  );
  const payment = (
    <div id="decorateText">
      <h4>Payment</h4>
      <p>COD</p>
      <p>Vietcombank</p>
    </div>
  );
  const aboutUs = (
    <div id="decorateText">
      <h4>About Us</h4>
      <p>Introduction to ABC</p>
      <p>Shipment policies</p>
    </div>
  );
  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        {contact}
      </Grid>
      <Grid item xs={4}>
        {payment}
      </Grid>
      <Grid item xs={4}>
        {aboutUs}
      </Grid>
    </Grid>
  );
}
