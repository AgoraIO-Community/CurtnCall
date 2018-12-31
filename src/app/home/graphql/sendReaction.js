import gql from "graphql-tag";

export default gql`
  mutation sendReaction($channelName: String, $reaction: String) {
    sendReaction(channelName: $channelName, reaction: $reaction)
  }
`;
