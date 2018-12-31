import React, { Component } from "react";
import styled from "styled-components";

const StyledMobileHamburgerButton = styled.button`
  display: flex;
  align-items: center;
  padding: 0.5rem 0.5rem;
  margin-right: 2rem;
  border: 1px solid white;
  border-radius: 0.125rem;
  background: ${props => props.theme.color.black};
  color: white;
  cursor: pointer;

  &:hover {
    border-color: ${props => props.theme.color.yellow};
  }
`;

const StyledSvg = styled.svg`
  height: 1rem;
  width: 1rem;
  fill: currentColor;
`;

class mobileHamburgerButton extends Component {
  render() {
    const { handleMobileHamburgerButtonClick } = this.props;
    return (
      <StyledMobileHamburgerButton onClick={handleMobileHamburgerButtonClick}>
        <StyledSvg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <title>Menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </StyledSvg>
      </StyledMobileHamburgerButton>
    );
  }
}

export default mobileHamburgerButton;
