import gql from "graphql-tag";

export default gql`
  mutation sendPullThePlug($channelName: String, $reason: String) {
    sendPullThePlug(channelName: $channelName, reason: $reason)
  }
`;
