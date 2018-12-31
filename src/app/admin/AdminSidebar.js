import React, { Component } from "react";
import styled from "styled-components";
import { FlatButton } from "../common/styled-components/general";
import { capitalizeAndSpace } from "../utility";
import { sendAdminActions } from "./graphql";
import { withApollo } from "react-apollo";
import Auth from "@aws-amplify/auth";

const adminActions = [
  "resetRedis",
  "resetMongo",
  "resetUserStats",
  "adminPulledPlug",
  "resetUsers",
  "reloadAllBrowsers",
  "toggleShowRequired"
];

const adminViewActions = ["createShow", "viewShows", "setGeneralConstants"];

const StyledAdminSidebar = styled.div`
  background-color: ${props => props.theme.color.black};
  color: white;
  width: 16rem;
  overflow-y: auto;
`;

class AdminSidebar extends Component {
  render() {
    const { channelName, client, setAdminView } = this.props;
    return (
      <StyledAdminSidebar>
        {adminActions.map((adminAction, i) => {
          return (
            <FlatButton
              key={adminAction}
              color="red"
              onClick={async () => {
                let input = { channelName };
                input[`${adminAction}`] = true;

                const currentSession = await Auth.currentSession();

                const {
                  accessToken: { jwtToken }
                } = currentSession;

                await client.mutate({
                  mutation: sendAdminActions,
                  variables: {
                    input
                  },
                  context: {
                    headers: {
                      jwtToken
                    }
                  }
                });
              }}
            >
              {capitalizeAndSpace(adminAction)}
            </FlatButton>
          );
        })}

        {adminViewActions.map((adminViewAction, i) => {
          return (
            <FlatButton
              color="blue"
              onClick={async () => {
                setAdminView(adminViewAction);
              }}
              key={adminViewAction}
            >
              {capitalizeAndSpace(adminViewAction)}
            </FlatButton>
          );
        })}
      </StyledAdminSidebar>
    );
  }
}

export default withApollo(AdminSidebar);
