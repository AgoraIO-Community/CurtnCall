import gql from "graphql-tag";

export default gql`
  mutation addAuthenticatedIdToViewer(
    $channelName: String
    $unauthenticatedCognitoIdentityId: ID
    $authenticatedCognitoIdentityId: ID
  ) {
    addAuthenticatedIdToViewer(
      channelName: $channelName
      unauthenticatedCognitoIdentityId: $unauthenticatedCognitoIdentityId
      authenticatedCognitoIdentityId: $authenticatedCognitoIdentityId
    )
  }
`;
