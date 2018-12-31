import gql from "graphql-tag";

export default gql`
  mutation updatePerformance($input: PerformanceInput) {
    updatePerformance(input: $input)
  }
`;
