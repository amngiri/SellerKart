import React, { Component } from "react";
class Navbar extends Component {
  checkForUserLogIn = () => {
    if (this.props.cart.user === null) {
      return (
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
          <div class="container-fluid">
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div class="navbar-nav">
                <a class="nav-link active" aria-current="page" href="/">
                  <strong style={{ color: "white" }}>Home</strong>
                </a>
                <a class="nav-link" href="/about">
                  <strong style={{ color: "white" }}>About</strong>
                </a>
                <a class="nav-link" href="/contact">
                  <strong style={{ color: "white" }}>Contact</strong>
                </a>
                <a class="nav-link" href="/login">
                  <strong style={{ color: "white" }}>Login/Signup</strong>
                </a>
              </div>
            </div>
          </div>
        </nav>
      );
    } else {
      return (
        <ul class="navbar-nav  auto-ml">
          <li class="nav-item">
            {this.props.cart.user.role === "RETAILER" ? (
              <a class="nav-link" href="/retailer">
                <strong style={{ color: "white" }}> Home</strong>
              </a>
            ) : (
              <>
                {this.props.cart.user.role === "ADMIN" ? (
                  <a class="nav-link" href="/admin">
                    <strong style={{ color: "white" }}> Home</strong>
                  </a>
                ) : (
                  <a class="nav-link" href="/wholesaler">
                    <strong style={{ color: "white" }}> Home</strong>
                  </a>
                )}
              </>
            )}
          </li>
          <li>
            {" "}
            <a class="nav-link" href="/about">
              <strong style={{ color: "white" }}>About</strong>
            </a>
          </li>
          <li>
            <a class="nav-link" href="/contact">
              <strong style={{ color: "white" }}>Contact</strong>
            </a>
          </li>
          <li>
            <a class="nav-link" href="#"></a>
          </li>
          <li>
            <a class="nav-link" href="#"></a>
          </li>
          <li>
            <a class="nav-link" href="#"></a>
          </li>
          <li>
            <a class="nav-link" href="#"></a>
          </li>
          <li>
            <a class="nav-link" href="#"></a>
          </li>
          <li>
            <a class="nav-link" href="#"></a>
          </li>
          <li>
            <a class="nav-link" href="#"></a>
          </li>
          <li>
            <a class="nav-link" href="#"></a>
          </li>
          <li>
            <a class="nav-link" href="#"></a>
          </li>
          <li>
            <a class="nav-link" href="#"></a>
          </li>
          <li>
            <a class="nav-link" href="#"></a>
          </li>
          <li>
            <a class="nav-link" href="#"></a>
          </li>

          <li>
            <a class="nav-link" href="#"></a>
          </li>
          <li>
            <a class="nav-link" href="#"></a>
          </li>
          <li>
            <a class="nav-link" href="#"></a>
          </li>
          <li>
            <a class="nav-link" href="#"></a>
          </li>
          <li>
            <a class="nav-link" href="#"></a>
          </li>
          <li>
            <a class="nav-link" href="#"></a>
          </li>
          <li>
            <a class="nav-link" href="#"></a>
          </li>
          <li>
            <a class="nav-link" href="#"></a>
          </li>
          <li>
            <a class="nav-link" href="#"></a>
          </li>
          <li>
            <a class="nav-link" href="#"></a>
          </li>
          <li>
            <a class="nav-link" href="#"></a>
          </li>
          <li>
            <a class="nav-link" href="#"></a>
          </li>
          <li>
            <a class="nav-link" href="#"></a>
          </li>

          <li>
            <a class="nav-link" href="#"></a>
          </li>
          <li>
            <a class="nav-link" href="#"></a>
          </li>
          <li>
            <a class="nav-link" href="#"></a>
          </li>
          <li>
            <a class="nav-link" href="#"></a>
          </li>
          <li>
            <a class="nav-link" href="#"></a>
          </li>
          <li>
            <a class="nav-link" href="#"></a>
          </li>
          <li>
            <a class="nav-link" href="#"></a>
          </li>
          <li>
            <a class="nav-link" href="#"></a>
          </li>
          <li>
            <a class="nav-link" href="#"></a>
          </li>
          <li>
            <a class="nav-link" href="#"></a>
          </li>
          <li>
            <a class="nav-link" href="#"></a>
          </li>
          <li>
            <a class="nav-link" href="#"></a>
          </li>
          <li>
            <a class="nav-link" href="#"></a>
          </li>

          <li>
            <a class="nav-link" href="#"></a>
          </li>
          <li>
            <a class="nav-link" href="#"></a>
          </li>
          <li>
            <a class="nav-link" href="#"></a>
          </li>
          <li>
            <a class="nav-link" href="#"></a>
          </li>

          <li>
            <a class="nav-link" href="#"></a>
          </li>
          <li>
            <a class="nav-link" href="#"></a>
          </li>
          <li class="nav-item">
            {this.props.cart.user.role === "RETAILER" ? (
              <a class="nav-link" href="/retailer">
                <strong style={{ color: "white" }}>
                  {" "}
                  Welcome {this.props.cart.user.name}
                </strong>
              </a>
            ) : (
              <a class="nav-link" href="/wholesaler">
                <strong style={{ color: "white" }}>
                  {" "}
                  Welcome {this.props.cart.user.name}
                </strong>
              </a>
            )}
          </li>

          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="/userprofile">
              <strong style={{ color: "white" }}>Profile</strong>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="/logout">
              <strong style={{ color: "white" }}>logout</strong>
            </a>
          </li>
        </ul>
      );
    }
  };
  render() {
    return (
      <div>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
          <a class="navbar-brand" href="#">
            <strong style={{ color: "white" }}>SellerKart</strong>
          </a>
          {this.checkForUserLogIn()}
        </nav>
      </div>
    );
  }
}

export default Navbar;
