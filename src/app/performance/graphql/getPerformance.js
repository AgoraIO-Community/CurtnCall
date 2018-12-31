import gql from "graphql-tag";

export default gql`
  query getPerformance($performanceId: ID) {
    getPerformance(performanceId: $performanceId) {
      cognitoIdentityId
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
      show {
        _id
        showName
        showDescription
      }
      timeStarted
      humanizedDuration
      meh
      money
      performer {
        _id
        name
        picture
      }
      performanceName
      performancePrivate
      reactionCounts {
        applause
        laugh
        angry
        sad
        confused
        awkward
        hearts
        shock
      }
      viewerTimeArray {
        second
        count
      }
      reactionTimeArrays {
        second
        count
        reaction
      }
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
      tomato
      viewers
      zzz
    }
  }
`;
