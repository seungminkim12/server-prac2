import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../../_actions/user_action";
import { withRouter } from "react-router-dom";

function RegisterPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();

  const onChangeHandler = (event) => {
    const {
      target: { value },
    } = event;
    if (event.target.name === "email") {
      setEmail(value);
    } else if (event.target.name === "password") {
      setPassword(value);
    } else if (event.target.name === "name") {
      setName(value);
    } else {
      setConfirmPassword(value);
    }
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      return alert("비밀번호를 확인하세요");
    }

    let body = {
      email,
      password,
      name,
      confirmPassword,
    };

    dispatch(registerUser(body)).then((response) => {
      if (response.payload.registerSuccess) {
        props.history.push("/login");
      } else {
        alert("Sign up Error");
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
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={onSubmitHandler}
      >
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={onChangeHandler}
        />

        <label>Name</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={onChangeHandler}
        />

        <label>Password</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={onChangeHandler}
        />

        <label>Password Confirm</label>
        <input
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={onChangeHandler}
        />

        <br />
        <button type="submit">Sign up</button>
      </form>
    </div>
  );
}

export default withRouter(RegisterPage);
