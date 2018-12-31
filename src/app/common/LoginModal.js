import React, { Component } from "react";
import LoginFormContainer from "./LoginFormContainer";

class LoginModal extends Component {
  render() {
    return (
      <div className="modal">
        <input id="modal-trigger" className="checkbox" type="checkbox" />
        <div className="modal-overlay bg-black">
          <label htmlFor="modal-trigger" className="o-close" />
          <div className="modal-wrap a-center">
            <h1 className="block w-full text-center text-grey-darkest mb-6">
              Log In
            </h1>
            <label htmlFor="modal-trigger" className="close">
              &#10006;
            </label>
            <LoginFormContainer modal />
          </div>
        </div>
      </div>
    );
  }
}

export default LoginModal;
