import React, { Component, Fragment } from "react";
import Auth from "@aws-amplify/auth";
import { withApollo } from "react-apollo";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import { addAuthenticatedIdToViewer } from "./graphql";

const UserNavDropdownLabel = styled.label`
  display: inline-block;
  position: relative;
`;

const UserNavDropdownButtonDiv = styled.div`
  border-style: solid;
  border-width: 0px 0px 3px;
  box-shadow: 0 -1px 0 rgba(255, 255, 255, 0.1) inset;
  border-color: ${props => props.theme.color.darkestGrey};
  color: white;
  border-radius: 0.25rem;
  cursor: pointer;
  white-space: nowrap;
  font-weight: 700;
  padding: 0.75rem;
  display: flex;
  flex-direction: row;
  background-color: ${props => props.theme.color.darkGrey};
  z-index: 1;

  &:active {
    transform: translateY(3px);
  }
`;

const UserNavDropdownInput = styled.input`
  display: none;
`;

const UserNavDropdownMenu = styled.ul`
  z-index: 1;
  position: absolute;
  top: 100%;
  border: 1px solid ${props => props.theme.color.lightGrey};
  border-radius: 0.25rem;
  padding: 0;
  margin: 0.1rem 0 0 0;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  list-style-type: none;
  right: 0;
  ${props => (props.showDropdownMenu ? `display: block;` : `display: none;`)};
`;

const UserNavDropdownItem = styled.li`
  padding: 1rem 1rem;
  cursor: pointer;
  white-space: nowrap;
  &:hover {
    background-color: ${props => props.theme.color.lightGrey};
  }
`;

const UserNavDropdownImage = styled.img`
  height: 25px;
  width: 25px;
  border-radius: 50%;
`;

const UserNavUsernameDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 0.5rem;
`;

class NavUserDropdown extends Component {
  state = { showDropdownMenu: false };

  handleDropdownButtonClick = () => {
    this.setState(({ showDropdownMenu }) => ({
      showDropdownMenu: !showDropdownMenu
    }));
  };

  handleLogoutClick = async () => {
    try {
      this.setState({ showDropdownMenu: false });

      const { channelName, client } = this.props;

      if (channelName) {
        try {
          const {
            _identityId: authenticatedCognitoIdentityId
          } = await Auth.currentCredentials();

          await Auth.signOut();

          await client.mutate({
            mutation: addAuthenticatedIdToViewer,
            variables: {
              channelName,
              authenticatedCognitoIdentityId
            }
          });
        } catch (error) {
          console.log("handleLogoutClick error", error);
        }
      }

      return;
    } catch (err) {
      console.log("err", err);
      return;
    }
  };

  render() {
    const { handleDropdownButtonClick, handleLogoutClick } = this;
    const { showDropdownMenu } = this.state;
    const { picture, name, username } = this.props;

    return (
      <Fragment>
        <UserNavDropdownLabel className="dropdown">
          <UserNavDropdownButtonDiv onClick={handleDropdownButtonClick}>
            <UserNavDropdownImage src={picture} alt="User Avatar" />
            <UserNavUsernameDiv>{name}</UserNavUsernameDiv>
          </UserNavDropdownButtonDiv>

          <UserNavDropdownInput type="checkbox" />

          <UserNavDropdownMenu showDropdownMenu={showDropdownMenu}>
            <UserNavDropdownItem
              onClick={() => {
                this.props.history.push(`/user/${username}`);
                this.setState({ showDropdownMenu: false });
              }}
            >
              Profile
            </UserNavDropdownItem>
            <UserNavDropdownItem onClick={handleLogoutClick}>
              Logout
            </UserNavDropdownItem>
          </UserNavDropdownMenu>
        </UserNavDropdownLabel>
      </Fragment>
    );
  }
}

export default withRouter(withApollo(NavUserDropdown));
