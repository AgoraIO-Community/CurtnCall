import React, { Component } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tooltip } from "react-lightweight-tooltip";
import { withRouter } from "react-router-dom";
import { getStatTitle, getHumanizedHourDuration } from "../utility";

const StyledLeaderboard = styled.div`
  height: auto;
  width: 100%;
  box-shadow: 0 7px 30px rgba(62, 9, 11, 0.3);
`;

const LeaderboardHeader = styled.div`
  background: ${props => props.theme.color.black};
  padding: 1rem;
`;

const LeaderboardHeaderText = styled.span`
  font-size: 18px;
  color: #e1e1e1;
  padding: 0.5rem;
  font-weight: 600;
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

const LeaderTable = styled.table`
  border-spacing: 0;
`;

const LeaderTableRow = styled.tr`
  background: white;
  cursor: pointer;
  & > td {
    padding: 1rem;
    border-bottom: ${props =>
      props.lastRow ? "none" : "1px solid rgba(0,0,0, 0.1)"};
  }
`;

const LeaderTableItemNameAndPictureCell = styled.td`
  width: 100%;
`;

const LeaderName = styled.span`
  margin-left: 0.25rem;
`;

const LeaderImage = styled.img`
  height: 2rem;
  width: 2rem;
  border-radius: 50%;
  vertical-align: middle;
`;

class Leaderboard extends Component {
  render() {
    const { leaders, category, description } = this.props.data;

    return (
      <StyledLeaderboard>
        <LeaderboardHeader>
          <LeaderboardHeaderIcon className={`twa-${category}`} />

          <LeaderboardHeaderText>
            {getStatTitle(category)}
            {category.includes("Time") && (
              <span style={{ fontSize: "0.75rem" }}> (hrs)</span>
            )}
          </LeaderboardHeaderText>

          <div style={{ float: "right" }}>
            <Tooltip
              styles={{
                wrapper: { cursor: "default" },
                tooltip: {
                  background: "#2779bd",
                  paddingLeft: "1rem",
                  paddingRight: "1rem"
                },
                content: {
                  background: "#2779bd",
                  color: "white"
                },
                arrow: { borderTop: "solid #2779bd 5px" }
              }}
              content={[
                <div
                  style={{
                    textAlign: "left",
                    lineHeight: "1rem",
                    fontWeight: 700
                  }}
                  key={description}
                >
                  {description}
                </div>
              ]}
              children={
                <FontAwesomeIcon
                  icon={["fal", "info-circle"]}
                  style={{
                    color: "white",
                    float: "right",
                    marginTop: "0.5rem"
                  }}
                />
              }
            />
          </div>
        </LeaderboardHeader>

        <LeaderTable>
          <tbody>
            {leaders.map((leader, i) => {
              const { name, value, curtnCallId, picture } = leader;
              const lastRow = i + 1 === leaders.length;
              return (
                <LeaderTableRow
                  key={name + value}
                  lastRow={lastRow}
                  onClick={() =>
                    this.props.history.push(`/user/${curtnCallId}`)
                  }
                >
                  <td>{i + 1}</td>
                  <LeaderTableItemNameAndPictureCell>
                    <LeaderImage src={picture} />
                    <LeaderName>{name}</LeaderName>
                  </LeaderTableItemNameAndPictureCell>
                  <td>
                    {category.includes("Time")
                      ? getHumanizedHourDuration(value)
                      : value}
                  </td>
                </LeaderTableRow>
              );
            })}
          </tbody>
        </LeaderTable>
      </StyledLeaderboard>
    );
  }
}

export default withRouter(Leaderboard);
