import React, { Component } from "react";
import styled from "styled-components";
import { capitalize } from "../utility";

const Wrapper = styled.div`
  position: relative;
  margin-bottom: 1rem;
`;

const Input = styled.input`
  font-size: 18px;
  padding: 10px 10px 10px 5px;
  display: block;
  width: 100%;
  border: none;
  border-bottom: 1px solid ${props => props.theme.color.black};
  &:focus {
    outline: none;
  }
`;

const Highlight = styled.span`
  position: absolute;
  height: 60%;
  width: 100px;
  top: 25%;
  left: 0;
  pointer-events: none;
  opacity: 0.5;
`;

const Bar = styled.span`
  position: relative;
  display: block;
  width: 300px;
  margin-bottom: 0.5rem;
  &:before,
  &:after {
    content: "";
    height: 2px;
    width: 0;
    bottom: 1px;
    position: absolute;
    background: #22292f;
    transition: 0.2s ease all;
    -moz-transition: 0.2s ease all;
    -webkit-transition: 0.2s ease all;
  }

  &:before {
    left: 50%;
  }

  &:after {
    right: 50%;
  }
`;

class SocialMediaForm extends Component {
  state = { link: this.props.link };

  render() {
    const { type } = this.props;
    const { link } = this.state;

    return (
      <Wrapper>
        <Input
          type="text"
          id={`${type}-social-media`}
          value={link}
          onChange={e => {
            this.setState({ link: e.target.value });
          }}
        />
        <Highlight />
        <Bar />
        <label>{capitalize(type)} Profile URL</label>
      </Wrapper>
    );
  }
}

export default SocialMediaForm;
