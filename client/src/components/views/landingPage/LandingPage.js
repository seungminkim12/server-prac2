import axios from "axios";
import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";

function LandingPage(props) {
  useEffect(() => {
    axios.get("/api/hello").then((res) => console.log(res.data));
  }, []);

  const onLogoutHandler = () => {
    axios.get("/api/users/logout").then((response) => {
      if (response.data.logoutSuccess) {
        props.history.push("/login");
      } else {
        alert("Logout Error");
      }
    });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <h2>시작페이지</h2>

      <button onClick={onLogoutHandler}>Logout</button>
    </div>
  );
}

export default withRouter(LandingPage);
