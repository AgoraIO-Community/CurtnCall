import React, { Component } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  checkIfUserLoggedIn,
  getCurrentUserNameAndPicture,
  generateIotId
} from "../utility";
import PubSub from "@aws-amplify/pubsub";

const FloatButton = styled.a`
  align-items: center;
  color: white;
  cursor: pointer;
  background-color: ${props => props.theme.color.blue};
  bottom: 32px;
  border-radius: 100%;
  box-shadow: 0 12px 24px 0 rgba(0, 0, 0, 0.15);
  display: flex;
  height: 75px;
  justify-content: center;
  position: fixed;
  right: 32px;
  transform: ${props => (props.opened ? "scale(0)" : "scale(1)")};
  transition: transform 0.3s ease;
  width: 75px;
  z-index: 999;
`;

const ChatBotContainer = styled.div`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 12px 24px 0 rgba(0, 0, 0, 0.15);
  overflow: hidden;
  position: fixed;
  bottom: 32px;
  right: 32px;
  width: 300px;
  height: 100px;
  z-index: 999;
  transform: ${props => (props.opened ? "scale(1)" : "scale(0)")};
  transform-origin: bottom right;
  transition: transform 0.3s ease;
`;

const Header = styled.div`
  align-items: center;
  background-color: ${props => props.theme.color.blue};
  color: white;
  display: flex;
  height: 50px;
  justify-content: space-between;
  padding: 0 10px;
`;

const HeaderTitle = styled.span`
  font-weight: 700;
  font-size: ${props => props.theme.fontSize.textLg};
`;

const HeaderIcon = styled.a`
  cursor: pointer;
`;

const Footer = styled.div`
  position: relative;
`;

const Input = styled.input`
  border: 0;
  border-radius: 0;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  border-top: 1px solid #eee;
  box-sizing: border-box;
  font-size: 16px;
  padding: 16px 10px;
  width: 90%;
  outline: none;
`;

const SubmitButton = styled.button`
  background-color: ${props => props.theme.color.darkGrey};
  color: white;
  border: 0;
  border-bottom-right-radius: 10px;
  box-shadow: none;
  cursor: pointer;
  outline: none;
  padding: 14px 9px 19px 6px;
  position: absolute;
  right: 0;
  top: 0;
  &:before {
    content: "";
    position: absolute;
    width: 23px;
    height: 23px;
    border-radius: 50%;
  }
`;

export default class PerformerChat extends Component {
  state = { opened: false };

  togglePerformerChat = async () => {
    const userLoggedIn = await checkIfUserLoggedIn();

    if (!userLoggedIn) {
      return;
    }

    this.setState(({ opened }) => ({
      opened: !opened
    }));
  };

  handleMessageSubmit = async () => {
    const {
      currentPerformer: { iotId }
    } = this.props;

    const { name, picture } = await getCurrentUserNameAndPicture();
    const id = generateIotId();

    const input = document.getElementById("performer-chat-input");
    const message = input.value;
    input.value = "";

    await PubSub.publish(iotId, {
      performerMessage: { name, picture, message, id }
    });
  };

  handleKeyPress = async e => {
    if (e.key === "Enter") {
      const {
        currentPerformer: { iotId }
      } = this.props;

      const { name, picture } = await getCurrentUserNameAndPicture();
      const id = generateIotId();

      const input = document.getElementById("performer-chat-input");
      const message = input.value;
      input.value = "";

      await PubSub.publish(iotId, {
        performerMessage: { name, picture, message, id }
      });
    }
  };

  render() {
    const { togglePerformerChat, handleMessageSubmit, handleKeyPress } = this;
    const { opened } = this.state;

    return (
      <div>
        <FloatButton
          title="Message the Performer"
          opened={opened}
          onClick={togglePerformerChat}
        >
          <FontAwesomeIcon icon={["far", "comment-alt"]} size="2x" />
        </FloatButton>
        <ChatBotContainer opened={opened}>
          <Header>
            <HeaderTitle>Message The Performer</HeaderTitle>
            <HeaderIcon onClick={togglePerformerChat}>
              <FontAwesomeIcon icon={["fas", "times"]} size="lg" />
            </HeaderIcon>
          </Header>
          <Footer>
            <Input
              type="text"
              maxLength={100}
              placeholder="Type your message here..."
              id="performer-chat-input"
              onKeyPress={handleKeyPress}
            />
            <SubmitButton onClick={handleMessageSubmit}>
              <FontAwesomeIcon icon={["fas", "paper-plane"]} size="lg" />
            </SubmitButton>
          </Footer>
        </ChatBotContainer>
      </div>
    );
  }
}
