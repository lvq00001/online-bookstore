import {
  Box,
  Button,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

function OrderCard({ item, HandleConfirm, DeleteOrder, phone, address }) {
  return (
    <Paper elevation={3} margin={1}>
      <Box marginTop={2} paddingTop={2}>
        <Typography variant="caption text" component="p" margin={2} color="red">
          <em>Order ID: {item.orderId}</em>
        </Typography>
        <Divider />
      </Box>
      <Stack spacing={2}>
        <Box>
          <Typography variant="h5" component="p" margin={2}>
            Delivery Information
          </Typography>
          <Typography variant="subtitle1" component="p" marginX={2}>
            <em>Address: </em>
            {address}
          </Typography>
          <Typography
            variant="subtitle1"
            component="p"
            marginX={2}
            marginBottom={2}>
            <em>Contact number: </em>
            {phone.replace(/^(\d{3})(\d{3})(\d{4})$/g, "$1.$2.$3")}
          </Typography>
          <Divider />
        </Box>
        <Box>
          <Typography variant="h5" component="p" margin={2}>
            Payment Information
          </Typography>
          <Typography
            variant="subtitle1"
            component="p"
            marginX={2}
            marginBottom={2}>
            <em>Total: </em> {item.total.toLocaleString()}
          </Typography>
          <Divider />
        </Box>

        {item.orderDate !== null ? (
          <Box>
            <Typography variant="subtitle1" component="p" margin={2}>
              Submitted on {new Date(item.orderDate).toLocaleString()}
            </Typography>
          </Box>
        ) : (
          <Box>
            <Typography variant="h5" component="p" margin={2}>
              Proceed Order
            </Typography>
            <Grid container spacing={0}>
              <Grid item xs={6}>
                <Typography variant="subtitle1" component="p" margin={2}>
                  Please check information and confirm order
                </Typography>
              </Grid>
              <Grid item xs={6} marginTop={2}>
                <Button
                  sx={{
                    color: "white",
                    backgroundColor: "red",
                    width: "70%",
                  }}
                  className="buyButton"
                  leftIcon={<CheckIcon />}
                  onClick={() => HandleConfirm(item)}
                  colorScheme="green">
                  CONFIRM
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle1" component="p" margin={2}>
                  Press cancel to cancel order
                </Typography>
              </Grid>
              <Grid item xs={6} marginTop={2}>
                <Button
                  sx={{
                    color: "white",
                    backgroundColor: "orange",
                    width: "70%",
                  }}
                  colorScheme="red"
                  leftIcon={<CloseIcon />}
                  onClick={() => DeleteOrder(item.orderId)}>
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </Box>
        )}
      </Stack>
    </Paper>
  );
}

export default OrderCard;
