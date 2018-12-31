import React, { Component } from "react";
import styled from "styled-components";
import { reactions } from "../utility";

const ReactionCountsHorizontalWrapper = styled.div`
  width: 100%;
  text-align: center;
`;

const ReactionCountsWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
`;

const StyledReaction = styled.i`
  display: inline-block;
  height: 1.33em;
  width: 1.33em;
  margin: 0 0.0665em 0 0.133em;
  vertical-align: middle;
  background-size: 1.33em 1.33em;
  background-repeat: no-repeat;
  background-position: center center;
`;

class ReactionCountsHorizontal extends Component {
  render() {
    return (
      <ReactionCountsHorizontalWrapper>
        Reaction Totals
        <ReactionCountsWrapper>
          {reactions.map((reaction, i) => {
            return (
              <div>
                <StyledReaction className={`twa-${reaction}`} /> <span>1</span>
              </div>
            );
          })}
        </ReactionCountsWrapper>
      </ReactionCountsHorizontalWrapper>
    );
  }
}

export default ReactionCountsHorizontal;
