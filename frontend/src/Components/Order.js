import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import * as Constant from "./Constant.js";
import OrderCard from "./OrderCard.js";

function Order() {
  const [order, setOrder] = useState([]);
  const token = localStorage.getItem("jwt");
  const user = localStorage.getItem("user");
  const phone = localStorage.getItem("phone");
  const address = localStorage.getItem("address");
  // const [message, setMessage] = useState("");
  console.log(phone + " " + address);
  useEffect(() => {
    var url = Constant.SERVER_URL + "customer/order/" + user;
    fetch(url, {
      headers: { Authorization: token },
    })
      .then((res) => res.json())
      .then((res) => setOrder([...order, ...res]))
      .catch((err) => console.error(err));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function DeleteOrder(orderId) {
    var url = `${Constant.SERVER_URL}customer/delete-order`;
    fetch(url, {
      headers: { Authorization: token, "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(orderId),
    })
      .then((res) => {
        if (res.status === 200) {
          // setMessage("Remove from order");
          alert("Remove from order");
        }
      })
      .then(() => window.location.reload())
      .catch((err) => console.error(err));
  }

  function HandleConfirm(order) {
    var url = `${Constant.SERVER_URL}customer/submit-order/${user}`;
    fetch(url, {
      headers: { Authorization: token, "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(order),
      redirect: "follow",
    })
      .then(
        // () => setMessage("Thank you")
        alert(
          "Thank you for your order! Your shipment will arrive in a few days"
        )
      )
      .then(() => window.location.reload())
      .catch((err) => console.error(err));
  }

  const tableData = order.map((item) => (
    <OrderCard
      key={item.orderId}
      item={item}
      DeleteOrder={DeleteOrder}
      HandleConfirm={HandleConfirm}
      phone={phone}
      address={address}
    />
  ));

  // function toast() {
  //   if (message === "Thank you") {
  //     <Alert
  //       onClose={() => {
  //         setMessage("");
  //       }}>
  //       Thank you for your order! Your shipment will arrive in a few days.
  //     </Alert>;
  //   }
  //   if (message === "Remove") {
  //     <Alert
  //       severity="info"
  //       onClose={() => {
  //         setMessage("");
  //       }}>
  //       Cancel order.
  //     </Alert>;
  //   }
  // }

  if (token === null) return <p className="home">Please Login First.</p>;
  return (
    <>
      {/* {toast} */}
      {order.length === 0 ? (
        <p className="home">Nothing in your order</p>
      ) : (
        <>
          <Typography variant="h5" component="p" margin={2}>
            ORDERS
          </Typography>
          {tableData}
        </>
      )}
    </>
  );
}

export default Order;
