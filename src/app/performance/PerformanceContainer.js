import React, { Component } from "react";
import { Query } from "react-apollo";
import { withRouter } from "react-router-dom";
import Storage from "@aws-amplify/storage";
import { getPerformance } from "./graphql";
import Performance from "./Performance";
import Curtain from "../common/Curtain";
import { connect } from "react-redux";
import ReactGA from "react-ga";

const mapStateToProps = state => {
  const { localCognitoIdentityId } = state.general;

  return {
    localCognitoIdentityId
  };
};

class PerformanceContainer extends Component {
  state = { performanceLink: null, performanceData: [] };

  componentDidMount = async () => {
    const { performanceId } = this.props.match.params;

    if (process.env.NODE_ENV === "production") {
      ReactGA.pageview(`/performance/${performanceId}`);
    }

    const performanceLink = await Storage.get(`${performanceId}.webm`);

    this.setState({ performanceLink });
  };

  render() {
    const { performanceLink } = this.state;
    const { performanceId } = this.props.match.params;
    const { localCognitoIdentityId } = this.props;

    return (
      <Query
        query={getPerformance}
        variables={{ performanceId }}
        fetchPolicy="network-only"
      >
        {({ loading, error, data, refetch }) => {
          if (loading || !performanceLink) return <Curtain loading />;
          if (error) {
            console.log(error);
            return null;
          }

          const { getPerformance } = data;

          return (
            <Performance
              performanceId={performanceId}
              refetch={refetch}
              currentUser={
                getPerformance.cognitoIdentityId === localCognitoIdentityId
              }
              performanceLink={performanceLink}
              {...getPerformance}
            />
          );
        }}
      </Query>
    );
  }
}

export default withRouter(connect(mapStateToProps)(PerformanceContainer));
