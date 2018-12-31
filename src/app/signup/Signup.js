import React, { Component } from "react";
import SignupForm from "../common/SignupForm";

class Signup extends Component {
  render() {
    return (
      <div className="flex justify-center items-center flex-grow">
        <div className="w-full bg-white rounded shadow-lg p-8 m-4 md:max-w-sm md:mx-auto">
          <h1 className="block w-full text-center text-grey-darkest mb-6">
            Sign Up
          </h1>
          <SignupForm />
        </div>
      </div>
    );
  }
}

export default Signup;
