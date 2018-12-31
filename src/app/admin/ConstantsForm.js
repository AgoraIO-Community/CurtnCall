import React, { Component } from "react";
import { constants, getConstantTitle } from "../utility";
import { sendAdminActions } from "./graphql";
import styled from "styled-components";
import { Col } from "styled-bootstrap-grid";
import { Button } from "../common/styled-components/general";
import { withApollo } from "react-apollo";
import Auth from "@aws-amplify/auth";

const FormRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-right: -5px;
  margin-left: -5px;
`;

const Input = styled.input`
  display: block;
  width: 100%;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  color: ${props => props.theme.color.black};
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid ${props => props.theme.color.grey};
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
`;

const Label = styled.label`
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  display: inline-block;
`;

class ConstantsForm extends Component {
  handleSubmit = async event => {
    event.preventDefault();
    const { channelName, client, setAdminView } = this.props;

    const constants = Array.prototype.slice
      .call(event.target)
      .filter(el => el.name)
      .reduce(
        (form, el) => ({
          ...form,
          [el.name]: el.value ? parseFloat(el.value) : null
        }),
        {}
      );

    const currentSession = await Auth.currentSession();

    const {
      accessToken: { jwtToken }
    } = currentSession;

    await client.mutate({
      mutation: sendAdminActions,
      variables: {
        input: {
          channelName,
          constants
        }
      },
      context: {
        headers: {
          jwtToken
        }
      }
    });

    setAdminView(null);
  };

  render() {
    const { handleSubmit } = this;

    return (
      <div>
        <form onSubmit={handleSubmit}>
          <FormRow>
            {constants.map((constant, i) => {
              return (
                <Col sm="6" style={{ marginBottom: "1rem" }} key={constant}>
                  <Label htmlFor={constant}>{getConstantTitle(constant)}</Label>
                  <Input
                    name={constant}
                    type="text"
                    ref={el => (this.el = el)}
                  />
                </Col>
              );
            })}
          </FormRow>

          <Button type="submit" color="green" style={{ marginLeft: "0.5rem" }}>
            Submit
          </Button>
        </form>
      </div>
    );
  }
}

export default withApollo(ConstantsForm);
