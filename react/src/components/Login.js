import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setUserEmail, setUserDetails } from "../redux/actions/CartAction";
import ApiService from "../services/ApiService";
import "./Login.css";
function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const authenticateUser = () => {
    if (email === "" || !email.includes("@")) {
      document.getElementById("erroremail").innerText = "@ missing";
      return;
    } else {
      document.getElementById("erroremail").innerText = "";
    }
    ApiService.authenticateUser(email, password)
      .then((response) => {
        const { data } = response;
        console.log(response);
        props.setUserEmail(data.email);
        props.setUserDetails(data);

        console.log(data);
        if (data === "") {
          document.getElementById("error").innerText =
            "Invalid Email And Password";
          return;
        }

        /*if(localStorage.getItem("user")===null)
        {
          localStorage.setItem("user",data);
          localStorage.setItem("cartinfo",null);
          
        }*/
        if (data.role === "RETAILER") {
          console.log("Inside reatiler");
          props.history.push("/retailer");
        } else if (data.role === "WHOLESALER") {
          console.log("Inside wholesaler");
          props.history.push("/wholesaler");
        } else if (data.role === "ADMIN") {
          console.log("Inside wholesaler");
          props.history.push("/admin");
        } else props.history.push("/");
      })
      .catch((err) => {
        document.getElementById("error").innerText =
          "Invalid Email And Password";
        console.log(err.toString());
      });
  };

  return (
    <>
      <div className="container-fluid ps-md-0">
        <div className="row g-0">
          {" "}
          {/* no gutter */}
          <div className=" col-md-4 col-lg-6 bg-image"></div>
          {/* for image 6 cols */}
          <div className="col-md-8 col-lg-6">
            {" "}
            {/* for login part */}
            <div className="login d-flex align-items-center py-5">
              {/* for centering of login cells */}
              <div className="container">
                <div className="row">
                  <div className="col-md-9 col-lg-8 mx-auto">
                    {/* for size of cellls occupy */}
                    <h3 className="login-heading mb-4">Welcome!</h3>
                    <br></br>
                    <div
                      id="error"
                      style={{
                        color: "red",
                      }}
                    ></div>
                    <br></br>
                    {/* <!-- Sign In Form --> */}
                    <div className="form-floating mb-3">
                      <input
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                        type="email"
                        className="form-control"
                        id="floatingInput"
                        placeholder="name@example.com"
                        required
                        autoComplete="off"
                      />
                      <label for="floatingInput">Email address</label>
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
                        required
                        autoComplete="off"
                      />
                      <label for="floatingPassword">Password</label>
                    </div>

                    <div className="d-grid">
                      <button
                        onClick={authenticateUser}
                        className="btn btn-lg btn-primary btn-login text-uppercase fw-bold mb-2 signin-button"
                      >
                        Sign in
                      </button>
                      <div className="text-center">
                        <h3 className="fs-6 lh-lg">
                          New User ? <Link to="/signup">Register Here</Link>
                        </h3>
                      </div>
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

const mapActionsToProps = (dispatch) => {
  return bindActionCreators(
    {
      setUserEmail,
      setUserDetails,
    },
    dispatch
  );
};
export default connect(mapStateToProps, mapActionsToProps)(Login);
