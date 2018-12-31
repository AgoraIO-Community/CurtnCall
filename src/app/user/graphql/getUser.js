import gql from "graphql-tag";

export default gql`
  query getUser($userId: ID) {
    getUser(userId: $userId) {
      stateCounts {
        type
        stateCount {
          AK
          AL
          AZ
          AR
          CA
          CO
          CT
          DE
          FL
          GA
          HI
          ID
          IL
          IN
          IA
          KS
          KY
          LA
          ME
          MD
          MA
          MI
          MN
          MS
          MO
          MT
          NE
          NV
          NH
          NJ
          NM
          NY
          NC
          ND
          OH
          OK
          OR
          PA
          RI
          SC
          SD
          TN
          TX
          UT
          VT
          VA
          WA
          WV
          WI
          WY
        }
      }
      stats {
        performerStats {
          category
          rank
          value
        }
        viewerStats {
          category
          rank
          value
        }
      }
      achievements {
        name
        description
      }
      trophies {
        name
        description
        show {
          showName
          showDescription
          showStart
        }
      }
      cognitoIdentityId
      name
      picture
      timeCreated
      socialMedia {
        type
        link
      }
      featuredPerformance {
        _id
        money
        viewers
        performanceName
      }
      performances {
        _id
        performanceName
        timeStarted
      }
      ranks {
        performerRanks {
          category
          rank
        }
        viewerRanks {
          category
          rank
        }
      }
    }
  }
`;
