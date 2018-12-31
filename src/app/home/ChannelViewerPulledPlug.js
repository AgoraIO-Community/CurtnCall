import React, { Component, Fragment } from "react";
import styled from "styled-components";
import { ReactComponent as CurtnCallLogo } from "../utility/svg/curtncallLogo.svg";
import CountdownTimeContainer from "./CountdownTimeContainer";
import { sendTimerExpiredTally } from "./graphql";
import { getRandomInt } from "../utility";
import { withApollo } from "react-apollo";

const StyledChannelViewerPulledPlug = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.color.darkestRed};
  flex-grow: 1;
  padding: 2rem;
  overflow: auto;
  color: white;
  text-align: center;
`;

const ChannelViewerPulledPlugWrapper = styled.div`
  width: 30rem;
  padding: 1rem 2rem;
  overflow: hidden;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const StyledCurtnCallLogo = styled(CurtnCallLogo)`
  height: 100%;
  width: 100%;
  max-height: 8rem;
`;

const ChannelViewerPulledPlugTitle = styled.div`
  font-size: ${props => props.theme.fontSize.textXl};
  padding: 1rem 0;
  font-weight: 700;
`;

const ChannelViewerPulledPlugImage = styled.img`
  border-radius: 50%;
  max-height: 180px;
  max-width: 180px;
`;

const ChannelViewerPulledPlugPerformerName = styled.div`
  font-size: ${props => props.theme.fontSize.text2Xl};
  padding: 1rem 0;
`;

const ChannelViewerPulledPlugParagraph = styled.p`
  margin: 0rem;
`;

class ChannelViewerPulledPlug extends Component {
  render() {
    const { channelName, client, nextPerformer, performanceEnd } = this.props;

    return (
      <StyledChannelViewerPulledPlug>
        <ChannelViewerPulledPlugWrapper>
          <StyledCurtnCallLogo />
          <ChannelViewerPulledPlugTitle>
            Sorry you had to pull the plug!
          </ChannelViewerPulledPlugTitle>

          {nextPerformer ? (
            <Fragment>
              <ChannelViewerPulledPlugImage src={nextPerformer.picture} />
              <ChannelViewerPulledPlugPerformerName>
                {nextPerformer.name}
              </ChannelViewerPulledPlugPerformerName>
              <ChannelViewerPulledPlugParagraph>
                will perform next in{" "}
                <CountdownTimeContainer
                  endTimestamp={performanceEnd}
                  onComplete={() => {}}
                />
              </ChannelViewerPulledPlugParagraph>
            </Fragment>
          ) : (
            <ChannelViewerPulledPlugParagraph>
              The current performer will stop performing in{" "}
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
                      console.log("error", error);
                      console.log(
                        "ChannelViewerPulledPlug sendTimerExpiredTally"
                      );
                    }
                  }, easingTimeoutInteger);
                }}
              />
            </ChannelViewerPulledPlugParagraph>
          )}
        </ChannelViewerPulledPlugWrapper>
      </StyledChannelViewerPulledPlug>
    );
  }
}

export default withApollo(ChannelViewerPulledPlug);
