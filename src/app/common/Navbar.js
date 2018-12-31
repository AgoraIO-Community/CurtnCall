import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router-dom";
import styled from "styled-components";

import NavbarLogoContainer from "./NavbarLogoContainer";
import MobileHamburgerButton from "./mobile/MobileHamburgerButton";
import NavUserWrapperContainer from "./NavUserWrapperContainer";
import StartPerformerButtonContainer from "./StartPerformerButtonContainer";
import { media } from "styled-bootstrap-grid";

const NavbarWrapper = styled.div`
  flex: none;
  display: ${props => (props.hide ? "none" : "flex")};
  background-color: ${props => props.theme.color.black};
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  transition: all 1s ease-out;
`;

const NavbarLogoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
  padding: 0.6rem;
`;

const MobileHamburgerButtonWrapper = styled.div`
  ${media.tablet`display: none;`};
  display: block;
`;

const NavMobileWrapper = styled.div`
  display: ${props => !props.showMobileNavMenu && "none"};
  ${media.tablet`
    display: flex;
    align-items: center;
    width: auto;
  `};
  width: 100%;
  flex-grow: 1;
`;

const NavLinkWrapper = styled.div`
  ${media.tablet`
    flex-grow: 1;
  `};
`;

const StyledNavLink = styled(NavLink)`
  ${media.tablet`
    display: inline-block;
    margin-top: 0;
  `};
  display: block;
  padding: 1rem;
  color: white;
  margin-right: 1rem;
  text-decoration: none;

  &:hover {
    color: yellow;
  }
`;

const NavUserWrapperDisplay = styled.div`
  ${media.tablet`
    display: none;
  `};
  display: block;
  padding: 1rem;
  margin-right: 1rem;
`;

class Navbar extends Component {
  state = {
    showMobileNavMenu: false,
    currentUserInfo: "loading"
  };

  handleMobileHamburgerButtonClick = () => {
    this.setState(({ showMobileNavMenu }) => ({
      showMobileNavMenu: !showMobileNavMenu
    }));
  };

  hideMobileNavMenu = () => {
    this.setState({ showMobileNavMenu: false });
  };

  renderStartPerformerButton = mobile => {
    const {
      channelName,
      isAdminPage,
      showRequired,
      show,
      userIsPreviousPerformer,
      userInLineup,
      channelReady
    } = this.props;

    if (
      !channelName ||
      userIsPreviousPerformer ||
      userInLineup ||
      isAdminPage ||
      !channelReady
    ) {
      return null;
    }

    if (showRequired && !show) {
      return null;
    }

    if (show) {
      const timeNow = Date.now();

      if (!(show.showStart < timeNow && show.showEnd > timeNow)) {
        return null;
      }
    }

    return (
      <StartPerformerButtonContainer mobile={mobile} loading={!channelReady} />
    );
  };

  render() {
    const {
      handleMobileHamburgerButtonClick,
      hideMobileNavMenu,
      renderStartPerformerButton
    } = this;
    const { showMobileNavMenu } = this.state;
    const { channelSegment, localStream, userIsCurrentPerformer } = this.props;

    let hideNavBar = false;

    if (
      userIsCurrentPerformer &&
      localStream &&
      channelSegment === "performance"
    ) {
      hideNavBar = true;
    }

    return (
      <NavbarWrapper hide={hideNavBar}>
        <NavbarLogoWrapper>
          <NavbarLogoContainer />
        </NavbarLogoWrapper>
        <MobileHamburgerButtonWrapper>
          <MobileHamburgerButton
            handleMobileHamburgerButtonClick={handleMobileHamburgerButtonClick}
          />
        </MobileHamburgerButtonWrapper>
        <NavMobileWrapper showMobileNavMenu={showMobileNavMenu}>
          <NavLinkWrapper>
            <StyledNavLink to="/about" onClick={hideMobileNavMenu}>
              About
            </StyledNavLink>
            <StyledNavLink to="/stats" onClick={hideMobileNavMenu}>
              Stats
            </StyledNavLink>
            <NavUserWrapperDisplay>
              <NavUserWrapperContainer mobile />
            </NavUserWrapperDisplay>
            {renderStartPerformerButton(false)}
            {/* boolean indicates isMobile */}
          </NavLinkWrapper>
        </NavMobileWrapper>
        <NavUserWrapperContainer />
        {renderStartPerformerButton(true)}
        {/* boolean indicates isMobile */}
      </NavbarWrapper>
    );
  }
}

export default withRouter(Navbar);
