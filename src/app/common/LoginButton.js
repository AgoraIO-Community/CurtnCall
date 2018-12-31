import React, { Component } from "react";
import styled from "styled-components";

const StyledLoginLabel = styled.label`
  border: 1px solid white;
  color: white;
  border-radius: 0.25rem;
  cursor: pointer;
  font-style: normal;
  overflow: hidden;
  text-align: center;
  text-decoration: none;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 700;
  padding: 0.75rem;
  display: inline-flex;
  background-color: transparent;

  &:active {
    transform: translateY(3px);
  }
  /* display: inline-block;
  margin: 1rem;
  cursor: pointer;
  padding: 1em;
  border: 1px solid white;
  background: black;
  color: white;
  border-radius: 0.25rem; */
`;

class LoginButton extends Component {
  render() {
    return (
      <StyledLoginLabel id="login-button-modal-trigger" htmlFor="modal-trigger">
        Login
      </StyledLoginLabel>
    );
  }
}

export default LoginButton;
