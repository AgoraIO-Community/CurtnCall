import gql from "graphql-tag";

export default gql`
  mutation addUserToDb($facebookId: ID, $name: String, $email: String) {
    addUserToDb(facebookId: $facebookId, name: $name, email: $email)
  }
`;
