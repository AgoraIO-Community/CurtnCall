import React, { Component } from "react";
import styled from "styled-components";
import { capitalize } from "../utility";

const StyledSelect = styled.select`
  cursor: pointer;
  position: relative;
  display: inline-block;
  outline: none;
  text-align: left;
  background: #fff;
  min-width: 11rem;
`;

export default class Dropdown extends Component {
  render() {
    const { options, onChangeCallback, style } = this.props;

    return (
      <StyledSelect onChange={onChangeCallback} style={style}>
        {options.map((option, i) => {
          const { type } = option;
          return (
            <option key={type} value={type}>
              {capitalize(type)}
            </option>
          );
        })}
      </StyledSelect>
    );
  }
}
