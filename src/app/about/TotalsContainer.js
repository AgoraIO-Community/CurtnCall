import React, { Component } from "react";
import { getTotals } from "./graphql";
import { Query } from "react-apollo";
import Totals from "./Totals";

export default class TotalsContainer extends Component {
  render() {
    const defaultTotals = [
      { type: "performances", total: 0 },
      { type: "viewers", total: 0 },
      { type: "votes", total: 0 },
      { type: "reactions", total: 0 }
    ];

    return (
      <Query query={getTotals} fetchPolicy={"network-only"}>
        {({ loading, error, data }) => {
          if (error) {
            console.log(error);
            return null;
          }

          const { getTotals } = data;

          return <Totals totals={loading ? defaultTotals : getTotals} />;
        }}
      </Query>
    );
  }
}
