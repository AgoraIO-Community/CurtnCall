import gql from "graphql-tag";

export default gql`
  mutation sendClientError($input: ClientErrorInput) {
    sendClientError(input: $input)
  }
`;
