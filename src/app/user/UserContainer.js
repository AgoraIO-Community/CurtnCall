import React, { Component } from "react";
import { Query } from "react-apollo";
import { withRouter } from "react-router-dom";
import { getUser } from "./graphql";
import User from "./User";
import Curtain from "../common/Curtain";
import { connect } from "react-redux";
import ReactGA from "react-ga";

const mapStateToProps = state => {
  const { localCognitoIdentityId } = state.general;

  return {
    localCognitoIdentityId
  };
};

class UserContainer extends Component {
  componentDidMount = () => {
    const { userId } = this.props.match.params;

    if (process.env.NODE_ENV === "production") {
      ReactGA.pageview(`/user/${userId}`);
    }
  };

  render() {
    const { userId } = this.props.match.params;
    const { localCognitoIdentityId } = this.props;

    return (
      <Query query={getUser} variables={{ userId }} fetchPolicy="network-only">
        {({ loading, error, data, refetch }) => {
          if (loading) return <Curtain loading />;
          if (error) {
            console.log(error);
            return null;
          }

          const { getUser } = data;

          return (
            <User
              {...getUser}
              currentUser={getUser.cognitoIdentityId === localCognitoIdentityId}
              refetch={refetch}
            />
          );
        }}
      </Query>
    );
  }
}

export default withRouter(connect(mapStateToProps)(UserContainer));
