import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { withApollo } from "react-apollo";
import { addUserToDb, addAuthenticatedIdToViewer } from "./graphql";
import Auth from "@aws-amplify/auth";
import { Button } from "./styled-components/general";
import styled from "styled-components";

const LoginWithFacebookButton = styled(Button)`
  background-color: #3b5998;
  border: none;
  box-shadow: none;
`;

class FacebookLoginButton extends Component {
  loginClick = false;

  statusChangeCallback = response => {
    if (response.status === "connected") {
      this.handleResponse(response.authResponse);
    } else {
      this.handleError(response);
    }
  };

  checkLoginState = () => {
    window.FB.getLoginStatus(this.statusChangeCallback);
  };

  handleClick = () => {
    this.loginClick = true;
    window.FB.login(this.checkLoginState, {
      scope: "public_profile,email"
    });
  };

  handleError = error => {
    console.error(error);
  };

  getUserInfo = () => {
    return new Promise((res, rej) => {
      window.FB.api("/me", { fields: "name,email" }, response => {
        const returnObj = {
          email: response.email,
          name: response.name,
          facebookId: response.id,
          picture: `https://graph.facebook.com/${
            response.id
          }/picture/?type=large`
        };

        res(returnObj);
      });
    });
  };

  handleResponse = async data => {
    try {
      const { channelName, client } = this.props;
      const { accessToken: token, expiresIn } = data;

      let unauthenticatedCognitoIdentityId;

      if (this.loginClick) {
        const currentCredentials = await Auth.currentCredentials();
        unauthenticatedCognitoIdentityId = currentCredentials._identityId;
      }

      const expires_at = expiresIn * 1000 + new Date().getTime();

      const user = await this.getUserInfo();

      const { name, email, facebookId } = user;

      await Auth.federatedSignIn("facebook", { token, expires_at }, user);

      const { id: cognitoIdentityId } = await Auth.currentUserInfo();

      await client.mutate({
        mutation: addUserToDb,
        variables: {
          name,
          email,
          cognitoIdentityId,
          facebookId
        }
      });

      if (this.loginClick) {
        if (channelName) {
          await client.mutate({
            mutation: addAuthenticatedIdToViewer,
            variables: {
              channelName,
              unauthenticatedCognitoIdentityId
            }
          });
        }
        this.loginClick = false;
      }
    } catch (error) {
      console.log("error", error);
      console.log("Facebook Login Button - handleResponse");
    }
  };

  render() {
    const { handleClick } = this;
    const { channelName, channelReady } = this.props;

    let disabled = false;

    if (channelName) {
      if (!channelReady) {
        disabled = true;
      }
    }

    return (
      <LoginWithFacebookButton onClick={handleClick} disabled={disabled}>
        <FontAwesomeIcon icon={["fab", "facebook-square"]} /> Login with
        Facebook
      </LoginWithFacebookButton>
    );
  }
}

export default withApollo(FacebookLoginButton);
