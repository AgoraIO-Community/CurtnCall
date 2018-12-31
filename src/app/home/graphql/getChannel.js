import gql from "graphql-tag";

export default gql`
  query getChannel($channelName: String, $fingerprint: ID) {
    getChannel(channelName: $channelName, fingerprint: $fingerprint) {
      channelSegment
      currentPerformer {
        name
        picture
        allowPerformerMessages
      }
      fingerprintExists
      lineup {
        name
        picture
        iotId
      }
      nextPerformer {
        name
        picture
      }
      performanceDuration
      performanceEnd
      performanceReady
      performanceStart
      previousPerformer {
        name
        picture
      }
      reactionTimeout
      serverTime
      show {
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
      showRequired
      userIsPreviousPerformer
      viewerCount
      viewers {
        name
        picture
        iotId
      }
      votingDuration
      votingStart
      votingEnd
    }
  }
`;
