import React, { useEffect } from "react";

function Logout() {
  useEffect(() => {
    if (localStorage.getItem("jwt") !== null) {
      localStorage.clear();
      // alert("You are logged out");
      window.location.href = "/";
    }
  }, []);

  return <></>;
}

export default Logout;
