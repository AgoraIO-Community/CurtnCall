import React, { Component } from "react";
import { Hub } from "@aws-amplify/core";
import Auth from "@aws-amplify/auth";
import NavUserDropdown from "./NavUserDropdown";
import styled from "styled-components";
import { media } from "styled-bootstrap-grid";
import FacebookLoginButtonContainer from "./FacebookLoginButtonContainer";
import LoginButton from "./LoginButton";
import { withRouter } from "react-router-dom";
import { checkIfIsAdmin } from "../utility";
import ReactGA from "react-ga";

const StyledNavUserWrapper = styled.div`
  ${media.tablet`display: block;`};
  margin-right: 2em;
  display: none;
`;

const StyledMobileNavUserWrapper = styled.div`
  ${media.tablet`display: none;`};
  /* margin-right: 2em; */
  display: block;
`;

class NavUserWrapper extends Component {
  constructor(props) {
    super(props);
    Hub.listen("auth", this);
  }

  state = { userLoggedIn: false, name: null, picture: null, username: null };

  componentDidMount = async () => {
    const { loginService, setLocalCognitoIdentityId } = this.props;

    try {
      await Auth.currentAuthenticatedUser();
      if (loginService === "facebook") {
        const isAdmin = await checkIfIsAdmin();
        if (isAdmin) {
          console.log("This is an admin!");
          return;
        }
        const { name, picture, id } = await Auth.currentAuthenticatedUser();

        // const { id: localCognitoIdentityId } = await Auth.currentUserInfo();
        setLocalCognitoIdentityId(id);

        this.setState({
          userLoggedIn: true,
          name,
          picture,
          username: id
        });
      }
    } catch (e) {
      console.log("e", e);
    }
  };

  onHubCapsule = async capsule => {
    const { loginService, setLocalCognitoIdentityId } = this.props;
    switch (capsule.payload.event) {
      case "signIn":
        try {
          const { userLoggedIn } = this.state;

          if (userLoggedIn) return;

          if (loginService === "facebook") {
            const { name, picture, id } = await Auth.currentAuthenticatedUser();

            setLocalCognitoIdentityId(id);

            if (process.env.NODE_ENV === "production") {
              ReactGA.set({ userId: id });
            }

            this.setState({
              userLoggedIn: true,
              name,
              picture,
              username: id
            });
          }

          if (loginService === "cognito") {
            const {
              attributes: { family_name, given_name }
            } = await Auth.currentAuthenticatedUser();
            const picture = "/";

            this.setState({
              userLoggedIn: true,
              name: `${given_name} ${family_name}`,
              picture
            });
          }
        } catch (e) {
          console.log("e", e);
        }

        break;
      case "signOut":
        setLocalCognitoIdentityId(null);
        this.setState({ userLoggedIn: false, name: null });
        const { onAdminPage, history } = this.props;
        if (onAdminPage) {
          history.push("/");
        }

        break;
      default:
        return;
    }
  };

  renderNavArea = () => {
    const { userLoggedIn, name, picture, username } = this.state;

    if (userLoggedIn) {
      return (
        <NavUserDropdown
          name={name}
          picture={picture}
          username={username}
          channelName={this.props.channelName}
        />
      );
    }

    const { loginService } = this.props;

    if (loginService === "facebook") {
      return <FacebookLoginButtonContainer />;
    }

    return <LoginButton />;
  };

  render() {
    const { renderNavArea } = this;

    const { mobile } = this.props;

    if (mobile) {
      return (
        <StyledMobileNavUserWrapper>
          {renderNavArea()}
        </StyledMobileNavUserWrapper>
      );
    }

    return <StyledNavUserWrapper>{renderNavArea()}</StyledNavUserWrapper>;
  }
}

export default withRouter(NavUserWrapper);
