import React, { Component } from "react";
import styled from "styled-components";

const StyledTable = styled.table`
  width: 100%;
  border-radius: 0.28571429rem;
  text-align: left;
  border-collapse: separate;
  border-spacing: 0px;
`;

const StyledTableItem = styled.td`
  padding: 0.78571429em 0.78571429em;
  text-align: inherit;
  border-bottom: 1px solid ${props => props.theme.color.black};
`;

export default class Table extends Component {
  render() {
    const { data } = this.props;

    return (
      <StyledTable>
        {Object.entries(data).map(([key, value]) => {
          return (
            <tr key={key}>
              <StyledTableItem>{key}</StyledTableItem>
              <StyledTableItem>{value}</StyledTableItem>
            </tr>
          );
        })}
      </StyledTable>
    );
  }
}
