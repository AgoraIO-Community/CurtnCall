import React, { Component } from "react";
import { withApollo } from "react-apollo";
import { Button } from "../common/styled-components/general";
import { capitalize, checkIfUserLoggedIn } from "../utility";
import { sendPerformanceVote } from "./graphql";
import styled from "styled-components";

const StyledMoneyTomatoButton = styled(Button)`
  background-color: ${props => {
    if (props.type === "money") {
      return props.theme.color.green;
    } else if (props.type === "tomato") {
      return props.theme.color.red;
    } else {
      return props.theme.color.blue;
    }
  }};
  border-color: ${props => {
    if (props.type === "money") {
      return props.theme.color.darkGreen;
    } else if (props.type === "tomato") {
      return props.theme.color.darkRed;
    } else {
      return props.theme.color.darkBlue;
    }
  }};
  width: 7rem;
  margin: 0.5rem 1rem;
  cursor: ${props => props.disabled && "not-allowed"};
  opacity: ${props => props.disabled && 0.5};
`;

class MoneyTomatoMehButton extends Component {
  state = { disabled: false };

  handleClick = async () => {
    try {
      this.setState({ disabled: true });

      const userLoggedIn = await checkIfUserLoggedIn();

      if (!userLoggedIn) {
        this.setState({ disabled: false });
        return;
      }

      const {
        setPerformanceVote,
        type,
        performanceVote,
        client,
        channelName
      } = this.props;

      if (type === performanceVote) {
        setPerformanceVote(null);
      } else {
        setPerformanceVote(type);
      }

      await client.mutate({
        mutation: sendPerformanceVote,
        variables: {
          channelName,
          performanceVote: type
        }
      });

      this.setState({ disabled: false });
    } catch (error) {
      console.log("error", error);
      console.log("MoneyTomatoMehButton - handleClick");
    }
  };

  renderText = () => {
    const { performanceVote, type } = this.props;

    if (performanceVote === type) {
      return "Voted!";
    } else {
      return capitalize(type);
    }
  };

  render() {
    const { handleClick, renderText } = this;
    const { type } = this.props;
    const { disabled } = this.state;

    return (
      <StyledMoneyTomatoButton
        type={type}
        onClick={handleClick}
        disabled={disabled}
      >
        {renderText()}
      </StyledMoneyTomatoButton>
    );
  }
}

export default withApollo(MoneyTomatoMehButton);
