import React, { Component } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";

const StyledNavbarLogo = styled.img`
  fill: currentColor;
  height: 3rem;
  width: auto;
  padding: 0.25rem;
  cursor: pointer;
`;

class NavbarLogo extends Component {
  render() {
    return (
      <StyledNavbarLogo
        src="/images/curtncall_logo.svg"
        alt="CurtnCall Logo"
        onClick={() => {
          const { history, pathname, togglePerformerSidebar } = this.props;

          if (pathname !== "/") {
            history.push("/");
            return;
          }

          togglePerformerSidebar();
        }}
      />
    );
  }
}

export default withRouter(NavbarLogo);
