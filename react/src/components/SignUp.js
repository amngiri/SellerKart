import React from "react";
import { Link, Redirect } from "react-router-dom";
import { useState } from "react";
import ApiService from "../services/ApiService";
import "./Login.css";
import { connect } from "react-redux";

function SignUp(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [state, setState] = useState("Delhi");
  const [city, setCity] = useState("");
  const [pinCode, setPinCode] = useState(0);
  const [role, setRole] = useState("WHOLESALER");
  const onSignup = () => {
    if (name === "" || !isNaN(name)) {
      document.getElementById("errorname").innerText = "invalid name";
      return;
    } else {
      document.getElementById("errorname").innerText = "";
    }
    if (email === "" || !email.includes("@")) {
      document.getElementById("erroremail").innerText = "@ missing";
      return;
    } else {
      document.getElementById("erroremail").innerText = "";
    }
    if (mobileNo === "" || isNaN(mobileNo) || mobileNo.length !== 10) {
      document.getElementById("errorno").innerText = "invalid mobile number";
      return;
    } else {
      document.getElementById("errorno").innerText = "";
    }
    if (addressLine1 === "") {
      document.getElementById("erroradd1").innerText = "please enter some data";
      return;
    } else {
      document.getElementById("erroradd1").innerText = "";
    }
    if (addressLine2 === "") {
      document.getElementById("erroradd2").innerText = "please enter some data";
      return;
    } else {
      document.getElementById("erroradd2").innerText = "";
    }
    if (city === "") {
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
    const user = {
      name: name,
      email: email,
      password: password,
      mobileNo: mobileNo,

      address: {
        addressLine1: addressLine1,
        addressLine2: addressLine2,
        state: state,
        city: city,
        pincode: pinCode,
      },
      role: role,
    };
    console.log(user);

    ApiService.addUser(user)
      .then((response) => {
        const { data } = response;
        alert("Hello registering of the new account is successful", data.name);
        props.history.push("/login");
      })
      .catch((error) => {
        alert("error", error);
      });
  };
  return (
    <>
      {props.cart.user != null ? <Redirect to={{ pathname: "/list" }} /> : ""}

      <div className="row g-0">
        <div className="d-none d-md-flex col-md-4 col-lg-6 bg-image"></div>
        <div className="col-md-4 col-lg-6">
          <div className="login d-flex align-items-center py-5">
            <div className="container">
              <div className="row">
                <div className="col-md-9 col-lg-8 mx-auto">
                  <h3 className="login-heading mb-4">Register Here!</h3>

                  {/* <!-- Sign Up Form --> */}
                  <div className="form-floating mb-3">
                    <input
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                      type="text"
                      className="form-control"
                      id="floatingInput"
                      placeholder="name@example.com"
                    />
                    <label for="floatingInput">Name</label>
                    <div
                      id="errorname"
                      style={{
                        color: "red",
                      }}
                    ></div>
                  </div>

                  <div className="form-floating mb-3">
                    <input
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      type="email"
                      className="form-control"
                      id="floatingInput"
                      placeholder="name@example.com"
                    />
                    <label for="floatingInput">Email</label>
                    <div
                      id="erroremail"
                      style={{
                        color: "red",
                      }}
                    ></div>
                  </div>

                  <div className="form-floating mb-3">
                    <input
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      type="password"
                      className="form-control"
                      id="floatingPassword"
                      placeholder="Password"
                    />
                    <label for="floatingPassword">Password</label>
                  </div>

                  <div className="form-floating mb-3">
                    <input
                      onChange={(e) => {
                        setMobileNo(e.target.value);
                      }}
                      type="number"
                      className="form-control"
                      id="floatingInput"
                      placeholder="name@example.com"
                    />
                    <label for="floatingInput">Mobile Number</label>
                    <div
                      id="errorno"
                      style={{
                        color: "red",
                      }}
                    ></div>
                  </div>

                  <div className="form-floating mb-3">
                    <input
                      onChange={(e) => {
                        setAddressLine1(e.target.value);
                      }}
                      type="text"
                      className="form-control"
                      id="floatingInput"
                      placeholder="name@example.com"
                    />
                    <label for="floatingInput">Address Line 1</label>
                    <div
                      id="erroradd1"
                      style={{
                        color: "red",
                      }}
                    ></div>
                  </div>

                  <div className="form-floating mb-3">
                    <input
                      onChange={(e) => {
                        setAddressLine2(e.target.value);
                      }}
                      type="text"
                      className="form-control"
                      id="floatingInput"
                      placeholder="name@example.com"
                    />
                    <label for="floatingInput">Address Line 2</label>
                    <div
                      id="erroradd2"
                      style={{
                        color: "red",
                      }}
                    ></div>
                  </div>

                  <div className="form-floating mb-3">
                    <input
                      onChange={(e) => {
                        setCity(e.target.value);
                      }}
                      type="text"
                      className="form-control"
                      id="floatingInput"
                      placeholder="name@example.com"
                    />
                    <label for="floatingInput">City</label>
                    <div
                      id="errorcity"
                      style={{
                        color: "red",
                      }}
                    ></div>
                  </div>

                  <div class="form-floating mb-3">
                    <select
                      class="form-select"
                      id="floatingSelect"
                      aria-label="Floating label select example"
                      onChange={(e) => {
                        setState(e.target.value);
                        console.log(e.target.value);
                      }}
                    >
                      <option value="Delhi">Delhi</option>
                      <option value="Andra pradesh">Andra pradesh</option>
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
                      <option value="Himachal pradesh">Himachal pradesh</option>
                      <option value="Jharkhand">Jharkhand</option>
                      <option value="Karnataka">Karnataka</option>
                      <option value="Madhya pradesh">Madhya pradesh</option>
                      <option value="Kerala">Kerala</option>
                    </select>
                    <label for="floatingSelect">State</label>
                  </div>

                  <div className="form-floating mb-3">
                    <input
                      onChange={(e) => {
                        setPinCode(e.target.value);
                      }}
                      type="number"
                      className="form-control"
                      id="floatingInput"
                      placeholder="name@example.com"
                    />
                    <label for="floatingInput">Pincode</label>
                    <div
                      id="errorpin"
                      style={{
                        color: "red",
                      }}
                    ></div>
                  </div>

                  <div class="form-floating mb-3">
                    <select
                      class="form-select"
                      id="floatingSelect"
                      aria-label="Floating label select example"
                      onChange={(e) => {
                        setRole(e.target.value);
                        console.log(e.target.value);
                      }}
                    >
                      <option value="WHOLESALER">WHOLESALER</option>
                      <option value="RETAILER">RETAILER</option>
                    </select>
                    <label for="floatingSelect">Role</label>
                  </div>
                  <div className="d-grid">
                    <button
                      onClick={onSignup}
                      className="btn btn-lg btn-primary btn-login text-uppercase fw-bold mb-2 signin-button"
                    >
                      Sign up
                    </button>
                    <div className="text-center">
                      <h3 className="fs-6 lh-lg">
                        Already Registered ? <Link to="/login">Login Here</Link>
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
const mapStateToProps = ({ cart }) => {
  return {
    cart,
  };
};
export default connect(mapStateToProps)(SignUp);
