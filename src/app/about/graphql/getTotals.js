import gql from "graphql-tag";

export default gql`
  query getTotals {
    getTotals {
      type
      total
    }
  }
`;
