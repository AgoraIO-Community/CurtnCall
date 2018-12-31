import React, { Component } from "react";
import styled from "styled-components";
import { withApollo } from "react-apollo";
import { sendTimerExpiredTally } from "./graphql";
import CountdownTimeContainer from "./CountdownTimeContainer";
import MoneyTomatoMehButtonContainer from "./MoneyTomatoMehButtonContainer";
import { getRandomInt } from "../utility";

const StyledVoting = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.color.darkestRed};
  flex-grow: 1;
  padding: 2rem;
  overflow: auto;
  color: white;
  /* flex-direction: column; */
`;

const VotingWrapper = styled.div`
  outline: 3px solid white;
  /* border-radius: 1em; */
  padding: 1rem 2rem;
  overflow: hidden;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const VotingTitle = styled.div`
  font-size: ${props => props.theme.fontSize.text3Xl};
  padding: 1rem 0;
  font-weight: 700;
`;

const VotingImage = styled.img`
  border-radius: 50%;
  max-height: 180px;
  max-width: 180px;
`;

const VotingPerformerName = styled.div`
  font-size: ${props => props.theme.fontSize.text2Xl};
  padding: 1rem 0;
`;

const VotingButtonWrapper = styled.div`
  text-align: center;
`;

class Voting extends Component {
  render() {
    const { client, votingEnd, channelName, previousPerformer } = this.props;

    if (!previousPerformer) {
      return null;
    }

    return (
      <StyledVoting>
        <VotingWrapper>
          <VotingTitle>Vote Now!</VotingTitle>
          <VotingImage src={previousPerformer.picture} alt="Performer Image" />
          <VotingPerformerName>{previousPerformer.name}</VotingPerformerName>
          <VotingButtonWrapper>
            <MoneyTomatoMehButtonContainer type="money" />
            <MoneyTomatoMehButtonContainer type="meh" />
            <MoneyTomatoMehButtonContainer type="tomato" />
          </VotingButtonWrapper>

          {votingEnd && (
            <CountdownTimeContainer
              endTimestamp={votingEnd}
              onComplete={async () => {
                const easingTimeoutInteger = getRandomInt(1, 500);
                //do this so all expirations aren't sent out at the same time

                setTimeout(async () => {
                  try {
                    await client.mutate({
                      mutation: sendTimerExpiredTally,
                      variables: {
                        channelName,
                        channelSegment: "voting"
                      }
                    });
                  } catch (error) {
                    console.log("error", error);
                    console.log("Voting - onCountdownEnd");
                  }
                }, easingTimeoutInteger);
              }}
            />
          )}
        </VotingWrapper>
      </StyledVoting>
    );
  }
}

export default withApollo(Voting);
