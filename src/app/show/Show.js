import React, { Component } from "react";
import { Container, Row, Col } from "styled-bootstrap-grid";
import styled from "styled-components";
import {
  OffPageWrapper,
  Segment,
  SegmentHeader,
  SegmentHeaderText
} from "../common/styled-components/general";
import moment from "moment";
import { getStatTitle } from "../utility";
import PerformanceItem from "../user/PerformanceItem";
import StateMapWrapper from "../common/StateMapWrapper";
import PageHeader from "../common/PageHeader";
import { withRouter } from "react-router-dom";

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

const CardWrapper = styled.div`
  padding: 2rem;
  text-align: center;
`;

const CardImage = styled.img`
  border-radius: 50%;
  max-height: 180px;
  max-width: 180px;
`;

const CardName = styled.div`
  margin: 0.25rem;
  font-weight: 700;
`;

const CardValue = styled.div`
  margin: 0.25rem;
`;

class Show extends Component {
  render() {
    const {
      performances,
      rankedPerformers,
      showNumber,
      showStart,
      stateCounts
    } = this.props;
    const { reactionStats, performanceStats } = this.props.stats;

    return (
      <OffPageWrapper>
        <Container>
          <PageHeader
            title={[
              `Show #${showNumber}`,
              moment(showStart).format("MMMM D, YYYY")
            ]}
          />

          <Row>
            <Col>
              <Segment style={{ marginBottom: "1rem" }}>
                <SegmentHeader>
                  <SegmentHeaderText>Most Money Performers</SegmentHeaderText>
                </SegmentHeader>
                <Row>
                  {rankedPerformers[0].performers.map((rankedPerformer, i) => {
                    return (
                      <Col lg="4" key={rankedPerformer.user.picture}>
                        <CardWrapper
                          onClick={() =>
                            this.props.history.push(
                              `/user/${rankedPerformer.user._id}`
                            )
                          }
                          style={{ cursor: "pointer" }}
                        >
                          <CardImage src={rankedPerformer.user.picture} />
                          <CardName>{rankedPerformer.user.name}</CardName>
                          <CardValue>Money: {rankedPerformer.value}</CardValue>
                        </CardWrapper>
                      </Col>
                    );
                  })}
                </Row>
              </Segment>
            </Col>
          </Row>
          <Row>
            <Col>
              <Segment style={{ marginBottom: "1rem" }}>
                <SegmentHeader>
                  <SegmentHeaderText>Performances</SegmentHeaderText>
                </SegmentHeader>
                <div style={{ padding: "1rem", textAlign: "center" }}>
                  <Row>
                    {performances.map((performance, i) => {
                      return (
                        <Col sm={6} md={4} lg={3} key={performance._id}>
                          <PerformanceItem {...performance} />
                        </Col>
                      );
                    })}
                  </Row>
                </div>
              </Segment>
            </Col>
          </Row>
          <Row>
            <Col lg="6">
              <Segment style={{ marginBottom: "1rem" }}>
                <SegmentHeader>
                  <SegmentHeaderText>Show Stats and Ranks</SegmentHeaderText>
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
              <Col lg="12">
                <StateMapWrapper stateCounts={stateCounts} />
              </Col>
            ) : null}
          </Row>
        </Container>
      </OffPageWrapper>
    );
  }
}

export default withRouter(Show);
