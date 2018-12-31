import React, { Component, Fragment } from "react";
import { withApollo } from "react-apollo";
import { sendPerformanceReady, sendTimerExpiredTally } from "./graphql";
import CountdownTimeContainer from "./CountdownTimeContainer";
import StopPerformerButtonContainer from "./StopPerformerButtonContainer";
import PerformerVideoContainer from "./PerformerVideoContainer";
import styled from "styled-components";
import PerformerMessagesContainer from "./PerformerMessagesContainer";
import ReactionCountsTable from "./ReactionCountsTable";
import CurrentPerformerViewers from "./CurrentPerformerViewers";
// import CurrentPerformerViewerLocations from "./CurrentPerformerViewerLocations";
import { Container, Row, Col } from "styled-bootstrap-grid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Curtain from "../common/Curtain";
import { ButtonGroup, FlatButton } from "../common/styled-components/general";
import RemoteRecordStream from "./RemoteRecordStream";
import { getRandomInt } from "../utility";

const Title = styled.div`
  color: white;
  text-align: center;
`;

const GridItem = styled.div`
  text-align: center;
  color: white;
  border: 1px solid white;
  height: 100%;
`;

const GridItemHeader = styled.div`
  padding: 0.75rem;
  border-bottom: 1px solid white;
  font-weight: 600;
`;

class CurrentPerformer extends Component {
  state = {
    camera: this.props.camera,
    microphone: this.props.microphone,
    remoteStream: null
  };

  componentDidMount = async () => {
    const {
      agoraClient,
      agoraRecordingClient,
      localStream,
      client,
      channelName,
      viewerCount
    } = this.props;

    agoraRecordingClient.on("stream-added", evt => {
      const stream = evt.stream;

      agoraRecordingClient.subscribe(stream, err => {
        console.log("Subscribe stream failed", err);
      });
    });

    agoraRecordingClient.on(
      "stream-subscribed",
      ({ stream: { stream: remoteStream } }) => {
        this.setState({ remoteStream });
      }
    );

    if (viewerCount < 1) {
      try {
        await client.mutate({
          mutation: sendPerformanceReady,
          variables: {
            channelName
          }
        });
      } catch (error) {
        console.log("Current Performer - sendPerformanceReady");
        console.log("error", error);
      }
    }

    agoraClient.publish(localStream, function(err) {
      if (err) {
        console.error("Publish stream error!!!!", err);
      }
    });
  };

  componentDidUpdate = async prevProps => {
    if (prevProps.performanceReady !== this.props.performanceReady) {
      const { performanceReadyCallback } = this.props;

      performanceReadyCallback();
    }
  };

  componentWillUnmount = async () => {
    if (window.mediaRecorder) {
      window.mediaRecorder.stop();
    }
  };

  handleSwitchDeviceClick = (type, deviceId) => {
    const { localStream } = this.props;

    localStream.switchDevice(
      type,
      deviceId,
      () => {
        if (type === "audio") {
          this.setState({ microphone: deviceId });
        }

        if (type === "video") {
          this.setState({ camera: deviceId });
        }
      },
      error => {
        console.log("Switch Device", error);
      }
    );
  };

