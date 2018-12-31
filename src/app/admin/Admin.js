import React, { Component } from "react";
import { Container } from "styled-bootstrap-grid";
import styled from "styled-components";
import AdminSidebar from "./AdminSidebar";
import CreateShow from "./CreateShow";
import ViewShowsContainer from "./ViewShowsContainer";
import ConstantsForm from "./ConstantsForm";

const StyledAdminWrapper = styled.div`
  display: flex;
  flex-grow: 1;
`;

class Admin extends Component {
  state = { adminView: null };

  setAdminView = adminView => {
    this.setState({ adminView });
  };

  renderAdminView = () => {
    const { setAdminView } = this;
    const { channelName } = this.props;
    const { adminView } = this.state;
    let returnComponent;

    switch (adminView) {
      case "createShow":
        returnComponent = (
          <CreateShow channelName={channelName} setAdminView={setAdminView} />
        );
        break;
      case "setGeneralConstants":
        returnComponent = (
          <ConstantsForm
            channelName={channelName}
            setAdminView={setAdminView}
          />
        );
        break;
      case "viewShows":
        returnComponent = (
          <ViewShowsContainer
            channelName={channelName}
            setAdminView={setAdminView}
          />
        );
        break;
      default:
        returnComponent = <div>Default View</div>;
        break;
    }

    return returnComponent;
  };

  render() {
    const { renderAdminView, setAdminView } = this;
    const { channelName } = this.props;

    return (
      <StyledAdminWrapper>
        <AdminSidebar channelName={channelName} setAdminView={setAdminView} />
        <Container style={{ marginTop: "2rem" }}>{renderAdminView()}</Container>
      </StyledAdminWrapper>
    );
  }
}

export default Admin;
