import React, { Component, Fragment } from "react";
import { Formik } from "formik";
import { Col } from "styled-bootstrap-grid";
import styled from "styled-components";
import DatetimeRangePicker from "react-datetime-range-picker";
import { getConstantTitle, mergeArrayOfObjects } from "../utility";
import { Button } from "../common/styled-components/general";
import { withApollo } from "react-apollo";
import { sendShowActions } from "./graphql";
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

class ShowForm extends Component {
  state = {
    showStart: this.props.constants
      ? new Date(this.props.constants.showStart)
      : new Date(),
    showEnd: this.props.constants
      ? new Date(this.props.constants.showEnd)
      : new Date()
  };

  handleChange = ({ start: showStart, end: showEnd }) => {
    this.setState({ showStart, showEnd });
  };

  render() {
    let { constants, refetch } = this.props;

    if (!constants) {
      constants = {
        showName: "",
        showDescription: "",
        gimmeMoreDuration: 15000,
        maxNumberOfPerformance: 1,
        performanceDuration: 20000,
        performanceReadyThreshold: 0.25,
        performanceTimerExpiredThreshold: 0.25,
        pullThePlugThreshold: 0.75,
        reactionTimeout: 3000,
        votingDuration: 10000,
        votingTimerExpiredThreshold: 0.25
      };
    }

    return (
      <div>
        <Formik
          initialValues={constants}
          onSubmit={async (values, actions) => {
            const { channelName, client, setAdminView } = this.props;
            let { showStart, showEnd } = this.state;

            showStart = showStart.getTime();
            showEnd = showEnd.getTime();

            let input = mergeArrayOfObjects([
              values,
              { channelName, showStart, showEnd }
            ]);

            if (input.__typename) {
              delete input.__typename;
            }

            const currentSession = await Auth.currentSession();

            const {
              accessToken: { jwtToken }
            } = currentSession;

            await client.mutate({
              mutation: sendShowActions,
              variables: {
                input
              },
              context: {
                headers: {
                  jwtToken
                }
              }
            });

            if (refetch) {
              refetch();
            }

            actions.setSubmitting(false);
            setAdminView(null);
          }}
          render={props => (
            <form onSubmit={props.handleSubmit}>
              <FormRow>
                {Object.keys(constants).map((constant, i) => {
                  if (
                    constant === "id" ||
                    constant === "__typename" ||
                    constant === "showStart" ||
                    constant === "showEnd"
                  ) {
                    return null;
                  }

                  if (constant === "showDescription") {
                    return (
                      <Fragment key={constant}>
                        <Col sm="6" style={{ marginBottom: "1rem" }}>
                          <Label htmlFor={constant}>
                            {getConstantTitle(constant)}
                          </Label>
                          <Input
                            id={constant}
                            name={constant}
                            value={props["values"][`${constant}`]}
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            type="text"
                          />
                        </Col>
                        <Col sm="6">
                          <Label htmlFor="show-form-start-end-wrapper">
                            Start/End Time
                          </Label>
                          <DatetimeRangePicker
                            className="show-form-start-end-wrapper"
                            pickerClassName="show-form-start-end-input-wrapper"
                            id="show-form-start-end-wrapper"
                            onChange={this.handleChange}
                            inputProps={{
                              className: "show-form-start-end-wrapper-input",
                              style: { border: 0 }
                            }}
                            isValidStartDate={() => {
                              return true;
                            }}
                            isValidEndDate={() => {
                              return true;
                            }}
                            startDate={this.state.showStart}
                            endDate={this.state.showEnd}
                          />
                        </Col>
                      </Fragment>
                    );
                  }

                  return (
                    <Col sm="6" style={{ marginBottom: "1rem" }} key={constant}>
                      <Label htmlFor={constant}>
                        {getConstantTitle(constant)}
                      </Label>
                      <Input
                        id={constant}
                        name={constant}
                        value={props["values"][`${constant}`]}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        type={constant === "showName" ? "text" : "number"}
                      />
                    </Col>
                  );
                })}
              </FormRow>

              <Button
                type="submit"
                disabled={props.isSubmitting}
                color="green"
                style={{ marginLeft: "0.5rem" }}
              >
                Submit
              </Button>
            </form>
          )}
        />
      </div>
    );
  }
}

export default withApollo(ShowForm);
