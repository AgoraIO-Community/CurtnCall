import gql from "graphql-tag";

export default gql`
  mutation sendTimerExpiredTally(
    $channelName: String
    $channelSegment: String
  ) {
    sendTimerExpiredTally(
      channelName: $channelName
      channelSegment: $channelSegment
    )
  }
`;
