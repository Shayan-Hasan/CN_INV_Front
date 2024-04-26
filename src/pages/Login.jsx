import React, { useEffect, useState } from "react";
import "../styles/login.css";
import { Ecommerce } from "../pages";
import { ContextProvider } from "../contexts/ContextProvider";
import { LoginApi } from "../api/Api";
import { useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import default_img from "../data/username_icon.png";
import default_img1 from "../data/password_icon.png";
import default_img2 from "../data/background-img.jpg";
import default_img3 from "../data/nexusan-logo.png";

const Login = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const [ValError, setValError] = useState([]);

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");

  const togglePasswordVisibility = () => {
    console.log("hello");
    setPasswordVisible(!passwordVisible);
    // setPassword(password);
  };

  const onchangePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleLogin = async (event) => {
    event.preventDefault();
    setPasswordVisible(false);
    setValError([]);
    const updatedErrors = [...ValError];
    if (username === "") {
      updatedErrors[0] = "Please enter username.";
      setValError(updatedErrors);
      return;
    }
    updatedErrors[0] = "";
    if (password === "") {
      updatedErrors[1] = "Please enter password.";
      setValError(updatedErrors);
      return;
    }
    updatedErrors[1] = "";
    const response = await LoginApi(username, password);

    if (response.status === 200) {
      if (response.data[0].user_id) {
        const userData = {
          user_id: response.data[0].user_id,
          role: response.data[0].role_desc,
        };
        localStorage.setItem("userData", JSON.stringify(userData));

        return navigate("/Overview");
      }
      return navigate("/Login");
    } else {
      updatedErrors[2] = "Incorrect Username / Password.";
      setValError(updatedErrors);
      return console.log("Login Failed");
    }
  };
  useEffect(() => {
    const userDataString = localStorage.getItem("userData");
    if (!userDataString) {
      const userData = {
        user_id: null,
        role: null,
      };
      localStorage.setItem("userData", JSON.stringify(userData));
      return navigate("/Login");
    }

    const userData1 = JSON.parse(userDataString);
    if (!userData1) {
      // window.location.reload();
      return navigate("/Login");
    }
  }, []);

  return (
    <div className="mt-16">
      <Container
        className="g-0"
        fluid="true"
        style={{ paddingLeft: "10%", paddingRight: "10%" }}
      >
        <Row style={{ padding: "0" }}>
          <Col lg={5} style={{ padding: "0" }}>
            <form onSubmit={handleLogin}>
              <Card
                className="align-items-center"
                style={{
                  alignItems: "center",
                }}
              >
                <div style={{ margin: "4%" }}></div>
                <div style={{ height: "100px" }}>
                  {" "}
                  <img
                    src={default_img3}
                    alt="Description"
                    style={{
                      objectFit: "contain",
                      width: "100%",
                      height: "100%",
                      borderradius: "10px",
                    }}
                  />
                </div>
                <label
                  style={{
                    marginTop: "16%",
                    fontSize: "36px",
                    fontWeight: "bold",
                  }}
                >
                  Sign In
                </label>

                <div style={{ paddingLeft: "16%", paddingRight: "16%" }}>
                  <div className="input-container">
                    <div className="form-group" style={{ marginTop: "8%" }}>
                      <div className="input-icon">
                        <img
                          src={default_img}
                          alt="Email Icon"
                          width="30px"
                        ></img>
                      </div>

                      <input
                        className="input-field"
                        // required
                        type="text"
                        value={username}
                        tabIndex="1"
                        name="name"
                        placeholder="Username"
                        autoFocus
                        style={{
                          width: "100%",
                          height: "60px",
                          fontSize: "22px",
                        }}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>
                  </div>
                  {ValError[0] && (
                    <card style={{ color: "red", fontSize: "18px" }}>
                      {ValError[0]}
                    </card>
                  )}
                </div>

                <div style={{ paddingLeft: "16%", paddingRight: "16%" }}>
                  <div className="input-container">
                    <div className="form-group" style={{ marginTop: "8%" }}>
                      <div className="input-icon">
                        <img
                          src={default_img1}
                          alt="Password Icon"
                          width="30px"
                        ></img>
                      </div>
                      <input
                        className="input-field"
                        // required
                        type={passwordVisible ? "text" : "password"}
                        name="name"
                        value={password}
                        tabIndex="2"
                        placeholder="Password"
                        style={{
                          width: "100%",
                          height: "60px",
                          fontSize: "22px",
                        }}
                        onChange={onchangePassword}
                      />
                      <button
                        className="password-toggle-button"
                        type="button"
                        onClick={togglePasswordVisibility}
                        style={{
                          position: "absolute",
                          right: "6%",
                          top: "50%",
                          transform: "translateY(-50%)",
                          cursor: "pointer",
                        }}
                      >
                        {passwordVisible ? (
                          <div style={{ fontSize: "22px" }}>
                            <FaEye />
                          </div>
                        ) : (
                          <div style={{ fontSize: "22px" }}>
                            <FaEyeSlash />
                          </div>
                        )}
                      </button>
                    </div>
                  </div>
                  {ValError[1] && (
                    <card style={{ color: "red", fontSize: "18px" }}>
                      {ValError[1]}
                    </card>
                  )}
                  <div
                    style={{
                      paddingLeft: "50%",
                      marginTop: "6%",
                      fontSize: "16px",
                      color: "#FF7A33",
                    }}
                  >
                    <a>Forget Password? </a>
                  </div>
                </div>
                <div style={{ marginTop: "4%" }}>
                  {ValError[2] && (
                    <card style={{ color: "red", fontSize: "18px" }}>
                      {ValError[2]}
                    </card>
                  )}
                </div>

                <div
                  style={{
                    paddingTop: "20%",
                    paddingLeft: "20%",
                    paddingRight: "20%",
                    marginBottom: "12%",
                  }}
                >
                  <button
                    style={{
                      padding: "14px",
                      backgroundColor: "#FF7A33",
                      color: "#fff",
                      border: "none",
                      borderradius: "20px",
                      fontSize: "30px",
                      fontWeight: "bold",
                      width: "280px",
                      height: "70px",
                    }}
                    tabIndex="3"
                    color="white"
                    borderradius="10px"
                    text="Login"
                    type="submit"
                  >
                    Log In
                  </button>
                </div>
              </Card>
            </form>
          </Col>
          <Col className="d-none d-lg-block" sm={true} style={{ padding: "0" }}>
            <div
              style={{
                height: "100%",
                width: "100%",
              }}
            >
              <img
                src={default_img2}
                alt="Description"
                style={{
                  objectFit: "cover",
                  width: "100%",
                  height: "100%",
                  borderradius: "10px",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: "40%",
                  left: "47%",
                  color: "white",
                  width: "40%",
                }}
              >
                <div
                  style={{
                    fontSize: "52px",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Welcome to Nexusan
                </div>

                <div
                  style={{
                    fontSize: "30px",
                    fontWeight: "bold",
                    fontFamily: "-moz-initial",
                    textAlign: "center",
                  }}
                >
                  <label>Online Inventory Management System</label>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
