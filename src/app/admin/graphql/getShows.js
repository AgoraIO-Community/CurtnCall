import gql from "graphql-tag";

export default gql`
  query getShows($channelName: String) {
    getShows(channelName: $channelName) {
      id
      gimmeMoreDuration
      maxNumberOfPerformance
      performanceDuration
      performanceTimerExpiredThreshold
      performanceReadyThreshold
      pullThePlugThreshold
      reactionTimeout
      showDescription
      showName
      showStart
      showEnd
      votingDuration
      votingTimerExpiredThreshold
    }
  }
`;
