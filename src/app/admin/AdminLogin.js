import React, { Component } from "react";
import { Container, Col } from "styled-bootstrap-grid";
import LoginForm from "../common/LoginForm";

export default class AdminLogin extends Component {
  render() {
    return (
      <div>
        <Container>
          <h3>Admin Login</h3>
          <Col sm="6">
            <LoginForm />
          </Col>
        </Container>
      </div>
    );
  }
}
