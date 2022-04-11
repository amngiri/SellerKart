import React, { useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setUserDetails } from "../redux/actions/CartAction";
import ApiService from "../services/ApiService";
import Toastify from "toastify-js";
function UpdateInfo(props) {
  const [name, setName] = useState(props.cart.user.name);
  const [email, setEmail] = useState(props.cart.user.email);
  const [mobileNo, setMobileNo] = useState(props.cart.user.mobileNo);
  const [addressLine1, setAddressLine1] = useState(
    props.cart.user.address.addressLine1
  );
  const [addressLine2, setAddressLine2] = useState(
    props.cart.user.address.addressLine2
  );
  const [city, setCity] = useState(props.cart.user.address.city);
  const [state, setState] = useState(props.cart.user.address.state);
  const [pinCode, setPinCode] = useState(props.cart.user.address.pincode);

  const handleUpdate = (e) => {
    e.preventDefault();
    if (name === "" || !isNaN(name)) {
      document.getElementById("errorname").innerText = "invalid name";
      return;
    } else {
      document.getElementById("errorname").innerText = "";
    }

    if (mobileNo === "" || isNaN(mobileNo) || mobileNo.length !== 10) {
      document.getElementById("errorno").innerText = "invalid mobile number";
      return;
    } else {
      document.getElementById("errorno").innerText = "";
    }
    if (addressLine1 === "" || !isNaN(addressLine1)) {
      document.getElementById("erroradd1").innerText = "please enter some data";
      return;
    } else {
      document.getElementById("erroradd1").innerText = "";
    }
    if (addressLine2 === "" || !isNaN(addressLine2)) {
      document.getElementById("erroradd2").innerText = "please enter some data";
      return;
    } else {
      document.getElementById("erroradd2").innerText = "";
    }
    if (city === "" || !isNaN(city)) {
      document.getElementById("errorcity").innerText = "please enter some data";
      return;
    } else {
      document.getElementById("errorcity").innerText = "";
    }
    if (pinCode === 0 || isNaN(pinCode)) {
      document.getElementById("errorpin").innerText = "invalid pincode";
      return;
    } else {
      document.getElementById("errorpin").innerText = "";
    }
    if (state === "" || !isNaN(state)) {
      document.getElementById("errorstate").innerText = "invalid state";
      return;
    } else {
      document.getElementById("errorstate").innerText = "";
    }

    let user = null;
    if (name !== props.cart.user.name) {
      user = props.cart.user;
      user.name = name;
    }
    if (email !== props.cart.user.email) {
      user = props.cart.user;
      user.email = email;
    }
    if (mobileNo !== props.cart.user.mobileNo) {
      user = props.cart.user;
      user.mobileNo = mobileNo;
    }
    if (addressLine1 !== props.cart.user.address.addressLine1) {
      user = props.cart.user;
      user.address.addressLine1 = addressLine1;
    }
    if (addressLine2 !== props.cart.user.address.addressLine2) {
      user = props.cart.user;
      user.address.addressLine2 = addressLine2;
    }
    if (city !== props.cart.user.address.city) {
      user = props.cart.user;
      user.address.city = city;
    }
    if (state !== props.cart.user.address.state) {
      user = props.cart.user;
      user.address.state = state;
    }
    if (pinCode !== props.cart.user.address.pincode) {
      user = props.cart.user;
      user.address.pincode = pinCode;
    }
    props.setUserDetails(user);
    ApiService.addUser(user)
      .then((response) => {
        const { data } = response;
        console.log("here is the data");
        console.log(data);

        Toastify({
          text: "user details updated succesfully.",
          duration: 3000,
          style: {
            background: "green",
            color: "white",
          },
        }).showToast();

        if (user.role === "RETAILER") {
          props.history.push("/retailer");
        } else if (user.role === "WHOLESALER") {
          props.history.push("/wholesaler");
        } else if (user.role === "ADMIN") {
          props.history.push("/admin");
        }
      })
      .catch(() => {
        Toastify({
          text: "unable to update details.",
          duration: 3000,
          style: {
            background: "red",
            color: "white",
          },
        }).showToast();
        return;
      });
    props.history.push("/login");
  };

  return (
    <div className="container-fluid ps-md-0">
      <div className="row g-0">
        <div className="col-md-8 col-lg-12">
          <div className="col-md-8 col-lg-12">
            <div className="login d-flex align-items-center py-5">
              <div className="container">
                <div className="row">
                  <div id="error"></div>
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
                          Update Use Profile -:
                        </h3>
                        <form class="form-inline">
                          <div class="form-group mx-sm-3 mb-2">
                            <label for="inputPassword2" class="sr-only">
                              Email
                            </label>
                            <input
                              type="text"
                              class="form-control"
                              id="inputPassword2"
                              value={props.cart.user.email}
                              readonly
                              onChange={(e) => setEmail(e.target.value)}
                            />
                          </div>
                          <div class="form-group mx-sm-3 mb-2">
                            <label for="staticEmail2" class="sr-only">
                              Name
                            </label>
                            <input
                              type="text"
                              style={{ width: "75per", height: "10per" }}
                              class="form-control"
                              id="staticEmail2"
                              placeholder={props.cart.user.name}
                              onChange={(e) => setName(e.target.value)}
                            />
                            <div
                              id="errorname"
                              style={{
                                color: "red",
                              }}
                            ></div>
                          </div>

                          <div class="form-group mx-sm-3 mb-2">
                            <label for="inputPassword2" class="sr-only">
                              Mobile No
                            </label>
                            <input
                              type="number"
                              class="form-control"
                              id="inputPassword2"
                              placeholder={props.cart.user.mobileNo}
                              onChange={(e) => setMobileNo(e.target.value)}
                            />
                            <div
                              id="errorno"
                              style={{
                                color: "red",
                              }}
                            ></div>
                          </div>
                          <div class="form-group mx-sm-3 mb-2">
                            <label for="inputPassword2" class="sr-only">
                              AddressLine1
                            </label>
                            <input
                              type="text"
                              class="form-control"
                              id="inputPassword2"
                              placeholder={props.cart.user.address.addressLine1}
                              onChange={(e) => setAddressLine1(e.target.value)}
                            />
                            <div
                              id="erroradd1"
                              style={{
                                color: "red",
                              }}
                            ></div>
                          </div>
                          <div class="form-group mx-sm-3 mb-2">
                            <label for="inputPassword2" class="sr-only">
                              AddressLine2
                            </label>
                            <input
                              type="text"
                              class="form-control"
                              id="inputPassword2"
                              placeholder={props.cart.user.address.addressLine2}
                              onChange={(e) => setAddressLine2(e.target.value)}
                            />
                            <div
                              id="erroradd2"
                              style={{
                                color: "red",
                              }}
                            ></div>
                          </div>
                          <div class="form-group mx-sm-3 mb-2">
                            <label for="inputPassword2" class="sr-only">
                              city
                            </label>
                            <input
                              type="text"
                              class="form-control"
                              id="inputPassword2"
                              placeholder={props.cart.user.address.city}
                              onChange={(e) => setCity(e.target.value)}
                            />
                            <div
                              id="errorcity"
                              style={{
                                color: "red",
                              }}
                            ></div>
                          </div>

                          <div class="form-group mx-sm-3 mb-2">
                            <label for="inputPassword2" class="sr-only">
                              state
                            </label>
                            <select
                              class="form-select"
                              id="floatingSelect"
                              placeholder={props.cart.user.address.state}
                              aria-label="Floating label select example"
                              onChange={(e) => {
                                setState(e.target.value);
                                console.log(e.target.value);
                              }}
                            >
                              <option value={props.cart.user.address.state}>
                                {props.cart.user.address.state}
                              </option>
                              <option value="Delhi"></option>
                              <option value="Andra pradesh">
                                Andra pradesh
                              </option>
                              <option value="Arunachal pradesh">
                                Arunachal pradesh
                              </option>
                              <option value="Chhattisgarh">Chhattisgarh</option>
                              <option value="Maharstra">Maharastra</option>
                              <option value="Assam">Assam</option>
                              <option value="Bihar">Bihar</option>
                              <option value="Goa">Goa</option>
                              <option value="Gujrat">Gujrat</option>
                              <option value="Haryana">Haryana</option>
                              <option value="Himachal pradesh">
                                Himachal pradesh
                              </option>
                              <option value="Jharkhand">Jharkhand</option>
                              <option value="Karnataka">Karnataka</option>
                              <option value="Madhya pradesh">
                                Madhya pradesh
                              </option>
                              <option value="Kerala">Kerala</option>
                            </select>
                          </div>
                          <div
                            id="errorstate"
                            style={{
                              color: "red",
                            }}
                          ></div>
                          <div class="form-group mx-sm-3 mb-2">
                            <label for="inputPassword2" class="sr-only">
                              pincode
                            </label>
                            <input
                              type="text"
                              class="form-control"
                              id="inputPassword2"
                              placeholder={props.cart.user.address.pincode}
                              onChange={(e) => setPinCode(e.target.value)}
                            />
                            <div
                              id="errorpin"
                              style={{
                                color: "red",
                              }}
                            ></div>
                          </div>
                          <button
                            className="btn btn-outline-success"
                            onClick={(e) => handleUpdate(e)}
                          >
                            {" "}
                            Update Info
                          </button>
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
}

const mapStateToProps = ({ cart }) => {
  return {
    cart,
  };
};

const mapActionsToProps = (dispatch) => {
  return bindActionCreators(
    {
      setUserDetails,
    },
    dispatch
  );
};
export default connect(mapStateToProps, mapActionsToProps)(UpdateInfo);
