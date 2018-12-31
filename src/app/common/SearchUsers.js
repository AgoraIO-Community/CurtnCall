import React, { Component } from "react";
import styled from "styled-components";
import { getAllUsers, searchUsers } from "./graphql";

class SearchUsers extends Component {
  render() {
    return (
      <div>
        <input type="text" />
      </div>
    );
  }
}

export default SearchUsers;