  render() {
    const {
      cameras,
      client,
      channelName,
      currentPerformer,
      isMobile,
      nextPerformer,
      performanceEnd,
      performanceId,
      performanceReady,
      reactionCounts,
      setPerformanceUploadProgress,
      // recordingDevices,
      viewerCount,
      viewers
      // viewerStateCount
    } = this.props;
    const { remoteStream } = this.state;

    if (!performanceReady) {
      return <Curtain loading performer />;
    }

    return (
      <Container>
        <Row>
          <Col style={{ textAlign: "center" }}>
            <Title>
              <h1>You're Live, {currentPerformer.name}!</h1>
            </Title>
          </Col>
        </Row>
        <Row>
          <Col lg={4} lgOrder={2} style={{ marginBottom: "2rem" }}>
            <GridItem>
              <div>
                <PerformerVideoContainer />
                {/* Need the additional remote stream in order to record the video */}
                {remoteStream && (
                  <RemoteRecordStream
                    performanceId={performanceId}
                    remoteStream={remoteStream}
                    setPerformanceUploadProgress={setPerformanceUploadProgress}
                  />
                )}
              </div>
              <GridItemHeader>
                {performanceEnd && (
                  <CountdownTimeContainer
                    endTimestamp={performanceEnd}
                    onComplete={async () => {
                      const easingTimeoutInteger = getRandomInt(1, 500);
                      //do this so all expirations aren't sent out at the same time

                      setTimeout(async () => {
                        try {
                          await client.mutate({
                            mutation: sendTimerExpiredTally,
                            variables: {
                              channelName,
                              channelSegment: "performance"
                            }
                          });
                        } catch (error) {
                          console.log("error", error);
                          console.log(
                            "sendTimerExpiredTally - onComplete Timer CurrentPerformer"
                          );
                        }
                      }, easingTimeoutInteger);
                    }}
                  />
                )}{" "}
                Time Left
              </GridItemHeader>
              <div style={{ padding: "1.5rem" }}>
                {nextPerformer ? (
                  <Fragment>
                    <img
                      src={nextPerformer.picture}
                      style={{ height: "5rem", width: "5rem" }}
                      alt=""
                    />
                    <div style={{ marginTop: "0.25rem", fontSize: "1.25rem" }}>
                      {nextPerformer.name}
                    </div>
                    <span style={{ marginTop: "1rem", fontSize: "0.85rem" }}>
                      Up Next
                    </span>
                  </Fragment>
                ) : (
                  <Fragment>
                    <FontAwesomeIcon
                      icon={["far", "smile"]}
                      size="5x"
                      color="white"
                    />
                    <div style={{ marginTop: "1rem", fontSize: "1.25rem" }}>
                      Thanks for performing!
                    </div>
                  </Fragment>
                )}
              </div>
              <div>
                <StopPerformerButtonContainer />
              </div>
            </GridItem>
          </Col>
          <Col lg={4} lgOrder={1} style={{ marginBottom: "2rem" }}>
            <GridItem>
              <GridItemHeader>
                Total Reactions:{" "}
                {Object.values(reactionCounts).reduce((a, b) => a + b)}
              </GridItemHeader>
              <div>
                <ReactionCountsTable reactionCounts={reactionCounts} />
              </div>
            </GridItem>
          </Col>
          <Col lg={4} lgOrder={3} style={{ marginBottom: "2rem" }}>
            <GridItem>
              <GridItemHeader>Messages</GridItemHeader>
              <PerformerMessagesContainer />
            </GridItem>
          </Col>
          <Col lg={6} lgOrder={5} style={{ marginBottom: "2rem" }}>
            <GridItem>
              <GridItemHeader>Total Viewers: {viewerCount}</GridItemHeader>
              <CurrentPerformerViewers viewers={viewers} />

              {/* <GridItemHeader>Microphone</GridItemHeader>

              <h3>Click to Switch Microphone</h3>

              <ButtonGroup>
                {recordingDevices.map((recordingDevice, i) => {
                  const { deviceId } = recordingDevice;
                  const active = deviceId === this.state.microphone;
                  return (
                    <FlatButton
                      color={active ? "green" : "red"}
                      key={deviceId}
                      onClick={() => {
                        if (active) {
                          return;
                        }

                        this.handleSwitchDeviceClick("audio", deviceId);
                      }}
                      style={{
                        borderTop: "1px solid #22292f",
                        borderBottom: "1px solid #22292f"
                      }}
                    >
                      {recordingDevice.label ? recordingDevice.label : recordingDevice.deviceId}
                    </FlatButton>
                  );
                })}
              </ButtonGroup> */}

              {/* <CurrentPerformerViewerLocations
                isMobile={isMobile}
                viewerStateCount={viewerStateCount}
              /> */}
            </GridItem>
          </Col>

          {!isMobile && (
            <Col lg={6} lgOrder={4} style={{ marginBottom: "2rem" }}>
              <GridItem>
                {/* <GridItemHeader>Total Viewers: {viewerCount}</GridItemHeader>
              <CurrentPerformerViewers viewers={viewers} /> */}

                <GridItemHeader>Cameras</GridItemHeader>
                <h3>Click To Switch Your Camera</h3>

                <ButtonGroup>
                  {cameras.map((camera, i) => {
                    const { deviceId } = camera;
                    const active = deviceId === this.state.camera;
                    return (
                      <FlatButton
                        color={active ? "green" : "red"}
                        key={deviceId}
                        onClick={() => {
                          if (active) {
                            return;
                          }

                          this.handleSwitchDeviceClick("video", deviceId);
                        }}
                        style={{
                          borderTop: "1px solid #22292f",
                          borderBottom: "1px solid #22292f"
                        }}
                      >
                        {camera.label ? camera.label : `Camera ${i + 1}`}
                      </FlatButton>
                    );
                  })}
                </ButtonGroup>
              </GridItem>
            </Col>
          )}
        </Row>
      </Container>
    );
  }
}

export default withApollo(CurrentPerformer);
