import gql from "graphql-tag";

export default gql`
  mutation sendAdminActions($input: AdminActionsInput) {
    sendAdminActions(input: $input)
  }
`;
