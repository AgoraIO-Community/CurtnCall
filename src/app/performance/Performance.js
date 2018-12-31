import React, { Component, Fragment } from "react";
import ReactionChart from "./ReactionChart";
import ReactPlayer from "react-player";
import { Container, Row, Col } from "styled-bootstrap-grid";
import {
  OffPageWrapper,
  Segment,
  SegmentHeader,
  SegmentHeaderText,
  Button
} from "../common/styled-components/general";
import styled from "styled-components";
import { getStatTitle } from "../utility";
import PictureLabel from "../common/PictureLabel";
import { withRouter } from "react-router-dom";
import moment from "moment";
import StateMapWrapper from "../common/StateMapWrapper";
import { withApollo } from "react-apollo";
import { updatePerformance } from "./graphql";
import Checkbox from "../common/Checkbox";
import PageHeader from "../common/PageHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const StyledVideoWrapper = styled.div`
  position: relative;
  padding-top: 56.25%; /* Player ratio: 100 / (1280 / 720) */
`;

const InfoWrapper = styled.div`
  background: ${props => props.theme.color.blue};
  text-align: center;
  padding: 1rem;
  color: white;
  font-weight: 600;
  margin-top: 1rem;
`;

const LeaderTable = styled.table`
  border-spacing: 0;
  width: 100%;
`;

const LeaderTableRow = styled.tr`
  background: white;
  & > td {
    padding: 1rem;
    border-bottom: ${props =>
      props.lastRow ? "none" : "1px solid rgba(0,0,0, 0.1)"};
  }
`;

const LeaderboardHeaderIcon = styled.i`
  display: inline-block;
  height: 2rem;
  width: 2rem;
  margin: 0 0.0665em 0 0.133em;
  vertical-align: middle;
  background-size: 2rem 2rem;
  background-repeat: no-repeat;
  background-position: center center;
