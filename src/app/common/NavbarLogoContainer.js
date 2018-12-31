import { connect } from "react-redux";
import NavbarLogo from "./NavbarLogo";
import { Creators as homeCreators } from "../home/duck/actions";

const mapStateToProps = state => {
  const { pathname } = state.router.location;

  return {
    pathname
  };
};

const mapDispatchToProps = dispatch => {
  const togglePerformerSidebar = () => {
    dispatch(homeCreators.setShowPerformerSidebar());
  };

  return { togglePerformerSidebar };
};

const NavbarLogoContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NavbarLogo);

export default NavbarLogoContainer;
