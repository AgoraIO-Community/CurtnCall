import React, { Component } from "react";
import { Container, Row, Col } from "styled-bootstrap-grid";
import styled from "styled-components";
import { OffPageWrapper } from "../common/styled-components/general";
import PerformanceItem from "./PerformanceItem";
import FeaturedPerformance from "./FeaturedPerformance";
import Achievement from "../common/Achievement";
import Trophy from "../common/Trophy";
import { getHumanizedHourDuration, getStatTitle } from "../utility";
import moment from "moment";
import SocialMediaUser from "./SocialMediaUser";
import StateMapWrapper from "../common/StateMapWrapper";
import {
  Segment,
  SegmentHeader,
  SegmentHeaderText
} from "../common/styled-components/general";
import UserImage from "./UserImage";

const UserImageWrapper = styled.div`
  height: 200px;
  width: 200px;
  border: 5px solid white;
  outline: 5px solid ${props => props.theme.color.black};
`;

const StatTable = styled.table`
  border-spacing: 0;
  width: 100%;
  table-layout: fixed;
`;

const StatTableRow = styled.tr`
  background: white;
  & > td {
    padding: 0.75rem;
    border-bottom: ${props =>
      props.lastRow ? "none" : "1px solid rgba(0,0,0, 0.1)"};
  }
`;

const StatTableHeaderIcon = styled.i`
  display: inline-block;
  height: 2rem;
  width: 2rem;
  margin: 0 0.0665em 0 0.133em;
  vertical-align: middle;
  background-size: 2rem 2rem;
  background-repeat: no-repeat;
  background-position: center center;
`;

class User extends Component {
  state = { showPerformerStats: true };

