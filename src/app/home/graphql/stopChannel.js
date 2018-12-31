import gql from "graphql-tag";

export default gql`
  mutation stopChannel($channelName: String) {
    stopChannel(channelName: $channelName)
  }
`;
