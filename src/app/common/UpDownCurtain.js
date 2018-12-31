import React, { Component } from "react";
import styled from "styled-components";
import posed from "react-pose";

const AnimatedCurtain = posed.div({
  open: { y: "-100%" },
  closed: { y: "0%" }
});

const StyledCurtain = styled(AnimatedCurtain)`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.color.darkestRed};
  /* z-index: 1; */
  height: 100%;
  position: fixed;
  top: auto;
  right: auto;
  bottom: auto;
  left: auto;
  width: 100%;
`;

class UpDownCurtain extends Component {
  state = { isOpen: false };

  componentDidMount = () => {
    setInterval(() => {
      this.setState({ isOpen: !this.state.isOpen });
    }, 1000);
  };

  render() {
    const { isOpen } = this.state;

    return (
      <StyledCurtain pose={isOpen ? "open" : "closed"}>
        {/* <img src="/images/curtncall_logo.svg" alt="CurtnCall Logo" /> */}
      </StyledCurtain>
    );
  }
}

export default UpDownCurtain;
