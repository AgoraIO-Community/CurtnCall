import React, { Component } from "react";
import ViewShows from "./ViewShows";
import { Query } from "react-apollo";
import { getShows } from "./graphql";

export default class ViewShowsContainer extends Component {
  render() {
    const { channelName, setAdminView } = this.props;
    return (
      <Query
        query={getShows}
        variables={{ channelName }}
        fetchPolicy="network-only"
      >
        {({ loading, error, data, refetch }) => {
          if (loading) return <div>Loading...</div>;
          if (error) {
            console.log(error);
            return null;
          }

          console.log("data", data);

          return (
            <ViewShows
              refetch={refetch}
              shows={data.getShows}
              setAdminView={setAdminView}
            />
          );
        }}
      </Query>
    );
  }
}
