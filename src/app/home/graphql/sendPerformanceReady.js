import gql from "graphql-tag";

export default gql`
  mutation sendPerformanceReady($channelName: String) {
    sendPerformanceReady(channelName: $channelName)
  }
`;
