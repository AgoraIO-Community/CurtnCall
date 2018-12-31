import gql from "graphql-tag";

export default gql`
  mutation sendShowActions($input: ShowInput) {
    sendShowActions(input: $input)
  }
`;
