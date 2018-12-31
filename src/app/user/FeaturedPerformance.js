import React, { Component } from "react";
import Storage from "@aws-amplify/storage";
import { withRouter } from "react-router-dom";
import { Container, Col, Row } from "styled-bootstrap-grid";
import styled from "styled-components";
import { getStatTitle } from "../utility";
import ContentLoader from "react-content-loader";

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

class FeaturedPerformance extends Component {
  state = { picture: null, imageLoaded: false };

  componentDidMount = async () => {
    const { _id } = this.props;
    let picture;
    // let picture = "https://dummyimage.com/302x171/000/fff";

    try {
      picture = await Storage.get(`${_id}.png`, {
        expires: 60
      });
    } catch (error) {
      console.log("error", error);
    }

    this.setState({ picture });
  };

  handleImageLoaded = () => {
    this.setState({ imageLoaded: true });
  };

  renderContentLoader = () => {
    const { imageLoaded, picture } = this.state;

    if (!imageLoaded || !picture) {
      return (
        <ContentLoader
          width={636}
          height={360}
          speed={2}
          primaryColor="#f3f3f3"
          secondaryColor="#ecebeb"
        >
          <rect x="0" y="0" rx="0" ry="0" width="636" height="360" />
        </ContentLoader>
      );
    }

    return null;
  };

  render() {
    const { handleImageLoaded, renderContentLoader } = this;
    const { imageLoaded, picture } = this.state;
    const { money, viewers, _id, performanceName } = this.props;
    return (
      <Container
        style={{ cursor: "pointer" }}
        onClick={() => this.props.history.push(`/performance/${_id}`)}
      >
        <Row>
          <Col sm={6}>
            <div style={{ padding: "1rem" }}>
              {renderContentLoader()}

              <div
                style={{
                  textAlign: "center",
                  background: "#22292f",
                  maxHeight: 171.5
                }}
              >
                <img
                  src={picture}
                  alt=""
                  style={{
                    width: "auto",
                    maxHeight: 171.5,
                    height: "100%",
                    display: imageLoaded ? "inline" : "none"
                  }}
                  onLoad={handleImageLoaded}
                />
              </div>
            </div>
          </Col>
          <Col sm={6}>
            <div style={{ padding: "1rem" }}>
              <b>{performanceName}</b>
              <LeaderTable>
                <tbody>
                  <LeaderTableRow>
                    <td style={{ borderRight: "1px solid rgba(0,0,0, 0.1)" }}>
                      <LeaderboardHeaderIcon className={`twa-money`} />{" "}
                      {getStatTitle("money")}
                    </td>
                    <td>{money}</td>
                  </LeaderTableRow>
                  <LeaderTableRow>
                    <td style={{ borderRight: "1px solid rgba(0,0,0, 0.1)" }}>
                      <LeaderboardHeaderIcon className={`twa-viewers`} />{" "}
                      {getStatTitle("viewers")}
                    </td>
                    <td>{viewers}</td>
                  </LeaderTableRow>
                </tbody>
              </LeaderTable>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default withRouter(FeaturedPerformance);
