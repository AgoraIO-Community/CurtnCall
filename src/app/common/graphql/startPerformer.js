import gql from "graphql-tag";

export default gql`
  mutation startPerformer($channelName: String, $input: StartPerformerInput) {
    startPerformer(channelName: $channelName, input: $input)
  }
`;
