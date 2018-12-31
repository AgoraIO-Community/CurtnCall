import React, { Component } from "react";
import Auth from "@aws-amplify/auth";
import { withRouter } from "react-router-dom";

class SignupForm extends Component {
  state = { firstName: "", lastName: "", password: "", email: "" };

  handleInputChange = e => {
    const { value, id } = e.target;
    let setStateObj = {};
    setStateObj[id] = value;
    this.setState(setStateObj);
  };

  handleSubmit = async e => {
    e.preventDefault();
    const { firstName, lastName, password, email } = this.state;

    const pictureNumber = String(Math.floor(Math.random() * 50) + 1);

    let gender;
    if (Math.floor(Math.random() * 2) === 0) {
      gender = "men";
    } else {
      gender = "women";
    }

    await Auth.signUp({
      username: email,
      password,
      attributes: {
        given_name: firstName,
        family_name: lastName,
        picture: `https://randomuser.me/api/portraits/${gender}/${pictureNumber}.jpg`
      }
    });

    this.props.history.push({
      pathname: "/verify-email"
    });
  };

  render() {
    const { handleInputChange, handleSubmit } = this;
    const { firstName, lastName, password, email } = this.state;

    return (
      <form className="w-full max-w-md" onSubmit={handleSubmit}>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
              htmlFor="firstName"
            >
              First Name
            </label>
            <input
              className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3 leading-tight"
              id="firstName"
              type="text"
              placeholder="Jimmy"
              value={firstName}
              onChange={handleInputChange}
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
              htmlFor="lastName"
            >
              Last Name
            </label>
            <input
              className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 leading-tight"
              id="lastName"
              type="text"
              placeholder="Fox"
              value={lastName}
              onChange={handleInputChange}
            />
          </div>
        </div>
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
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3 leading-tight"
              id="password"
              type="password"
              placeholder="******************"
              value={password}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="inline-block align-baseline font-bold text-sm text-black hover:text-grey-darker"
            // href="#"
          >
            Have An Account?
          </button>
          <button
            className="bg-black hover:bg-grey-darker hover:border-black text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Sign Up
          </button>
        </div>
      </form>
    );
  }
}

export default withRouter(SignupForm);
