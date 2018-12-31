import React, { Component, Fragment } from "react";
import styled from "styled-components";
import TopInfoBar from "./TopInfoBar";
import ReactionPanel from "./ReactionPanel";
import RemoteVideoContainer from "./RemoteVideoContainer";
import PerformerChat from "./PerformerChat";
import PullThePlugButtonContainer from "./PullThePlugButtonContainer";
import Curtain from "../common/Curtain";

const StyledHome = styled.div`
  padding-top: 1rem;
  padding-left: 1rem;
  padding-right: 1rem;
  display: ${props => (props.performanceReady ? "flex" : "none")};
  overflow: auto;
  justify-content: center;
  flex-grow: 1;
`;

const MainContentWrapper = styled.div`
  width: 100%;
  max-width: 848px;
`;

class ChannelViewer extends Component {
  render() {
    const {
      agoraClient,
      channelName,
      currentPerformer,
      joinedMidPerformance,
      nextPerformer,
      performanceEnd,
      performanceReady,
      reactionTimeout,
      viewerCount
    } = this.props;

    return (
      <Fragment>
        {!performanceReady && <Curtain loading viewer />}

        <StyledHome performanceReady={performanceReady}>
          <MainContentWrapper>
            <TopInfoBar
              viewerCount={viewerCount}
              nextPerformer={nextPerformer}
              performanceEnd={performanceEnd}
              channelName={channelName}
            />
            <div style={{ position: "relative", paddingTop: "56.25%" }}>
              <RemoteVideoContainer
                agoraClient={agoraClient}
                joinedMidPerformance={joinedMidPerformance}
              />
              <PullThePlugButtonContainer />
            </div>
            <ReactionPanel
              channelName={channelName}
              reactionTimeout={reactionTimeout}
            />
          </MainContentWrapper>

          {currentPerformer.allowPerformerMessages && (
            <PerformerChat currentPerformer={currentPerformer} />
          )}
        </StyledHome>
      </Fragment>
    );
  }
}

export default ChannelViewer;
