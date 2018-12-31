import React, { Component } from "react";
import Leaderboard from "./Leaderboard";
import { OffPageWrapper } from "../common/styled-components/general";
import { Container, Row, Col } from "styled-bootstrap-grid";
import ReactGA from "react-ga";
import PageHeader from "../common/PageHeader";

class Stats extends Component {
  componentDidMount = () => {
    if (process.env.NODE_ENV === "production") {
      ReactGA.pageview("/stats");
    }
  };

  render() {
    const { performerLeaderboards, viewerLeaderboards } = this.props;

    return (
      <OffPageWrapper>
        <Container>
          <PageHeader title={"Performer Stat Leaders"} />
          <Row>
            {performerLeaderboards.map((leaderboard, i) => {
              return (
                <Col
                  lg="4"
                  md="6"
                  style={{ marginBottom: "2rem" }}
                  key={leaderboard.category}
                >
                  <Leaderboard data={leaderboard} />
                </Col>
              );
            })}
          </Row>
          <PageHeader title={"Viewer Stat Leaders"} />
          <Row>
            {viewerLeaderboards.map((leaderboard, i) => {
              return (
                <Col
                  lg="4"
                  md="6"
                  style={{ marginBottom: "2rem" }}
                  key={leaderboard.category}
                >
                  <Leaderboard data={leaderboard} />
                </Col>
              );
            })}
          </Row>
        </Container>
      </OffPageWrapper>
    );
  }
}

export default Stats;
