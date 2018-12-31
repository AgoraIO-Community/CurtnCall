import React, { Component } from "react";
import ShowForm from "./ShowForm";

export default class CreateShow extends Component {
  render() {
    const { channelName, setAdminView } = this.props;
    return (
      <div>
        <h3>Create Show</h3>
        <ShowForm channelName={channelName} setAdminView={setAdminView} />
      </div>
    );
  }
}
