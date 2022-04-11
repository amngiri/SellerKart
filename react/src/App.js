import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Navbar from "./components/layout/Navbar";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Footer from "./components/layout/Footer";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import { connect } from "react-redux";
import React from "react";
import LogOut from "./components/LogOut";
import UserProfile from "./components/UserProfile";
import UpdateInfo from "./components/UpdateInfo";
import RetailerHome from "./components/RetailerHome";
import RetailerList from "./components/RetailerList";
import WholesalerHome from "./components/WholesalerHome";
import RetailerPreviousOrders from "./components/RetailerPreviousOrders";
import WholesalerAcceptOrders from "./components/WholesalerAcceptOrders";
import wholesalerlistadmin from "./components/wholesalerlistadmin";
import lessreviewlist from "./components/lessreviewlist";
import AdminHome from "./components/AdminHome";
import retailerlistadmin from "./components/retailerlistadmin";

class App extends React.Component {
  render() {
    return (
      <>
        <Router>
          <div>
            <Navbar cart={this.props.cart} />
            <switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/about" component={About} />
              <Route exact path="/contact" component={Contact} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={SignUp} />

              <Route
                exact
                path="/Retailerlist/:productId"
                component={RetailerList}
              />
              <Route
                exact
                path="/prevorders"
                component={RetailerPreviousOrders}
              />
              <Route
                exact
                path="/acceptorders"
                component={WholesalerAcceptOrders}
              />
              <Route exact path="/retailer" component={RetailerHome} />
              <Route exact path="/wholesaler" component={WholesalerHome} />
              <Route
                exact
                path="/wholesalerlist"
                component={wholesalerlistadmin}
              />

              <Route exact path="/lessreviewlist" component={lessreviewlist} />
              <Route
                exact
                path="/retailerlistadmin"
                component={retailerlistadmin}
              />
              <Route exact path="/admin" component={AdminHome} />
              <Route exact path="/logout" component={LogOut} />
              <Route exact path="/userprofile" component={UserProfile} />
              <Route exact path="/updateinfo" component={UpdateInfo} />
            </switch>
          </div>
        </Router>
        <Footer />
      </>
    );
  }
}
const mapStateToProps = ({ cart }) => {
  return {
    cart,
  };
};

export default connect(mapStateToProps)(App);
