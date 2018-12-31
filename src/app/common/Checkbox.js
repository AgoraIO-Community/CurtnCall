import React, { Component } from "react";
import styled from "styled-components";

class Checkbox extends Component {
  render() {
    return (
      <StyledCheckbox onClick={() => this.props.onChange(!this.props.checked)}>
        <input type="checkbox" checked={this.props.checked} readOnly />
        <label>{this.props.label}</label>
      </StyledCheckbox>
    );
  }
}

export default Checkbox;

const StyledCheckbox = styled.div`
  display: inline-block;
  > input {
    opacity: 0;
  }
  > input + label {
    position: relative; /* permet de positionner les pseudo-éléments */
    padding-left: 25px; /* fait un peu d'espace pour notre case à venir */
    cursor: pointer; /* affiche un curseur adapté */
    &:before {
      content: "";
      position: absolute;
      left: 0;
      top: 1px;
      width: 17px;
      height: 17px; /* dim. de la case */
      border: 1px solid ${props => props.theme.color.grey};
      background: white;
      border-radius: 3px; /* angles arrondis */
    }

    &:after {
      content: "✔";
      position: absolute;
      top: 1px;
      left: 2px;
      font-size: 16px;
      color: ${props => props.theme.color.green};
      transition: all 0.2s; /* on prévoit une animation */
    }
  }
  > input:not(:checked) + label {
    &:after {
      opacity: 0; /* coche invisible */
      transform: scale(0); /* mise à l'échelle à 0 */
    }
  }
  > input:disabled:not(:checked) + label {
    &:before {
      box-shadow: none;
      border-color: #bbb;
      background-color: #ddd;
    }
  }
  > input:checked + label {
    &:after {
      opacity: 1; /* coche opaque */
      transform: scale(1); /* mise à l'échelle 1:1 */
    }
  }
  > input:disabled:checked + label {
    &:after {
      color: #999;
    }
  }
  > input:disabled + label {
    color: #aaa;
  }
  > input:checked:focus + label,
  input:not(:checked):focus + label {
    &:before {
      border: 1px dotted blue;
    }
  }
`;
