import React, { Component } from "react";
import styled from "styled-components";

const MessageImage = styled.img`
  height: 1rem;
  width: 1rem;
  vertical-align: middle;
  padding-right: 0.25rem;
`;

const StyledPerformerViewers = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-height: 287px;
  overflow-y: auto;
  width: auto;
`;

const StyledViewer = styled.div`
  padding: 0.5rem;
  border: 1px solid white;
`;

export default class CurrentPerformerViewers extends Component {
  render() {
    const { viewers } = this.props;

    return (
      <StyledPerformerViewers>
        {viewers.map((viewer, i) => {
          if (!viewer.hasOwnProperty("name")) {
            return null;
          }

          return (
            <StyledViewer key={viewer.iotId}>
              <MessageImage src={viewer.picture} />
              <span>{viewer.name}</span>
            </StyledViewer>
          );
        })}
      </StyledPerformerViewers>
    );
  }
}
