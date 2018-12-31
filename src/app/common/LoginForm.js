import React, { Component } from "react";
import Auth from "@aws-amplify/auth";
import { withApollo } from "react-apollo";

import {
  Form,
  FormInput,
  FormInputWrapper,
  FormInputLabel
} from "../common/styled-components/form";
import { Button } from "../common/styled-components/general";

class LoginForm extends Component {
  state = {
    username: "",
    password: "",
    formSubmitProcessing: false,
    formSubmitErrors: []
  };

  handleInputChange = e => {
    const { value, id } = e.target;
    let setStateObj = {};
    setStateObj[id] = value;
    this.setState(setStateObj);
  };

  handleSubmit = async e => {
    this.setState({ formSubmitProcessing: true });
    try {
      e.preventDefault();

      const user = await Auth.currentUserInfo();

      if (user) {
        await Auth.signOut();
      }

      const { username, password } = this.state;

      await Auth.signIn(username, password);

      this.setState({ formSubmitProcessing: false });
      window.location.reload();
    } catch (err) {
      console.log("err", err);
      const { message } = err;
      const formSubmitErrors = [{ message }];
      this.setState({ formSubmitErrors, formSubmitProcessing: false });
    }
  };

  render() {
    const { handleInputChange, handleSubmit } = this;
    const {
      username,
      password,
      formSubmitProcessing,
      formSubmitErrors
    } = this.state;
    return (
      <Form id="login-form" onSubmit={handleSubmit}>
        <FormInputWrapper>
          <FormInputLabel htmlFor="username">Username</FormInputLabel>
          <FormInput
            id="username"
            type="text"
            placeholder="JimmyFox81"
            onChange={handleInputChange}
            value={username}
            autoComplete={"username"}
          />
        </FormInputWrapper>
        <FormInputWrapper>
          <FormInputLabel htmlFor="password">Password</FormInputLabel>
          <FormInput
            id="password"
            type="password"
            placeholder="*******"
            onChange={handleInputChange}
            password={password}
            autoComplete="current-password"
          />
        </FormInputWrapper>
        <Button color="green" disabled={formSubmitProcessing} type="submit">
          Submit
        </Button>
        {formSubmitErrors.length
          ? formSubmitErrors.map((item, i) => {
              return <div key={item.message}>{item.message}</div>;
            })
          : null}
      </Form>
    );
  }
}

export default withApollo(LoginForm);
