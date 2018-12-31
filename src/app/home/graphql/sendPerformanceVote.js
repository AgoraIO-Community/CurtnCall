import gql from "graphql-tag";

export default gql`
  mutation sendPerformanceVote($channelName: String, $performanceVote: String) {
    sendPerformanceVote(
      channelName: $channelName
      performanceVote: $performanceVote
    )
  }
`;
