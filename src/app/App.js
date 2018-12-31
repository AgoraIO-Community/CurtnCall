import React, { Component } from "react";
import { ApolloProvider } from "react-apollo";
import { Rehydrated } from "aws-appsync-react";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { ThemeProvider } from "styled-components";
import Cache from "@aws-amplify/cache";
import Auth from "@aws-amplify/auth";
import Storage from "@aws-amplify/storage";
import awsmobile from "../aws-exports";
import GlobalStyles from "./common/styled-components/GlobalStyles";
import ReactGA from "react-ga";

import client from "./client";
import theme from "./theme";
import store from "./store";
import history from "./history";
import "./icons";

import Routes from "./routes/Routes";
import NavbarContainer from "./common/NavbarContainer";
import LoginModal from "./common/LoginModal";

import styled from "styled-components";
import { BaseCSS } from "styled-bootstrap-grid";
import Curtain from "./common/Curtain";
import posed from "react-pose";

const AppWrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const LoadWrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #3b0d0c;
  justify-content: center;
  align-items: center;
`;

const LoadingLogo = posed.img({
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
});

//for debugging Amplify
//window.LOG_LEVEL = "DEBUG";

Cache.configure();
Auth.configure(awsmobile);
Storage.configure(awsmobile);

if (process.env.NODE_ENV === "production") {
  ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_ID);
}

class App extends Component {
  state = { loading: true, logoIsHidden: true };

  componentDidMount = async () => {
    try {
      console.log("Newest version - 12");
      setTimeout(() => {
        this.setState({ logoIsHidden: false });
      }, 1);
      this.loadFacebookSdk();

      await this.waitForFbInit();

      try {
        const { id: userId } = await Auth.currentAuthenticatedUser();

        if (process.env.NODE_ENV === "production") {
          ReactGA.set({ userId });
        }
      } catch (e) {}

      this.setState({ loading: false });
    } catch (error) {
      console.log("error", error);
      await Auth.signOut({ global: true });
      window.location.reload();
    }
  };

  waitForFbInit = () => {
    return new Promise((res, rej) => {
      const hasFbLoaded = () => {
        if (window.FB) {
          res();
        } else {
          setTimeout(hasFbLoaded, 300);
        }
      };
      hasFbLoaded();
    });
  };

  loadFacebookSdk = () => {
    window.fbAsyncInit = function() {
      window.FB.init({
        appId: process["env"]["REACT_APP_FACEBOOK_APP_ID"],
        autoLogAppEvents: true,
        xfbml: true,
        version: "v3.2",
        status: true
      });
    };

    (function(d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  };

  render() {
    const { loading } = this.state;

    if (loading) {
      return (
        <LoadWrapper>
          <LoadingLogo
            src="/images/curtncall_logo.svg"
            alt="CurtnCall Logo"
            style={{ width: "25%", height: "auto" }}
            pose={this.state.logoIsHidden ? "hidden" : "visible"}
          />
        </LoadWrapper>
      );
    }

    const {
      general: { loginService }
    } = store.getState();

    return (
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <ApolloProvider client={client}>
            <Rehydrated
              render={({ rehydrated }) =>
                rehydrated ? (
                  <ConnectedRouter history={history}>
                    <AppWrapper>
                      {loginService === "cognito" && <LoginModal />}
                      <NavbarContainer />
                      <Routes />
                      <GlobalStyles />
                      <BaseCSS />
                    </AppWrapper>
                  </ConnectedRouter>
                ) : (
                  <Curtain loading />
                )
              }
            />
          </ApolloProvider>
        </Provider>
      </ThemeProvider>
    );
  }
}

export default App;
