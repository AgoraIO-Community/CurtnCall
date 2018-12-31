import React, { Fragment } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import StopPerformerButtonContainer from "./StopPerformerButtonContainer";
import PerformerVideoContainer from "./PerformerVideoContainer";
import ShowInfo from "./ShowInfo";

import CountdownTimeContainer from "./CountdownTimeContainer";
import posed from "react-pose";
import { FlatButton } from "../common/styled-components/general";

const PosedPerformerSidebar = posed.div({
  open: {
    x: "0%",
    transition: { type: "tween", duration: 150 }
  },
  closed: {
    x: "-100%",
    transition: { type: "tween", duration: 150 }
  }
});

const StyledPerformerSidebar = styled(PosedPerformerSidebar)`
  display: block;
  background-color: ${props => props.theme.color.black};
  color: white;
  z-index: 1;
  height: calc(100% - 64.19px);
  position: fixed;
  width: 17rem;
  overflow-y: auto;
  overflow-x: hidden;p
`;

const SidebarToggle = styled.div`
  padding: 0.5rem;
  text-align: center;
  color: white;
  opacity: 0.5;
`;

const SidebarHeader = styled.div`
  padding: 0.5rem;
  text-align: center;
  font-weight: 700;
  border-bottom: 1px solid white;
  border-top: 1px solid white;
  background-color: ${props => props.theme.color.darkestGrey};
`;

const Lineup = styled.div`
  display: flex;
  flex-direction: column;
`;

const LineupItem = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid white;
`;

const LineupItemImage = styled.img`
  flex-grow: 0;
  flex-shrink: 0;
  height: 3rem;
  width: 3rem;
`;

const LineupItemText = styled.span`
  padding-left: 1rem;
`;

const SidebarInfoWrapper = styled.div`
  font-size: 2rem;
  margin: 0.5rem;
  display: flex;
  justify-content: center;
  align-content: center;
`;

const NooneInTheLineup = styled.div`
  padding: 1rem;
  text-align: center;
`;

const PerformerSidebar = ({
  channelName,
  iotId,
  lineup,
  performanceEnd,
  show,
  showPerformerSidebar,
  userInLineup,
  userIsCurrentPerformer,
  userIsPreviousPerformer,
  viewerCount
}) => {
  let multiplier;

  if (lineup && userInLineup) {
    for (let i = 0; i < lineup.length; i++) {
      const user = lineup[i];
      if (user.iotId === iotId) {
        multiplier = i;
        break;
      }
    }
  }

  let sidebarOpen = false;

  if (
    showPerformerSidebar &&
    !userIsCurrentPerformer &&
    !userIsPreviousPerformer
  ) {
    sidebarOpen = true;
  }

  return (
    <StyledPerformerSidebar
      pose={sidebarOpen ? "open" : "closed"}
      className="performer-sidebar-scrollbar"
    >
      <SidebarToggle>
        <FontAwesomeIcon icon="arrow-up" /> Click logo to hide sidebar
      </SidebarToggle>

      {userInLineup && <PerformerVideoContainer darkBackground />}
      {userInLineup && <StopPerformerButtonContainer />}
      {userInLineup && (
        <FlatButton
          style={{ backgroundColor: "#3b5998" }}
          onClick={() => {
            window.FB.ui({
              method: "share",
              mobile_iframe: true,
              href:
                channelName === "curtncall"
                  ? "https://curtncall.com"
                  : `https://curtncall.com/cc/${channelName}`
            });
          }}
        >
          <FontAwesomeIcon icon={["fab", "facebook-square"]} /> Share on
          Facebook
        </FlatButton>
      )}
      {userInLineup && (
        <Fragment>
          <SidebarHeader>Time Until You Perform</SidebarHeader>
          <SidebarInfoWrapper>
            <CountdownTimeContainer
              endTimestamp={performanceEnd}
              multiplier={multiplier}
              timeToPerform
            />
          </SidebarInfoWrapper>
        </Fragment>
      )}

      <SidebarHeader>Viewer Count</SidebarHeader>
      <SidebarInfoWrapper>{viewerCount}</SidebarInfoWrapper>

      {show && (
        <Fragment>
          <SidebarHeader>Show Info</SidebarHeader>
          <ShowInfo show={show} padding />
        </Fragment>
      )}

      <SidebarHeader>Lineup</SidebarHeader>

      {lineup && lineup.length > 0 ? (
        <Lineup>
          {lineup.map((performer, i) => {
            const { iotId, name, picture } = performer;
            return (
              <LineupItem key={iotId}>
                <LineupItemImage src={picture} />

                <LineupItemText>{name}</LineupItemText>
              </LineupItem>
            );
          })}
        </Lineup>
      ) : (
        <NooneInTheLineup>No one is currently in the lineup</NooneInTheLineup>
      )}
    </StyledPerformerSidebar>
  );
};

export default PerformerSidebar;
