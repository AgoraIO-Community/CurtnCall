import React, { Component } from "react";
import Auth from "@aws-amplify/auth";
import { withRouter } from "react-router-dom";

class VerifyEmailForm extends Component {
  state = { code: "", email: "" };
  handleInputChange = e => {
    const { value, id } = e.target;
    let setStateObj = {};
    setStateObj[id] = value;
    this.setState(setStateObj);
  };

  handleSubmit = e => {
    e.preventDefault();
    const { code, email } = this.state;
    Auth.confirmSignUp(email, code)
      .then(_ => {
        this.props.history.push({
          pathname: "/"
        });
      })
      .catch(err => console.log(err));
  };

  render() {
    const { code, email } = this.state;
    const { handleInputChange, handleSubmit } = this;
    return (
      <div>
        <form className="w-full max-w-md" onSubmit={handleSubmit}>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                htmlFor="email"
              >
                E-mail Address
              </label>
              <input
                className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3 leading-tight"
                id="email"
                type="email"
                placeholder="jimmyjfox@email.com"
                value={email}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                htmlFor="code"
              >
                Verification Code
              </label>
              <input
                className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3 leading-tight"
                id="code"
                type="text"
                placeholder="*******"
                value={code}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-black hover:bg-grey-darker hover:border-black text-white font-bold py-2 px-4 rounded"
              type="submit"
            >
              Verify
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(VerifyEmailForm);
