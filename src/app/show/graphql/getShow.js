import gql from "graphql-tag";

export default gql`
  query getShow($showId: ID) {
    getShow(showId: $showId) {
      performances {
        _id
        performanceName
        timeStarted
      }
      rankedPerformers {
        type
        performers {
          user {
            _id
            name
            picture
          }
          value
          rank
        }
      }
      showEnd
      showName
      showNumber
      showStart
      stats {
        performanceStats {
          category
          rank
          value
        }
        reactionStats {
          category
          rank
          value
        }
      }
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
    }
  }
`;
