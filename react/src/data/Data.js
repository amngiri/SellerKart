import { bindActionCreators } from "redux";
import { setProductId } from "../redux/actions/CartAction";
import { connect } from "react-redux";
import React, { Component } from "react";

class Datastock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Data: [],
    };
  }

  render() {
    return (
      <>
        <p></p>
      </>
    );
  }
}
const mapStateToProps = ({ cart }) => {
  return {
    cart,
  };
};

export default connect(mapStateToProps)(Datastock);
