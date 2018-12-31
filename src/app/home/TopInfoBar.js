import React, { Component } from "react";
import styled from "styled-components";
import { withApollo } from "react-apollo";
import { media } from "styled-bootstrap-grid";
import CountdownTimeContainer from "./CountdownTimeContainer";
import Label from "../common/Label";
import PictureLabel from "../common/PictureLabel";
import { sendTimerExpiredTally } from "./graphql";
import { getRandomInt } from "../utility";

const TopInfoBarWrapper = styled.div`
  ${media.phone`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    /* border: 1px solid black; */
  `};
  display: none;
`;

class TopInfoBar extends Component {
  render() {
    const {
      viewerCount,
      performanceEnd,
      nextPerformer,
      client,
      channelName
    } = this.props;

    return (
      <TopInfoBarWrapper>
        <div>
          <Label color="darkGrey">Viewer Count: {viewerCount}</Label>
        </div>
        <div>
          <Label color="darkGrey">
            Time Remaining{" "}
            {performanceEnd && (
              <CountdownTimeContainer
                endTimestamp={performanceEnd}
                onComplete={async () => {
                  const easingTimeoutInteger = getRandomInt(1, 500);
                  //do this so all expirations aren't sent out at the same time

                  setTimeout(async () => {
                    try {
                      await client.mutate({
                        mutation: sendTimerExpiredTally,
                        variables: {
                          channelName,
                          channelSegment: "performance"
                        }
                      });
                    } catch (error) {
                      console.log("TopInfoBar - sendTimerExpiredTally");
                      console.log("error", error);
                    }
                  }, easingTimeoutInteger);
                }}
              />
            )}
          </Label>
        </div>

        {nextPerformer && (
          <div>
            <PictureLabel picture={nextPerformer.picture} color="darkGrey">
              Up Next: {nextPerformer.name}
            </PictureLabel>
          </div>
        )}
      </TopInfoBarWrapper>
    );
  }
}

export default withApollo(TopInfoBar);
