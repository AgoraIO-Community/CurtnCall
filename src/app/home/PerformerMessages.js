import React from "react";
import styled from "styled-components";

const MessagesWrapper = styled.div`
  max-height: 428px;
  overflow: hidden;
`;

const StyledMessage = styled.div`
  color: white;
  text-align: left;
  overflow: hidden;
  padding: 0.75rem;
  border-bottom: 1px solid white;
`;

const MessageImage = styled.img`
  height: 1rem;
  width: 1rem;
  vertical-align: middle;
  padding-right: 0.25rem;
`;

const ImageAndNameWrapper = styled.div`
  margin-bottom: 0.5rem;
`;

const PerformerMessages = ({ performerMessages }) => {
  if (performerMessages.length === 0) {
    return (
      <MessagesWrapper>
        <StyledMessage style={{ textAlign: "center" }}>
          No messages to display
        </StyledMessage>
      </MessagesWrapper>
    );
  }

  return (
    <MessagesWrapper>
      {performerMessages.map((performerMessage, i) => {
        const { message, name, picture, id } = performerMessage;
        return (
          <StyledMessage key={id}>
            <ImageAndNameWrapper>
              <MessageImage src={picture} />
              <span>{name}</span>
            </ImageAndNameWrapper>
            <div>{message}</div>
          </StyledMessage>
        );
      })}
    </MessagesWrapper>
  );
};

export default PerformerMessages;
