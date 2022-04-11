import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import "./layout/table.css";

class UserProfile extends Component {
  handleEdit = () => {
    this.props.history.push("/updateinfo");
  };

  checkUserLogIn = (cart) => {
    if (cart.user != null) {
      const { cart } = this.props;
      const { user } = cart;
      return (
        <div className="container-fluid ps-md-0">
          <div className="row g-0">
            <div className="col-md-8 col-lg-12">
              <div className="col-md-8 col-lg-12">
                <div className="login d-flex align-items-center py-5">
                  <div className="container">
                    <div className="row">
                      <div className="col-md-9 col-lg-8 mx-auto">
                        <div className="form-floating mb-3">
                          <div
                            style={{
                              borderStyle: "solid",
                              borderBlockColor: "red",
                              padding: "10px",
                              marginTop: "20px",
                            }}
                          >
                            <h3 style={{ alignContent: "center" }}>
                              User Profile -:
                            </h3>
                            <form class="form-inline">
                              <div class="form-group mx-sm-3 mb-2">
                                <label for="staticEmail2" class="sr-only">
                                  Name
                                </label>
                                <input
                                  type="text"
                                  style={{ width: "75per", height: "10per" }}
                                  readonly
                                  class="form-control"
                                  id="staticEmail2"
                                  value={cart.user.name}
                                  readOnly
                                />
                              </div>
                              <div class="form-group mx-sm-3 mb-2">
                                <label for="inputPassword2" class="sr-only">
                                  Email
                                </label>
                                <input
                                  type="text"
                                  class="form-control"
                                  id="inputPassword2"
                                  value={cart.user.email}
                                  readOnly
                                />
                              </div>
                              <div class="form-group mx-sm-3 mb-2">
                                <label for="inputPassword2" class="sr-only">
                                  Mobile No
                                </label>
                                <input
                                  type="text"
                                  class="form-control"
                                  id="inputPassword2"
                                  value={cart.user.mobileNo}
                                  readOnly
                                />
                              </div>
                              <div class="form-group mx-sm-3 mb-2">
                                <label for="inputPassword2" class="sr-only">
                                  AddressLine1
                                </label>
                                <input
                                  type="text"
                                  class="form-control"
                                  id="inputPassword2"
                                  value={user.address.addressLine1}
                                  readOnly
                                />
                              </div>
                              <div class="form-group mx-sm-3 mb-2">
                                <label for="inputPassword2" class="sr-only">
                                  AddressLine2
                                </label>
                                <input
                                  type="text"
                                  class="form-control"
                                  id="inputPassword2"
                                  value={user.address.addressLine2}
                                  readOnly
                                />
                              </div>
                              <div class="form-group mx-sm-3 mb-2">
                                <label for="inputPassword2" class="sr-only">
                                  City
                                </label>
                                <input
                                  type="text"
                                  class="form-control"
                                  id="inputPassword2"
                                  value={user.address.city}
                                  readOnly
                                />
                              </div>
                              <div class="form-group mx-sm-3 mb-2">
                                <label for="inputPassword2" class="sr-only">
                                  State
                                </label>
                                <input
                                  type="text"
                                  class="form-control"
                                  id="inputPassword2"
                                  value={user.address.state}
                                  readOnly
                                />
                              </div>
                              <div class="form-group mx-sm-3 mb-2">
                                <label for="inputPassword2" class="sr-only">
                                  Pincode
                                </label>
                                <input
                                  type="text"
                                  class="form-control"
                                  id="inputPassword2"
                                  value={user.address.pincode}
                                  readOnly
                                />
                              </div>

                              <button
                                className="btn btn-outline-success"
                                onClick={this.handleEdit}
                              >
                                {" "}
                                Edit Information
                              </button>
                              <h3 style={{ alignContent: "center" }}></h3>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return <></>;
    }
  };

  render() {
    if (this.props.cart.user === null) {
      return <Redirect to={{ pathname: "/" }} />;
    }
    return <>{this.checkUserLogIn(this.props.cart)}</>;
  }
}

const mapStateToProps = ({ cart }) => {
  return {
    cart,
  };
};

export default connect(mapStateToProps)(UserProfile);
