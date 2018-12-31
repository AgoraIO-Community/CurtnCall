import gql from "graphql-tag";

export default gql`
  mutation startChannel(
    $channelName: String
    $iotId: ID
    $username: String
    $fingerprint: ID
  ) {
    startChannel(
      channelName: $channelName
      iotId: $iotId
      username: $username
      fingerprint: $fingerprint
    ) {
      agoraAccessToken
      agoraId
      agoraRecordingAccessToken
      agoraRecordingId
    }
  }
`;
