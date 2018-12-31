import React, { Component } from "react";
import { Query } from "react-apollo";
import { getLeaderboards } from "./graphql";
import Stats from "./Stats";
import Curtain from "../common/Curtain";

class StatsContainer extends Component {
  render() {
    return (
      <Query query={getLeaderboards} fetchPolicy="network-only">
        {({ loading, error, data }) => {
          if (loading) return <Curtain loading />;
          if (error) {
            console.log(error);
            return null;
          }

          const { getLeaderboards } = data;

          return <Stats {...getLeaderboards} />;
        }}
      </Query>
    );
  }
}

export default StatsContainer;