  render() {
    const {
      achievements,
      currentUser,
      featuredPerformance,
      name,
      performances,
      picture,
      refetch,
      socialMedia,
      stateCounts,
      stats,
      timeCreated,
      trophies
    } = this.props;

    const { showPerformerStats } = this.state;
    let statsArrayToLoop;

    if (showPerformerStats) {
      statsArrayToLoop = "performerStats";
    } else {
      statsArrayToLoop = "viewerStats";
    }

    return (
      <OffPageWrapper>
        <Container>
          <Row>
            <Col
              lg={4}
              style={{
                textAlign: "center",
                marginBottom: "1rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <UserImageWrapper>
                <UserImage picture={picture} />
              </UserImageWrapper>
            </Col>
            <Col lg={8} style={{ marginBottom: "1rem" }}>
              <Segment style={{ height: "100%" }}>
                <SegmentHeader>
                  <SegmentHeaderText>Featured Performance</SegmentHeaderText>
                </SegmentHeader>
                {featuredPerformance ? (
                  <FeaturedPerformance {...featuredPerformance} />
                ) : (
                  <div style={{ padding: "1rem" }}>
                    This user has not yet performed
                  </div>
                )}
              </Segment>
            </Col>
          </Row>
          <Row>
            <Col lg={4}>
              <Segment style={{ marginBottom: "1rem" }}>
                <SegmentHeader>
                  <SegmentHeaderText>User Info</SegmentHeaderText>
                </SegmentHeader>
                <StatTable>
                  <tbody>
                    <StatTableRow>
                      <td>{name}</td>
                    </StatTableRow>
                    <StatTableRow>
                      <td>
                        Joined {moment(timeCreated).format("MMMM D, YYYY")}
                      </td>
                    </StatTableRow>
                    {socialMedia.length === 0 && !currentUser ? null : (
                      <StatTableRow>
                        <td>
                          <SocialMediaUser
                            socialMedia={socialMedia}
                            currentUser={currentUser}
                            refetch={refetch}
                          />
                        </td>
                      </StatTableRow>
                    )}
                  </tbody>
                </StatTable>
              </Segment>

              <Segment style={{ marginBottom: "1rem" }}>
                <SegmentHeader>
                  <SegmentHeaderText>
                    Stats and Ranks
                    <div style={{ float: "right", marginTop: "-0.5rem" }}>
                      <input
                        className="tgl tgl-flip"
                        id="cb5"
                        type="checkbox"
                      />
                      <label
                        className="tgl-btn"
                        data-tg-off="Performer"
                        data-tg-on="Viewer"
                        htmlFor="cb5"
                        onClick={() => {
                          this.setState(({ showPerformerStats }) => ({
                            showPerformerStats: !showPerformerStats
                          }));
                        }}
                      />
                    </div>
                  </SegmentHeaderText>
                </SegmentHeader>
                <StatTable>
                  <tbody>
                    {stats[`${statsArrayToLoop}`].map((stat, i) => {
                      const { category, rank, value } = stat;
                      return (
                        <StatTableRow key={category}>
                          <td
                            style={{
                              borderRight: "1px solid rgba(0,0,0, 0.1)",
                              width: "64%"
                            }}
                          >
                            <StatTableHeaderIcon
                              className={`twa-${category}`}
                            />{" "}
                            {getStatTitle(category)}
                            {category.includes("Time") && (
                              <span style={{ fontSize: "0.75rem" }}>
                                {" "}
                                (hrs)
                              </span>
                            )}
                          </td>
                          <td
                            style={{
                              borderRight: "1px solid rgba(0,0,0, 0.1)",
                              width: "18%",
                              textAlign: "center"
                            }}
                          >
                            {category.includes("Time")
                              ? getHumanizedHourDuration(value)
                              : value}
                          </td>
                          <td style={{ width: "18%", textAlign: "center" }}>
                            {rank}
                          </td>
                        </StatTableRow>
                      );
                    })}
                  </tbody>
                </StatTable>
              </Segment>
            </Col>

            <Col lg={8}>
              {performances.length ? (
                <Segment style={{ marginBottom: "1rem" }}>
                  <SegmentHeader>
                    <SegmentHeaderText>Performances</SegmentHeaderText>
                  </SegmentHeader>
                  <div style={{ padding: "2rem" }}>
                    <Row>
                      {performances.map((performance, i) => {
                        return (
                          <Col xs={6} sm={4} key={performance._id}>
                            <PerformanceItem {...performance} />
                          </Col>
                        );
                      })}
                    </Row>
                  </div>
                </Segment>
              ) : null}

              {stateCounts.length ? (
                <StateMapWrapper stateCounts={stateCounts} />
              ) : null}

              {achievements.length ? (
                <Segment style={{ marginBottom: "1rem" }}>
                  <SegmentHeader>
                    <SegmentHeaderText>Achievements</SegmentHeaderText>
                  </SegmentHeader>
                  <div style={{ padding: "2rem" }}>
                    <Row>
                      {achievements.map((achievement, i) => {
                        const { name, description } = achievement;
                        return (
                          <Col xs={6} sm={4} key={name}>
                            <div style={{ textAlign: "center" }}>
                              <Achievement />
                              <div
                                style={{
                                  paddingTop: "1rem",
                                  paddingBottom: "1rem"
                                }}
                              >
                                <b>{name}</b>
                              </div>
                              <span style={{ color: "rgba(0, 0, 0, 0.5)" }}>
                                {description}
                              </span>
                            </div>
                          </Col>
                        );
                      })}
                    </Row>
                  </div>
                </Segment>
              ) : null}

              {trophies.length ? (
                <Segment style={{ marginBottom: "1rem" }}>
                  <SegmentHeader>
                    <SegmentHeaderText>Trophies</SegmentHeaderText>
                  </SegmentHeader>
                  <div style={{ padding: "2rem" }}>
                    <Row>
                      {trophies.map((trophy, i) => {
                        const { name, description } = trophy;
                        return (
                          <Col xs={6} sm={4} key={name}>
                            <div style={{ textAlign: "center" }}>
                              <Trophy />
                              <div
                                style={{
                                  paddingTop: "1rem",
                                  paddingBottom: "1rem"
                                }}
                              >
                                <b>{name}</b>
                              </div>
                              <span style={{ color: "rgba(0, 0, 0, 0.5)" }}>
                                {description}
                              </span>
                            </div>
                          </Col>
                        );
                      })}
                    </Row>
                  </div>
                </Segment>
              ) : null}
            </Col>
          </Row>
        </Container>
      </OffPageWrapper>
    );
  }
}

export default User;
