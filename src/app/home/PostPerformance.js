import React, { Component } from "react";
import { withApollo } from "react-apollo";
import CountdownTimeContainer from "./CountdownTimeContainer";
import { sendTimerExpiredTally } from "./graphql";
import styled from "styled-components";
import { getRandomInt } from "../utility";

const StyledPostPerformance = styled.div`
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

const PostPerformanceWrapper = styled.div`
  outline: 3px solid white;
  padding: 1rem 2rem;
  overflow: hidden;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const PostPerformanceTitle = styled.div`
  font-size: ${props => props.theme.fontSize.text3Xl};
  padding: 1rem 0;
  font-weight: 700;
`;

const PostPerformanceSubTitle = styled.div`
  font-size: ${props => props.theme.fontSize.textLg};
  padding: 1rem 0;
`;

const PostPerformanceImage = styled.img`
  border-radius: 50%;
  max-height: 180px;
  max-width: 180px;
`;

const PostPerformancePerformerName = styled.div`
  font-size: ${props => props.theme.fontSize.textLg};
  padding: 1rem 0;
`;

class PostPerformance extends Component {
  renderTitle = () => {
    const { audiencePulledPlug, adminPulledPlug } = this.props;

    if (audiencePulledPlug) return "The audience pulled the plug on you!";
    if (adminPulledPlug) return "Admins pulled the plug on you";
    return "Thanks for performing!";
  };

  render() {
    const { renderTitle } = this;
    const { channelName, client, previousPerformer, votingEnd } = this.props;

    if (!previousPerformer) {
      return <StyledPostPerformance />;
    }

    return (
      <StyledPostPerformance>
        <PostPerformanceWrapper>
          <PostPerformanceTitle>{renderTitle()}</PostPerformanceTitle>
          <PostPerformanceSubTitle>
            Viewers are currently voting on your performance
          </PostPerformanceSubTitle>
          <PostPerformanceImage src={previousPerformer.picture} alt="Avatar" />
          <PostPerformancePerformerName>
            {previousPerformer.name}
          </PostPerformancePerformerName>
          {votingEnd && (
            <CountdownTimeContainer
              endTimestamp={votingEnd}
              onComplete={async () => {
                try {
                  const easingTimeoutInteger = getRandomInt(1, 500);
                  //do this so all expirations aren't sent out at the same time

                  setTimeout(async () => {
                    await client.mutate({
                      mutation: sendTimerExpiredTally,
                      variables: {
                        channelName,
                        channelSegment: "voting"
                      }
                    });
                  }, easingTimeoutInteger);
                } catch (error) {
                  console.log("error", error);
                  console.log("PostPerformance - CountdownTime onComplete");
                }
              }}
            />
          )}
        </PostPerformanceWrapper>
      </StyledPostPerformance>
    );
  }
}

export default withApollo(PostPerformance);
