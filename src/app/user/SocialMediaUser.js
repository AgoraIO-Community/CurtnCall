import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { withApollo } from "react-apollo";
import { updateUser } from "./graphql";
import { socialMediaTypes, getSocialMediaColor } from "../utility";
import SocialMediaForm from "./SocialMediaForm";

class SocialMediaUser extends Component {
  state = { editing: false };

  renderEditIcon = () => {
    const { editing } = this.state;
    const { currentUser, refetch } = this.props;

    if (editing && currentUser) {
      return (
        <FontAwesomeIcon
          icon={["fas", "check"]}
          color="#38c172"
          style={{ float: "right", cursor: "pointer" }}
          onClick={async () => {
            const { client } = this.props;

            let input = {};

            socialMediaTypes.forEach(element => {
              const domElement = document.getElementById(
                `${element}-social-media`
              ).value;
              if (domElement) {
                input[`${element}`] = domElement;
              }
            });

            await client.mutate({
              mutation: updateUser,
              variables: {
                input
              }
            });

            refetch();

            this.setState({ editing: false });
          }}
        />
      );
    }

    if (currentUser) {
      return (
        <FontAwesomeIcon
          icon={["far", "edit"]}
          color="#3490dc"
          style={{ float: "right", cursor: "pointer" }}
          onClick={() => this.setState({ editing: true })}
        />
      );
    }
  };

  render() {
    const { renderEditIcon } = this;
    const { socialMedia, currentUser } = this.props;
    const { editing } = this.state;

    return (
      <div>
        <div>
          {socialMedia.length === 0 && currentUser
            ? "Click edit icon to add social media"
            : "Social Media"}
          {renderEditIcon()}
        </div>

        {editing && (
          <div style={{ marginTop: "1rem" }}>
            {socialMediaTypes.map((type, i) => {
              let link = "";

              socialMedia.forEach(element => {
                if (element.type === type) {
                  link = element.link;
                }
              });

              return <SocialMediaForm type={type} link={link} key={type} />;
            })}
          </div>
        )}

        {socialMedia.length > 0 && !editing ? (
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              marginTop: "1rem"
            }}
          >
            {socialMedia.map((item, i) => {
              const { type, link } = item;
              return (
                <a href={link} key={type}>
                  <FontAwesomeIcon
                    icon={["fab", `${type}-square`]}
                    color={getSocialMediaColor(type)}
                    size="2x"
                  />
                </a>
              );
            })}
          </div>
        ) : null}
      </div>
    );
  }
}

export default withApollo(SocialMediaUser);
