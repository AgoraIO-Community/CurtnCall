import React, { Component } from "react";
import { Query } from "react-apollo";
import { withRouter } from "react-router-dom";
import { getUser } from "./graphql";
import User from "./User";
import Curtain from "../common/Curtain";

class UserContainer extends Component {
  render() {
    const { userId } = this.props.match.params;

    return (
      <Query query={getUser} variables={{ userId }}>
        {({ loading, error, data }) => {
          if (loading) return <Curtain loading />;
          if (error) {
            console.log(error);
            return null;
          }

          const { getUser } = data;

          return <User {...getUser} />;
        }}
      </Query>
    );
  }
}

export default withRouter(UserContainer);
