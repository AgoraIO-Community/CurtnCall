import React, { Component } from "react";
import Storage from "@aws-amplify/storage";
import { withRouter } from "react-router-dom";
import moment from "moment";
import ContentLoader from "react-content-loader";

class PerformanceItem extends Component {
  state = { imageLoaded: false, picture: null };
  componentDidMount = async () => {
    const { _id } = this.props;
    // let picture = "https://dummyimage.com/302x171/000/fff";
    let picture;

    try {
      picture = await Storage.get(`${_id}.png`, {
        expires: 60
      });

      console.log("picture", picture);
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
    const { renderContentLoader } = this;
    const { imageLoaded, picture } = this.state;
    const { performanceName, _id, timeStarted } = this.props;

    return (
      <div
        onClick={() => this.props.history.push(`/performance/${_id}`)}
        style={{
          cursor: "pointer",
          marginBottom: "1rem"
        }}
      >
        {renderContentLoader()}

        <div
          style={{ textAlign: "center", background: "#22292f", maxHeight: 114 }}
        >
          <img
            src={picture}
            alt={performanceName}
            style={{
              width: "auto",
              maxHeight: 114,
              height: "100%",
              display: imageLoaded ? "inline" : "none"
            }}
            onLoad={this.handleImageLoaded}
          />
        </div>

        <div style={{ paddingTop: "1rem", paddingBottom: "1rem" }}>
          <b>{performanceName}</b>
        </div>
        <span style={{ color: "rgba(0, 0, 0, 0.5)" }}>
          {moment(timeStarted).fromNow()}
        </span>
      </div>
    );
  }
}

export default withRouter(PerformanceItem);