`;

class Performance extends Component {
  state = {
    performanceStarted: false,
    performancePlaying: false,
    performancePaused: false,
    performanceBuffering: false,
    performanceCompleted: false,
    performanceSeeked: false,
    performanceElapsed: 0
  };

  handlePerformancePlayer = event => {
    const currentPosition = this.player.getCurrentTime();
    switch (event) {
      case "play":
        let performancePaused, performanceCompleted, performanceElapsed;

        if (currentPosition !== 0) {
          performanceElapsed = Math.floor(currentPosition);
          this.player.seekTo(Math.floor(currentPosition));
        } else {
          performanceElapsed = 0;
        }

        if (this.state.performancePaused) {
          performancePaused = false;
        }

        if (this.state.performanceCompleted) {
          performanceCompleted = false;
        }

        this.setState({
          performancePlaying: true,
          performancePaused,
          performanceCompleted,
          performanceElapsed
        });

        break;
      case "pause":
        this.setState({
          performancePlaying: false,
          performancePaused: true,
          performanceElapsed: Math.floor(this.player.getCurrentTime())
        });
        break;
      default:
        break;
    }
  };

  ref = player => {
    this.player = player;
  };

  render() {
    const {
      currentUser,
      humanizedDuration,
      performanceId,
      performanceLink,
      performanceName,
      performer,
      performancePrivate,
      reactionTimeArrays,
      refetch,
      show,
      stateCounts,
      stats: { performanceStats, reactionStats },
      timeStarted,
      viewers,
      viewerTimeArray
    } = this.props;

    const {
      performancePlaying,
      performancePaused,
      performanceElapsed
    } = this.state;

    const { handlePerformancePlayer } = this;

    return (
      <OffPageWrapper>
        <Container>
          <PageHeader title={performanceName} />

          <Row style={{ display: "flex" }}>
            <Col lg="6" style={{ marginBottom: "2rem" }}>
              <Segment>
                <SegmentHeader>
                  <SegmentHeaderText>Performance</SegmentHeaderText>
                </SegmentHeader>
                <div style={{ padding: "2rem" }}>
                  {performancePrivate && !currentUser ? (
                    <div style={{ padding: "2rem", textAlign: "center" }}>
                      <div>
                        <i className="twa twa-lock twa-10x" />
                      </div>
                      <h3>Private</h3>
                      The performer has chosen to make this performance private
                    </div>
                  ) : (
                    <Fragment>
                      <StyledVideoWrapper>
                        <ReactPlayer
                          height="100%"
                          width="100%"
                          onPause={() => handlePerformancePlayer("pause")}
                          onPlay={() => handlePerformancePlayer("play")}
                          url={performanceLink}
                          controls
                          style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            background: "#22292f"
                          }}
                          ref={this.ref}
                        />
                      </StyledVideoWrapper>
                      {reactionTimeArrays.length > 0 ? (
                        <InfoWrapper>
                          Play and watch the reaction chart update in real-time!
                        </InfoWrapper>
                      ) : null}
                    </Fragment>
                  )}
                  {currentUser && (
                    <div style={{ marginTop: "1rem" }}>
                      <Checkbox
                        checked={performancePrivate}
                        label="Performance Only Visible To Me?"
                        onChange={async () => {
                          const { client } = this.props;

                          await client.mutate({
                            mutation: updatePerformance,
                            variables: {
                              input: {
                                performanceId,
                                performancePrivate: !performancePrivate
                              }
                            }
                          });

                          refetch();
                        }}
                      />
                    </div>
                  )}
                </div>
              </Segment>
            </Col>
            <Col lg="6" style={{ marginBottom: "2rem" }}>
              <Segment style={{ height: "100%" }}>
                <SegmentHeader style={{ borderBottom: "1px solid white" }}>
                  <SegmentHeaderText>Reaction Chart</SegmentHeaderText>
                </SegmentHeader>

                {viewers > 0 ? (
                  <ReactionChart
                    reactionTimeArrays={reactionTimeArrays}
                    viewerTimeArray={viewerTimeArray}
                    width={540}
                    height={391}
                    margin={{ top: 25, right: 70, bottom: 50, left: 70 }}
                    performancePlaying={performancePlaying}
                    performancePaused={performancePaused}
                    performanceElapsed={performanceElapsed}
                  />
                ) : (
                  <div style={{ padding: "2rem", textAlign: "center" }}>
                    <div>
                      <i className="twa twa-viewerScore twa-10x" />
                    </div>
                    <h3>Dang!</h3>
                    This performance did not have any viewers.
                  </div>
                )}
              </Segment>
            </Col>
          </Row>
          <Row>
            <Col lg="6">
              <Segment style={{ marginBottom: "1rem" }}>
                <SegmentHeader>
                  <SegmentHeaderText>Performance Info</SegmentHeaderText>
                </SegmentHeader>
                <div>
                  <LeaderTable>
                    <tbody>
                      <LeaderTableRow>
                        <td
                          style={{
                            borderRight: "1px solid rgba(0,0,0, 0.1)"
                          }}
                        >
                          Performer
                        </td>
                        <td>
                          <div
                            onClick={() => {
                              this.props.history.push(`/user/${performer._id}`);
                            }}
                          >
                            <PictureLabel
                              picture={performer.picture}
                              color="darkGrey"
                            >
                              {performer.name}
                            </PictureLabel>
                          </div>
                        </td>
                      </LeaderTableRow>
                      <LeaderTableRow>
                        <td
                          style={{
                            borderRight: "1px solid rgba(0,0,0, 0.1)"
                          }}
                        >
                          Duration
                        </td>
                        <td>{humanizedDuration}</td>
                      </LeaderTableRow>
                      <LeaderTableRow>
                        <td
                          style={{
                            borderRight: "1px solid rgba(0,0,0, 0.1)"
                          }}
                        >
                          Date
                        </td>
                        <td>{moment(timeStarted).format("MMMM D, YYYY")}</td>
                      </LeaderTableRow>
                      <LeaderTableRow>
                        <td
                          style={{
                            borderRight: "1px solid rgba(0,0,0, 0.1)"
                          }}
                        >
                          Time
                        </td>
                        <td>{moment(timeStarted).format("h:mm A")}</td>
                      </LeaderTableRow>
                      {show && (
                        <LeaderTableRow
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            this.props.history.push(`/show/${show._id}`);
                          }}
                        >
                          <td
                            style={{
                              borderRight: "1px solid rgba(0,0,0, 0.1)"
                            }}
                          >
                            Show
                          </td>
                          <td>{show.showName}</td>
                        </LeaderTableRow>
                      )}
                    </tbody>
                  </LeaderTable>
                </div>
              </Segment>
              <Segment style={{ marginBottom: "1rem" }}>
                <SegmentHeader>
                  <SegmentHeaderText>
                    Performance Stats and Ranks
                  </SegmentHeaderText>
                </SegmentHeader>
                <div>
                  <LeaderTable>
                    <tbody>
                      {performanceStats.map((stat, i) => {
                        const { category, value, rank } = stat;
                        return (
                          <LeaderTableRow key={category}>
                            <td
                              style={{
                                borderRight: "1px solid rgba(0,0,0, 0.1)"
                              }}
                            >
                              <LeaderboardHeaderIcon
                                className={`twa-${category}`}
                              />{" "}
                              {getStatTitle(category)}
                            </td>
                            <td
                              style={{
                                borderRight: "1px solid rgba(0,0,0, 0.1)"
                              }}
                            >
                              {value}
                            </td>
                            <td>{rank}</td>
                          </LeaderTableRow>
                        );
                      })}
                    </tbody>
                  </LeaderTable>
                </div>
              </Segment>
            </Col>
            <Col lg="6">
              <Segment style={{ marginBottom: "1rem" }}>
                <SegmentHeader>
                  <SegmentHeaderText>Reaction Stats</SegmentHeaderText>
                </SegmentHeader>
                <div>
                  <LeaderTable>
                    <tbody>
                      {reactionStats.map((stat, i) => {
                        const { category, value, rank } = stat;
                        return (
                          <LeaderTableRow key={category}>
                            <td
                              style={{
                                borderRight: "1px solid rgba(0,0,0, 0.1)"
                              }}
                            >
                              <LeaderboardHeaderIcon
                                className={`twa-${category}`}
                              />{" "}
                              {getStatTitle(category)}
                            </td>
                            <td
                              style={{
                                borderRight: "1px solid rgba(0,0,0, 0.1)"
                              }}
                            >
                              {value}
                            </td>
                            <td>{rank}</td>
                          </LeaderTableRow>
                        );
                      })}
                    </tbody>
                  </LeaderTable>
                </div>
              </Segment>
            </Col>
            {stateCounts.length ? (
              <Col lg="9">
                <StateMapWrapper stateCounts={stateCounts} />
              </Col>
            ) : null}
          </Row>
          <Row>
            <Col col={12}>
              <Button
                style={{ backgroundColor: "#3b5998", border: 0 }}
                onClick={() => {
                  window.FB.ui({
                    method: "share",
                    mobile_iframe: true,
                    href: `https://curtncall.com/performance/${performanceId}`
                  });
                }}
              >
                <FontAwesomeIcon icon={["fab", "facebook-square"]} /> Share
                Performance on Facebook
              </Button>
            </Col>
          </Row>
        </Container>
      </OffPageWrapper>
    );
  }
}

export default withApollo(withRouter(Performance));
