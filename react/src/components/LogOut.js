import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { logOutUser } from "../redux/actions/CartAction";
export class LogOut extends Component {
  render() {
    this.props.logOutUser();
    this.props.history.push("/");
    return <div></div>;
  }
}

const mapStateToProps = ({ cart }) => {
  return {
    cart,
  };
};

const mapActionsToProps = (dispatch) => {
  return bindActionCreators(
    {
      logOutUser,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapActionsToProps)(LogOut);
