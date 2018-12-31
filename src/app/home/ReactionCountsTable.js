import React, { Component } from "react";
import styled from "styled-components";

import { reactions, capitalize } from "../utility";

const ReactionTable = styled.table`
  width: 100%;
  /* border: 1px solid rgba(34, 36, 38, 0.15);
  -webkit-box-shadow: none; */
  box-shadow: none;
  border-radius: 0.28571429rem;
  text-align: left;
  border-collapse: separate;
  border-spacing: 0px;
`;

const ReactionTableItem = styled.td`
  padding: 0.78571429em 0.78571429em;
  text-align: inherit;
  border-bottom: ${props => (props.lastRow ? "none" : "1px solid white")};
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

export default class ReactionCountsTable extends Component {
  render() {
    const { reactionCounts } = this.props;
    return (
      <ReactionTable>
        <tbody>
          {reactions.map((reaction, i) => {
            return (
              <tr key={reaction}>
                <ReactionTableItem lastRow={reactions.length === i + 1}>
                  <StyledReaction className={`twa-${reaction}`} />
                  <span style={{ marginLeft: "1rem" }}>
                    {capitalize(reaction)}
                  </span>
                </ReactionTableItem>
                <ReactionTableItem lastRow={reactions.length === i + 1}>
                  {reactionCounts[`${reaction}`]}
                </ReactionTableItem>
              </tr>
            );
          })}
        </tbody>
      </ReactionTable>
    );
  }
}
