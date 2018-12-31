import gql from "graphql-tag";

export default gql`
  query getLeaderboards($channelName: String) {
    getLeaderboards(channelName: $channelName) {
      performerLeaderboards {
        category
        description
        leaders {
          curtnCallId
          name
          picture
          value
        }
      }
      viewerLeaderboards {
        category
        description
        leaders {
          curtnCallId
          name
          picture
          value
        }
      }
    }
  }
`;
