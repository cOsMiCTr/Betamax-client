import React, { useState } from "react";
import { BButton } from "../button/button";
import "./login-view.scss";
import { Form, Card, Col, Row, Container, CardGroup, Button } from "react-bootstrap";
import FadeIn from "react-fade-in";
import axios from "axios";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Link } from "react-router-dom";


export function LoginView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameErr, setUsernameErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if (isReq) {
      axios
        .post("https://betamax-cosmictr.herokuapp.com/login", {
          Username: username,
          Password: password,
        })
        .then((response) => {
          const data = response.data;
          props.onLoggedIn(data);
        })
        .catch((e) => {
          console.log("There is no such user!");
        });
    }
  };

  const validate = () => {
    let isReq = true;

    if (!username) {
      setUsernameErr("Username Required");
      isReq = false;
    } else if (username.length < 2) {
      setUsernameErr("Username must be 2 characters long");
      isReq = false;
    } else {
      setUsernameErr("");
      isReq = true;
    }
    
    if (!password) {
      setPasswordErr("Password Required");
      isReq = false;
    } else if (password.length < 6) {
      setPasswordErr("Password must be 6 characters long");
      isReq = false;
    } else {
      setPasswordErr("");
      isReq = true;
    }

    return isReq;
  };

  return (
    <Router>
      <Container>
        <h1 className="heading display-1 text-center">BETAMAX</h1>
        <Row>
          <Col style={{ textAlign: "center" }}>
            <h2 className="mb-3">The best movie website you can ever see</h2>
            <h2 className="mb-5">Watch anywhere, with anyone or everyone!</h2>
            <CardGroup>
              <Card>
                <Card.Body>
                  <Card.Header
                    style={{
                      backgroundColor: "transparent",
                      textAlign: "center",
                      fontSize: "36px",
                    }}
                  >
                    Please Log-in!
                  </Card.Header>
                  <Form>
                    <Form.Group controlId="formUsername">
                      <Form.Label style={{ margin: "2rem" }}>
                        Username:
                      </Form.Label>
                      <Form.Control
                        type="text"
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                        value={username}
                      />
                      {usernameErr && (
                        <FadeIn>
                          <div
                            className="invalid-feedback"
                            style={{ display: "block" }}
                          >
                            {usernameErr}
                          </div>
                        </FadeIn>
                      )}
                    </Form.Group>

                    <Form.Group controlId="formPassword">
                      <Form.Label style={{ margin: "2rem" }}>
                        Password:
                      </Form.Label>
                      <Form.Control
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        value={password}
                      />
                      {passwordErr && (
                        <FadeIn>
                          <div
                            className="invalid-feedback"
                            style={{ display: "block" }}
                          >
                            {passwordErr}
                          </div>
                        </FadeIn>
                      )}
                    </Form.Group>
                    <div className="mt-3">
                      <Button
                        variant="success"
                        type="submit"
                        label="Login"
                        onClick={handleSubmit}
                      >Log-in</Button>
                    </div>
                  </Form> 
                </Card.Body>
              </Card>
            </CardGroup>
          </Col>
        </Row>
      </Container>
    </Router>
  );
}

LoginView.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }),
  onLoggedIn: PropTypes.func.isRequired,
};
