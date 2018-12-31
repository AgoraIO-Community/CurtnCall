import React, { Component } from "react";
import { Query } from "react-apollo";
import { withRouter } from "react-router-dom";
import { getShow } from "./graphql";
import Show from "./Show";
import Curtain from "../common/Curtain";
import ReactGA from "react-ga";

class ShowContainer extends Component {
  componentDidMount = () => {
    const { showId } = this.props.match.params;

    if (process.env.NODE_ENV === "production") {
      ReactGA.pageview(`/show/${showId}`);
    }
  };

  render() {
    const { showId } = this.props.match.params;

    return (
      <Query query={getShow} variables={{ showId }}>
        {({ loading, error, data }) => {
          if (loading) return <Curtain loading />;
          if (error) {
            console.log(error);
            return null;
          }

          const { getShow } = data;

          return <Show {...getShow} />;
        }}
      </Query>
    );
  }
}

export default withRouter(ShowContainer);
