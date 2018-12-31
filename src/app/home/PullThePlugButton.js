import React, { Component } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { media } from "styled-bootstrap-grid";
import { pullThePlugReasons } from "../utility";
import { withApollo } from "react-apollo";
import { sendPullThePlug } from "./graphql";

const StyledPullThePlugButton = styled.a`
  align-items: center;
  color: white;
  cursor: pointer;
  background-color: ${props => props.theme.color.black};
  border-radius: 100%;
  box-shadow: 0 12px 24px 0 rgba(0, 0, 0, 0.15);
  display: flex;
  justify-content: center;
  position: absolute;
  right: 1rem;
  opacity: 0.85;
  bottom: 1rem;
  height: 2.5rem;
  width: 2.5rem;
  ${media.tablet`
    height: 3.5rem;
    width: 3.5rem;
  `};
`;

const PullThePlugReasonsContainer = styled.div`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 12px 24px 0 rgba(0, 0, 0, 0.15);
  overflow: hidden;
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  /* width: 300px;
  height: 100px; */
  transform: ${props => (props.opened ? "scale(1)" : "scale(0)")};
  transform-origin: bottom right;
  transition: transform 0.3s ease;
`;

const Header = styled.div`
  align-items: center;
  background-color: ${props => props.theme.color.black};
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

const PullThePlugReasonWrapper = styled.div`
  display: flex;
  flex-wrap: none;
  padding: 1rem;
  justify-content: center;
`;

const PullThePlugReasonButton = styled.button`
  background-color: ${props => props.theme.color.red};
  margin: 0.5rem;
  color: white;
  border: 0;
  /* border-right: 3px solid ${props => props.theme.color.darkBlue}; */
  padding: 0.5rem;
  cursor: pointer;
  cursor: ${props => props.disabled && "not-allowed"};
  opacity: ${props => props.disabled && 0.75};
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

const PullThePlugSubheader = styled.div`
  padding-top: 1rem;
  text-align: center;
`;

class PullThePlugButton extends Component {
  state = { opened: false };

  togglePullThePlugReasons = async () => {
    this.setState(({ opened }) => ({
      opened: !opened
    }));
  };

  render() {
    const { togglePullThePlugReasons } = this;
    const { channelName, setViewerPulledPlug } = this.props;
    const { opened } = this.state;

    return (
      <div>
        <StyledPullThePlugButton
          className="home-pull-the-plug-button"
          onClick={togglePullThePlugReasons}
        >
          <FontAwesomeIcon
            className="home-pull-the-plug-icon"
            icon={["fal", "plug"]}
            size="2x"
            rotation={90}
          />
        </StyledPullThePlugButton>
        <PullThePlugReasonsContainer opened={opened}>
          <Header>
            <HeaderTitle>Pull the Plug</HeaderTitle>
            <HeaderIcon onClick={togglePullThePlugReasons}>
              <FontAwesomeIcon icon={["fas", "times"]} size="lg" />
            </HeaderIcon>
          </Header>
          <PullThePlugSubheader>
            Why are you Pulling The Plug?
          </PullThePlugSubheader>
          <PullThePlugReasonWrapper>
            {pullThePlugReasons.map((reason, i) => {
              return (
                <PullThePlugReasonButton
                  key={reason}
                  onClick={async () => {
                    try {
                      setViewerPulledPlug();
                      const { client } = this.props;

                      await client.mutate({
                        mutation: sendPullThePlug,
                        variables: {
                          channelName,
                          reason
                        }
                      });
                    } catch (error) {
                      console.log("error", error);
                      console.log("PullThePlugButton - onClick");
                    }
                  }}
                >
                  {reason.charAt(0).toUpperCase() + reason.slice(1)}
                </PullThePlugReasonButton>
              );
            })}
          </PullThePlugReasonWrapper>
        </PullThePlugReasonsContainer>
      </div>
    );
  }
}

export default withApollo(PullThePlugButton);
