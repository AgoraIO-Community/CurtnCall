import gql from "graphql-tag";

export default gql`
  mutation updateUser($input: UserInput) {
    updateUser(input: $input)
  }
`;
