import React, { Component } from "react";
import styled from "styled-components";
import ReactGA from "react-ga";
import { withApollo } from "react-apollo";
import AgoraRTC from "agora-rtc-sdk";
// eslint-disable-next-line
import clientjs from "clientjs";

import { getChannel, startChannel } from "./graphql";
import { getAwsUsername, handleIotSubscription } from "../utility";

import ChannelViewerContainer from "./ChannelViewerContainer";
import PerformerSidebarContainer from "./PerformerSidebarContainer";
import Curtain from "../common/Curtain";
import {
  createAgoraClient,
  establishAgora,
  leaveAgoraChannel,
  joinAgoraChannel
} from "./agora";
import CurrentPerformerContainer from "./CurrentPerformerContainer";
import VotingContainer from "./VotingContainer";
import PostPerformanceContainer from "./PostPerformanceContainer";
import ChannelViewerPulledPlugContainer from "./ChannelViewerPulledPlugContainer";
import PerformanceUploadAlertContainer from "./PerformanceUploadAlertContainer";
import CountdownTimeContainer from "./CountdownTimeContainer";

const StyledHomeWrapper = styled.div`
  display: ${props => (props.performanceReady ? "initial" : "flex")};
  flex-grow: 1;
  background-color: ${props =>
    props.performanceReady ? props.theme.color.black : "inherit"};
`;

class Home extends Component {
  state = { loading: true, performanceReady: false, errorMessages: [] };

  iotSubscription = null;
  agoraId = null;
  agoraAccessToken = null;
  agoraRecordingId = null;
  agoraRecordingAccessToken = null;
  channelReady = false;
  joinedMidPerformance = false;
  isMobile = false;
  agoraRecordingClient = null;

  componentDidMount = async () => {
    try {
      if (process.env.NODE_ENV === "production") {
        ReactGA.pageview("/");
      }
      const {
        client,
        channelName,
        setChannel,
        iotId,
        loginService,
        setChannelReady
      } = this.props;

      this.iotSubscription = await handleIotSubscription(iotId, channelName);

      const fingerprintClient = new ClientJS(); // eslint-disable-line no-undef
      const fingerprint = fingerprintClient.getFingerprint();
      const isChrome = fingerprintClient.isChrome();
      this.isMobile = fingerprintClient.isMobile();

      if (!isChrome) {
        import("sweetalert").then(swal => {
          swal.default(
            "Ut oh!",
            "You must use the Google Chrome browser to perform or watch performances on CurtnCall",
            "error"
          );
        });

        const { errorMessages } = this.state;

        errorMessages.push(
          "Please visit CurtnCall with the Google Chrome browser"
        );

        this.setState({ errorMessages, loading: false });

        return;
      }

      const { data } = await client.query({
        query: getChannel,
        variables: { channelName, fingerprint },
        fetchPolicy: "network-only"
      });
      const clientTime = Date.now(); //for setting client/server delta

      // if (data.getChannel.fingerprintExists) {
      //   import("sweetalert").then(swal => {
      //     swal.default(
      //       "Ut oh!",
      //       "You already have CurtnCall open on another browser window, or you have already logged into CurtnCall on another browser on another device",
      //       "error"
      //     );
      //   });

      //   const { errorMessages } = this.state;

      //   errorMessages.push("You already have CurtnCall open on another window.");

      //   this.setState({ errorMessages, loading: false });

      //   return;
      // }

      setChannel(data.getChannel, clientTime);

      AgoraRTC.Logger.setLogLevel(AgoraRTC.Logger.NONE);

      const username = await getAwsUsername();

      let variables = {
        channelName,
        iotId,
        fingerprint
      };

      if (loginService === "cognito") {
        variables["username"] = username;
      }

      let {
        data: {
          startChannel: {
            agoraId,
            agoraAccessToken,
            agoraRecordingId,
            agoraRecordingAccessToken
          }
        }
      } = await client.mutate({
        mutation: startChannel,
        variables
      });

      this.agoraId = Number(agoraId);
      this.agoraAccessToken = agoraAccessToken;

      this.agoraRecordingId = Number(agoraRecordingId);
      this.agoraRecordingAccessToken = agoraRecordingAccessToken;

      const agoraClient = await establishAgora(channelName);

      //check to see if there is a performance going on
      //if so, this user needs to join the channel so they can get
      //the agora stream

      if (data.getChannel.performanceReady) {
        await joinAgoraChannel(
          agoraClient,
          channelName,
          agoraAccessToken,
          Number(agoraId)
        );

        this.channelReady = true;
        this.joinedMidPerformance = true;
      }

      setChannelReady(true);

      this.setState({ loading: false });
    } catch (error) {
      console.log("error", error);
      console.log("Home component - componentDidMount");
    }
  };

