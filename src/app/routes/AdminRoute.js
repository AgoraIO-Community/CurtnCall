import React from "react";
import { Route } from "react-router-dom";
import AdminLogin from "../admin/AdminLogin";
import { checkIfIsAdmin } from "../utility";

class AdminRoute extends React.Component {
  state = {
    loading: true,
    isAuthenticated: false
  };

  componentDidMount = async () => {
    try {
      const isAdmin = await checkIfIsAdmin();

      if (isAdmin) {
        this.setState({
          loading: false,
          isAuthenticated: true
        });
      }

      this.setState({ loading: false });

      return;
    } catch (err) {
      this.setState({ loading: false });
      return;
    }
  };

  render() {
    const { component: Component, ...rest } = this.props;
    if (this.state.loading) {
      return <div>LOADING</div>;
    } else {
      return (
        <Route
          {...rest}
          render={props => (
            <div>
              {!this.state.isAuthenticated ? (
                <AdminLogin />
              ) : (
                <Component {...this.props} />
              )}
            </div>
          )}
        />
      );
    }
  }
}

export default AdminRoute;
