import React, { Component, Fragment } from "react";
import { Container, Row, Col } from "styled-bootstrap-grid";
import styled from "styled-components";
import TotalsContainer from "./TotalsContainer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactGA from "react-ga";
import { ReactComponent as CurtnCallLogo } from "../utility/svg/curtncallLogo.svg";

const Jumbotron = styled.div`
  background-color: ${props => props.theme.color.darkestRed};
  color: white;
  min-height: 30rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 2rem;
`;

const PageWrapper = styled.div`
  background-color: white;
  flex-grow: 1;
  /*background-image: linear-gradient(
      rgba(218, 222, 219, 0.3),
      rgba(220, 226, 230, 0.3)
    ),
    url(/images/off_page_background.png);
  background-color: #cccccc;
  background-repeat: repeat; */
`;

const Footer = styled.div`
  background-color: ${props => props.theme.color.black};
  flex-grow: 1;
  color: white;
  padding: 2rem;
`;

const LogoTextWrapper = styled.div`
  color: white;
  padding: 1rem;
  font-weight: 700;
`;

const StyledCurtnCallLogo = styled(CurtnCallLogo)`
  height: 100%;
  width: 100%;
  max-height: 8rem;
`;

const LinkWrapper = styled.div`
  margin-bottom: 0.5rem;
`;

const Link = styled.a`
  color: white;

  &:visted {
    color: white;
  }
`;

class About extends Component {
  componentDidMount = () => {
    if (process.env.NODE_ENV === "production") {
      ReactGA.pageview("/about");
    }
  };

  render() {
    return (
      <Fragment>
        <PageWrapper>
          <Jumbotron>
            <StyledCurtnCallLogo />
            <LogoTextWrapper>
              The Internet's Home for Live Performance
            </LogoTextWrapper>
          </Jumbotron>
          <Container>
            <Row style={{ paddingBottom: "2rem" }}>
              <Col md="6">
                <div>
                  <h3>What is CurtnCall&trade;?</h3>
                  CurtnCall&trade; is the Internet's home for live performance.
                </div>
              </Col>
              <Col md="6">
                <div>
                  <h3>How does it work?</h3>
                  Performers add their name to a lineup. When it is their turn
                  to perform, they perform for viewers for a fixed amount of
                  time. Viewers watch the performance and provide feedback to
                  the performer.
                </div>
              </Col>
              <Col md="6">
                <div>
                  <h3>How can viewers provide feedback?</h3>
                  Viewers react during the performance by clicking reaction
                  icons. The reactions are applause, laugh, sad, angry, awkward,
                  confused, hearts, and shock. After the performance, viewers
                  vote on the performance by giving it a rating of money,
                  tomato, or meh.
                </div>
              </Col>
              <Col md="6">
                <div>
                  <h3>When can performers perform?</h3>
                  We will host a weekly show which will run for one hour in
                  length. Performance spots are first-come, first-serve.
                </div>
              </Col>
              <Col md="6">
                <div>
                  <h3>
                    Is Facebook the only option for creating a user account?
                  </h3>
                  Yes, we use Facebook because we believe it is the login
                  service that is most likely to ensure authentic people behind
                  the login. We understood privacy concerns, and the only
                  information we request from Facebook is your name, e-mail, and
                  public profile picture.
                </div>
              </Col>
              <Col md="6">
                <div>
                  <h3>What are the rules for performing?</h3>
                  Please keep it classy. We ask that performances not include
                  nudity, violence, hate speech, etc. CurtnCall&trade; is
                  supposed to be fun, and we would like to keep it that way as
                  much as possible. We reserve the right to stop any performance
                  and ban any performer from CurtnCall&trade; that we feel does
                  not meet these rules.
                </div>
              </Col>
              <Col md="6">
                <div>
                  <h3>As a viewer, how can I stop a performance?</h3>
                  If a viewer absolutely doesn't want to watch a performer
                  anymore, viewers have the option to pull the plug on the
                  performer. By clicking the pull the plug button, the viewer
                  will no longer have to watch that particular performance.
                </div>
              </Col>
              <Col md="6">
                <div>
                  <h3>Who should perform on CurtnCall&trade;?</h3>
                  Anyone. We believe that anyone is capable of a money
                  performance on CurtnCall&trade;. Use your imagination and who
                  knows, you may come up with something amazing.
                </div>
              </Col>
            </Row>
            <h3>All-Time Totals</h3>
            <Row style={{ paddingBottom: "2rem" }}>
              <TotalsContainer />
            </Row>
          </Container>
        </PageWrapper>
        <Footer>
          <Container>
            <Row>
              <Col md="6">
                <LinkWrapper>
                  <Link href="https://termsfeed.com/privacy-policy/4cb309e2521a87ab633c708f5b1b9083">
                    Privacy Policy
                  </Link>
                </LinkWrapper>
                <LinkWrapper>
                  <Link href="https://termsfeed.com/terms-service/a05f1a7483a83592c7e1f8a022db220f">
                    Terms of Service
                  </Link>
                </LinkWrapper>
                <LinkWrapper>
                  Copyright © 2018 | All Rights Reserved
                </LinkWrapper>
              </Col>

              <Col md="6">
                <div
                  style={{
                    textAlign: "right"
                  }}
                >
                  <FontAwesomeIcon
                    icon={["fab", "facebook-square"]}
                    size="lg"
                    onClick={() => {
                      window.location = "https://www.facebook.com/CurtnCallTV";
                    }}
                    style={{ marginRight: "1rem", cursor: "pointer" }}
                  />
                  <FontAwesomeIcon
                    icon={["fab", "twitter-square"]}
                    size="lg"
                    onClick={() => {
                      window.location = "https://www.twitter.com/CurtnCallTV";
                    }}
                    style={{ marginRight: "1rem", cursor: "pointer" }}
                  />
                </div>
              </Col>
            </Row>
          </Container>
        </Footer>
      </Fragment>
    );
  }
}

export default About;
