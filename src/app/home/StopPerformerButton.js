import React, { Component } from "react";
import { withApollo } from "react-apollo";
import { FlatButton } from "../common/styled-components/general";
import { stopPerformer } from "./graphql";
import styled from "styled-components";

const StyledStopPerformerButton = styled(FlatButton)`
  background-color: ${props => props.theme.color.red};
  cursor: ${props => props.disabled && "not-allowed"};
  opacity: ${props => props.disabled && 0.5};
`;

class StopPerformerButton extends Component {
  state = { disabled: false };

  render() {
    const { userIsCurrentPerformer, channelName, client } = this.props;
    const { disabled } = this.state;

    return (
      <StyledStopPerformerButton
        onClick={async () => {
          try {
            this.setState({ disabled: true });
            await client.mutate({
              mutation: stopPerformer,
              variables: {
                channelName
              }
            });
          } catch (error) {
            console.log("error", error);
            console.log("StopPerformer - onClick");
          }
        }}
        disabled={disabled}
      >
        {userIsCurrentPerformer ? "Stop Performance" : "Leave the Lineup"}
      </StyledStopPerformerButton>
    );
  }
}

export default withApollo(StopPerformerButton);
