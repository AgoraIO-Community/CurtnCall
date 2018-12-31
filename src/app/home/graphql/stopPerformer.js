import gql from "graphql-tag";

export default gql`
  mutation stopPerformer($channelName: String) {
    stopPerformer(channelName: $channelName)
  }
`;
