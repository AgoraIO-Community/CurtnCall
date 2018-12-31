import React, { Component, Fragment } from "react";
import { Col } from "styled-bootstrap-grid";
import styled from "styled-components";
import { capitalize } from "../utility";

const Statistic = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  max-width: auto;
`;

const StatisticValue = styled.div`
  font-size: 4rem;
`;

const StatisticLabel = styled.div``;

export default class Totals extends Component {
  render() {
    const { loading, totals } = this.props;

    return (
      <Fragment>
        {totals.map((item, i) => {
          const { type, total } = item;
          return (
            <Col md="3" key={type}>
              <div
                style={{
                  border: "1px solid rgba(0,0,0, 0.25)",
                  padding: "2rem"
                }}
              >
                <Statistic>
                  <StatisticValue>{loading ? 0 : total}</StatisticValue>
                  <StatisticLabel>{capitalize(type)}</StatisticLabel>
                </Statistic>
              </div>
            </Col>
          );
        })}
      </Fragment>
    );
  }
}
