import React, { Component } from "react";
import { Row, Col } from "styled-bootstrap-grid";
import styled from "styled-components";

const PageHeaderWrapper = styled.div`
  background: ${props => props.theme.color.black};
  text-align: center;
  padding: 2rem;
  color: white;
  border-radius: 0.25rem;
  margin-bottom: 1rem;
`;

const HeaderImage = styled.img`
  width: 100%;
  height: 100%;
  max-height: 6rem;
`;

export default class PageHeader extends Component {
  render() {
    const { title } = this.props;
    return (
      <Row>
        <Col>
          <PageHeaderWrapper>
            <HeaderImage src="/images/curtncall_logo.svg" />
            <div
              style={{
                fontSize: "2rem",
                paddingTop: "0.5rem",
                fontWeight: 600
              }}
            >
              {Array.isArray(title)
                ? title.map((titleItem, i) => {
                    return <span key={titleItem}>{titleItem} </span>;
                  })
                : title}
            </div>
          </PageHeaderWrapper>
        </Col>
      </Row>
    );
  }
}
