import React, { Component } from "react";
import styled from "styled-components";
import { media } from "styled-bootstrap-grid";
import { reactions, checkIfUserLoggedIn } from "../utility";
import { withApollo } from "react-apollo";
import { sendReaction } from "./graphql";
import posed from "react-pose";

const ReactionPanelWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  /* ${media.phone` */
        /* flex: nowrap; */
        /* justify-content: space-around;
        border: 1px solid black;
        padding: 0.5rem; */
    /* `}; */
`;

const ReactionButton = styled.button`
  flex: 1;
  background-color: ${props => props.theme.color.darkGrey};
  color: white;
  border: 0;
  border-right: 3px solid ${props => props.theme.color.darkestGrey};
  padding: 0.5rem;
  cursor: pointer;
  cursor: ${props => props.disabled && "not-allowed"};
  opacity: ${props => props.disabled && 0.5};
  font-size: 0.75rem;
  ${media.phone`
    /* font-weight: 300; */
    font-size: 0.85rem;
  `};
  ${media.tablet`
    font-weight: 600;
    font-size: 1rem;
  `};

  &:last-child {
    border-right: 0;
  }
`;

const ReactionTextDescriptor = styled.span`
  display: none;
  margin-top: 0.25rem;
  @media only screen and (min-width: 500px) {
    display: block;
  }
`;

const PosedReaction = posed.i({
  animate: {
    y: "-200%",
    transition: { type: "tween", duration: 150 }
  },
  normal: {
    y: "0%",
    transition: { type: "tween", duration: 150 }
  }
});

const StyledReaction = styled(PosedReaction)`
  display: inline-block;
  height: 1.33em;
  width: 1.33em;
  margin: 0 0.0665em 0 0.133em;
  vertical-align: -0.133em;
  background-size: 1.33em 1.33em;
  background-repeat: no-repeat;
  background-position: center center;
  ${media.tablet`
    height: 2em;
    width: 2em;
    margin: 0 0.1em 0 0.2em;
    vertical-align: -0.2em;
    background-size: 2em 2em;
  `};
`;

class ReactionPanel extends Component {
  state = { disabled: false };

  clickedReactionTimeout = null;
  reactionTimeout = null;

  componentWillUnmount = () => {
    if (this.clickedReactionTimeout) {
      clearTimeout(this.clickedReactionTimeout);
    }

    if (this.reactionTimeout) {
      clearTimeout(this.reactionTimeout);
    }
  };

  render() {
    const { client, channelName, reactionTimeout } = this.props;
    const { disabled } = this.state;

    return (
      <ReactionPanelWrapper>
        {reactions.map((reaction, i) => {
          return (
            <ReactionButton
              key={reaction}
              disabled={disabled}
              onClick={async () => {
                try {
                  this.setState({ disabled: true });

                  const userLoggedIn = await checkIfUserLoggedIn();

                  if (!userLoggedIn) {
                    this.setState({ disabled: false });
                    return;
                  }

                  this.clickedReactionTimeout = this.setState(
                    { clickedReaction: reaction },
                    () => {
                      setTimeout(() => {
                        this.setState({ clickedReaction: null });
                      }, 500);
                    }
                  );

                  await client.mutate({
                    mutation: sendReaction,
                    variables: {
                      channelName,
                      reaction
                    }
                  });

                  this.reactionTimeout = setTimeout(() => {
                    this.setState({ disabled: false });
                    this.clickedReactionTimeout = null;
                    this.reactionTimeout = null;
                  }, reactionTimeout);
                } catch (error) {
                  console.log("error", error);
                  console.log("ReactionPanel - onClick");
                }
              }}
            >
              <StyledReaction
                className={`twa-${reaction}`}
                pose={
                  this.state.clickedReaction === reaction ? "animate" : "normal"
                }
              />
              <ReactionTextDescriptor>
                {reaction.charAt(0).toUpperCase() + reaction.slice(1)}
              </ReactionTextDescriptor>
            </ReactionButton>
          );
        })}
      </ReactionPanelWrapper>
    );
  }
}

export default withApollo(ReactionPanel);