  componentDidUpdate = async prevProps => {
    //clean up the performance vote after the voting session has ended
    try {
      if (prevProps.channelSegment !== this.props.channelSegment) {
        if (this.props.channelSegment === "performance") {
          const {
            agoraClient,
            channelName,
            userIsCurrentPerformer
          } = this.props;

          if (agoraClient) {
            await joinAgoraChannel(
              agoraClient,
              channelName,
              this.agoraAccessToken,
              this.agoraId
            );

            if (userIsCurrentPerformer) {
              this.agoraRecordingClient = await createAgoraClient(
                process.env.REACT_APP_AGORA_APP_ID
              );

              await joinAgoraChannel(
                this.agoraRecordingClient,
                channelName,
                this.agoraRecordingAccessToken,
                this.agoraRecordingId
              );
            }

            this.channelReady = true;

            this.forceUpdate();
          }
        }

        if (this.props.channelSegment === "voting") {
          const { agoraClient } = this.props;

          if (agoraClient) {
            await leaveAgoraChannel(agoraClient);
          }

          if (this.agoraRecordingClient) {
            await leaveAgoraChannel(this.agoraRecordingClient);
          }

          this.channelReady = false;
          this.setState({ performanceReady: false });
        }
      }
    } catch (error) {
      console.log("error", error);
      console.log("Home - componentDidUpdate");
    }
  };

  shouldComponentUpdate = nextProps => {
    if (
      nextProps.userIsCurrentPerformer !== this.props.userIsCurrentPerformer
    ) {
      return false;
    }

    if (
      nextProps.userIsPreviousPerformer !== this.props.userIsPreviousPerformer
    ) {
      return false;
    }

    return true;
  };

  componentWillUnmount = async () => {
    try {
      const {
        agoraClient,
        iotClient,
        channelName,
        iotId,
        resetDelta,
        setChannelReady
      } = this.props;

      resetDelta(); //set delta to null to set new value on return

      setChannelReady(false);

      if (agoraClient && this.channelReady) {
        await leaveAgoraChannel(agoraClient);
      }

      if (this.iotSubscription) {
        this.iotSubscription.disconnect();
      }
    } catch (error) {
      console.log("error", error);
      console.log("Home - componentWillUnmount");
    }
  };

  renderChannelView = () => {
    const {
      channelSegment,
      userIsCurrentPerformer,
      userIsPreviousPerformer,
      localStream,
      viewerStream,
      viewerPulledPlug
    } = this.props;

    if (viewerPulledPlug) {
      return <ChannelViewerPulledPlugContainer />;
    }

    if (channelSegment === "performance") {
      if (userIsCurrentPerformer) {
        if (localStream && this.channelReady) {
          return (
            <CurrentPerformerContainer
              performanceReadyCallback={this.performanceReadyCallback}
              isMobile={this.isMobile}
              agoraRecordingClient={this.agoraRecordingClient}
            />
          );
        } else {
          return <Curtain loading performer />;
        }
      }

      if (viewerStream && this.channelReady) {
        return (
          <ChannelViewerContainer
            joinedMidPerformance={this.joinedMidPerformance}
          />
        );
      } else {
        return <Curtain loading viewer />;
      }
    }

    if (channelSegment === "voting") {
      if (userIsPreviousPerformer) {
        return <PostPerformanceContainer />;
      } else {
        return <VotingContainer />;
      }
    }

    return <Curtain show={this.props.show} setShow={this.props.setShow} />;
  };

  performanceReadyCallback = () => {
    this.setState({ performanceReady: true });
  };

  render() {
    const { renderChannelView } = this;
    const { errorMessages, loading, performanceReady } = this.state;
    const { performanceUploadProgress, show, setShow } = this.props;

    if (loading) {
      return <Curtain loading />;
    }

    if (errorMessages.length > 0) {
      console.log("errorMessages", errorMessages);
      return <Curtain errorMessages={errorMessages} />;
    }

    return (
      <StyledHomeWrapper performanceReady={performanceReady}>
        {show && (
          <div style={{ display: "none" }}>
            <CountdownTimeContainer
              endTimestamp={show.showEnd}
              onComplete={() => {
                setShow(null);
              }}
            />
          </div>
        )}
        <PerformerSidebarContainer />
        {renderChannelView()}
        <PerformanceUploadAlertContainer
          performanceUploadProgress={performanceUploadProgress}
        />
      </StyledHomeWrapper>
    );
  }
}

export default withApollo(Home);
