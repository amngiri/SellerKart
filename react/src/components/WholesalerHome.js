import React, { Component } from "react";
import { connect } from "react-redux";
import ApiService from "../services/ApiService";
import Toastify from "toastify-js";
class WholesalerHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wholesalerItem: [],
      flag: false,
      id: 0,
      quantity: 0,
      rate: 0,
      productName: "",
      proid: 0,
      unit: "kg",
    };
  }
  goToPrevOrders = () => {
    this.props.history.push("/acceptorders");
  };
  handleSubmitAgain = () => {
    const { cart } = this.props;
    const { user } = cart;
    console.log("in handle submit  ", user.id);
    let userid = user.id;
    console.log("statename" + this.state.productName);
    console.log("statequan" + this.state.quantity);
    console.log("statelimit" + this.state.rate);
    console.log("stateunit" + this.state.unit);

    if (this.state.productName === "" || !isNaN(this.state.productName)) {
      document.getElementById("errorname").innerText = "invalid productname";
      return;
    } else {
      document.getElementById("errorname").innerText = "";
    }
    if (
      this.state.quantity === "" ||
      this.state.quantity === 0 ||
      isNaN(this.state.quantity)
    ) {
      document.getElementById("errorquantity").innerText =
        "invalid input for quantity";
      return;
    } else {
      document.getElementById("errorquantity").innerText = "";
    }
    if (
      this.state.rate === "" ||
      this.state.rate === 0 ||
      isNaN(this.state.rate)
    ) {
      document.getElementById("errorlimit").innerText =
        "invalid input for rate";
      return;
    } else {
      document.getElementById("errorlimit").innerText = "";
    }
    const addedProduct = {
      wholesaler: {
        id: userid,
      },

      product: {
        productName: this.state.productName,
        unit: this.state.unit,
      },

      quantity: this.state.quantity,
      rate: this.state.rate,
    };
    console.log("retailer Id" + userid);
    console.log("prod Id" + this.state.proid);
    console.log("pro name" + this.state.productName);
    console.log("quantityy" + this.state.quantity);
    console.log("rate " + this.state.rate);
    console.log("added prods " + addedProduct);

    ApiService.wholesaleraddItem(addedProduct)
      .then((response) => {
        const { data } = response;
        console.log(response);
        console.log(data);
        document.getElementById("error").innerText = "";
        if (data === "") {
          document.getElementById("error").innerText =
            "all feilds are mandatory";
          return;
        }
        this.getWholesalerItems();
      })
      .catch((err) => {
        document.getElementById("error").innerText =
          "You already have this product";
        console.log(err.toString());
      });
  };
  componentDidMount() {
    this.getWholesalerItems();
  }
  getWholesalerItems = () => {
    console.log("Wholesaler home");

    const { cart } = this.props;
    console.log("In cardList  ", cart);
    const { email } = cart;
    console.log("In cardList email ", email);
    const { user } = cart;
    console.log("In cardList id ", user.id);
    ApiService.getWholesalerItems(user.id)
      .then((response) => {
        const { data } = response;
        console.log(response);
        console.log(data);
        return response;
      })
      .then(
        (response) => {
          this.setState({
            isLoaded: true,
            wholesalerItem: response.data,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  };

  handleDelete = (id) => {
    console.log(id);
    const { cart } = this.props;
    const { user } = cart;
    console.log("this is user id-" + user.id);
    let userid = parseInt(user.id);
    console.log(id, userid);
    ApiService.wholesalerdeleteProduct(id, userid)
      .then((response) => {
        const { data } = response;
        console.log(response);
        console.log(data);
        Toastify({
          text: "item deleted.",
          duration: 3000,
          style: {
            background: "green",
            color: "white",
          },
        }).showToast();
        this.getWholesalerItems();
      })
      .catch((err) => {
        Toastify({
          text: "unable to delete.",
          duration: 3000,
          style: {
            background: "green",
            color: "white",
          },
        }).showToast();
        document.getElementById("error").innerText = "";
        console.log(err.toString());
      });
  };
  handleAdd = () => {
    this.setState({ flag: !this.state.flag });
  };
  handleUpdate = (id) => {
    console.log(id);
    this.handleSubmit(id);
  };
  handleSubmit = (id) => {
    if (
      (this.state.quantity === "" ||
        this.state.quantity === undefined ||
        this.state.quantity === 0) &&
      (this.state.rate === "" ||
        this.state.rate === undefined ||
        this.state.rate === 0)
    ) {
      Toastify({
        text: "Please enter quantity.",
        duration: 3000,
        style: {
          background: "red",
          color: "white",
        },
      }).showToast();
      return;
    }

    let quant = parseInt(this.state.quantity);
    let rate = parseInt(this.state.rate);
    const { cart } = this.props;
    const { user } = cart;
    console.log("this is user id-" + user.id);
    let userid = parseInt(user.id);
    console.log(id, quant, user.id);
    console.log("inside update state quantity:" + this.state.quantity);
    console.log("inside update state rate:" + this.state.rate);
    ApiService.wholesalerupdateQuantity(id, quant, rate, userid)
      .then((response) => {
        const { data } = response;
        console.log(response);
        console.log(data);
        Toastify({
          text: "update successfull.",
          duration: 3000,
          style: {
            background: "green",
            color: "white",
          },
        }).showToast();
        this.getWholesalerItems();
      })
      .catch((err) => {
        Toastify({
          text: "Unable to update.",
          duration: 3000,
          style: {
            background: "red",
            color: "white",
          },
        }).showToast();
        document.getElementById("error").innerText = "";
        console.log(err.toString());
      });
  };
  handleQuantity = (quantity) => {
    console.log("inside handle quantity");
    console.log(quantity);
  };
  render() {
    const { error, wholesalerItem, flag } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else {
      if (flag === true) {
        return (
          <div className="container-fluid ps-md-0">
            <div className="row g-0">
              <div className=" col-md-4 col-lg-6 bg-image4">
                <div className="col-md-12 col-lg-12">
                  <div className="login d-flex align-items-right py-5">
                    <div className="container">
                      <div className="row">
                        <div className="col-md-9 col-lg-11 mx-auto">
                          <h3
                            className="col-lg-4"
                            style={{
                              color: "black",
                              backgroundColor: "white",
                              textAlign: "center",
                            }}
                          >
                            <b>
                              <u>My Store</u>
                            </b>
                          </h3>
                          <table className="table table-sm table-dark text-center ">
                            <thead className="thead-dark">
                              <tr>
                                <th>Product</th>
                                <th>Available Quantity</th>
                                <th>Rate</th>
                                <th colSpan="2">Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {wholesalerItem.map((item) => (
                                <tr key={item.product.id}>
                                  <td>{item.product.productName}</td>
                                  <td>
                                    <input
                                      type="number"
                                      style={{
                                        width: "75per",
                                        height: "10per",
                                        textAlign: "center",
                                      }}
                                      placeholder={
                                        item.quantity + " " + item.product.unit
                                      }
                                    />
                                  </td>
                                  <td>
                                    Rs.{item.rate + "/" + item.product.unit}
                                  </td>

                                  <td>
                                    <button
                                      className="btn btn-success ml-6"
                                      onClick={() => {
                                        this.handleQuantity(
                                          this.state.quantity
                                        );
                                        this.handleUpdate(item.product.id);
                                      }}
                                    >
                                      update
                                    </button>
                                  </td>
                                  <td>
                                    <button
                                      className="btn btn-danger ml-6"
                                      onClick={() => {
                                        this.handleDelete(item.product.id);
                                      }}
                                    >
                                      delete
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                          <button
                            className="btn btn-success col-lg-3"
                            onClick={this.handleAdd}
                          >
                            Add New Product
                          </button>
                          <span>&nbsp;&nbsp;</span>
                          <button
                            className="btn btn-success ml-2 col-lg-3"
                            onClick={this.goToPrevOrders}
                          >
                            Orders Received
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className=" col-md-8 col-lg-6">
                <div>
                  <button
                    type="button"
                    class="btn-close"
                    aria-label="Close"
                    onClick={this.handleAdd}
                  ></button>
                </div>
                <div className="login d-flex ">
                  <div className="container">
                    <div className="row">
                      <div className="col-md-9 col-lg-8 mx-auto">
                        <div className="form-floating mb-3">
                          <br></br>
                          <br></br>
                          <br></br>

                          <h6>Add New Product:</h6>
                          <br></br>
                          <div id="error" style={{ color: "red" }}></div>
                          <br></br>
                          <div className="form-floating mb-3">
                            <input
                              onChange={(e) => {
                                console.log(e);

                                this.setState({
                                  productName: e.target.value,
                                });
                              }}
                              type="text"
                              class="form-control"
                              id="floatingInput"
                              placeholder="Enter Product Name"
                              required
                            />
                            <div id="errorname" style={{ color: "red" }}></div>
                            <label for="floatingInput">Product Name</label>
                          </div>
                          <div className="form-floating mb-3">
                            <input
                              onChange={(e) => {
                                console.log(e);

                                this.setState({
                                  quantity: e.target.value,
                                });
                              }}
                              type="text"
                              class="form-control"
                              id="floatingInput"
                              placeholder="Enter quantity"
                              required
                            />
                            <label for="floatingInput">Quantity</label>
                            <div
                              id="errorquantity"
                              style={{ color: "red" }}
                            ></div>
                          </div>
                          <div className="form-floating mb-3">
                            <input
                              onChange={(e) => {
                                console.log(e);

                                this.setState({
                                  rate: e.target.value,
                                });
                              }}
                              type="text"
                              class="form-control"
                              id="floatingInput"
                              placeholder="Enter threshold limit"
                            />
                            <label for="floatingInput">Rate</label>
                            <div id="errorlimit" style={{ color: "red" }}></div>
                          </div>
                          <div class="form-floating mb-3">
                            <select
                              onChange={(e) => {
                                console.log(e);

                                this.setState({
                                  unit: e.target.value,
                                });
                              }}
                              type="text"
                              class="form-control"
                              id="floatingInput"
                              placeholder="Enter unit"
                              required
                            >
                              <option value="kg">kg</option>
                              <option value="litre">litre</option>
                              <option value="gram">gram</option>
                              <option value="packet">packet</option>
                              <option value="ml">ml</option>
                              <option value="number">number</option>
                            </select>
                            <label for="floatingSelect">Unit</label>
                          </div>
                          <div className="d-grid">
                            <button
                              onClick={this.handleSubmitAgain}
                              className="btn btn-lg btn-primary btn-login text-uppercase fw-bold mb-2 signin-button"
                            >
                              Submit
                            </button>
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
        return (
          <div className="container-fluid ps-md-0">
            <div className="row g-0">
              <div className=" col-md-4  bg-image6">
                <div className="col-md-12 col-lg-12">
                  <div className="login d-flex align-items-right py-5">
                    <div className="container">
                      <div className="row">
                        <div className="col-md-9 col-lg-9 mx-auto">
                          <h3
                            className="col-lg-2"
                            style={{
                              color: "black",
                              backgroundColor: "white",
                              textAlign: "center",
                            }}
                          >
                            <b>
                              <u>My Store</u>
                            </b>
                          </h3>
                          <div id="error"></div>
                          <table className="table table-sm table-dark text-center ">
                            <thead className="thead-dark">
                              <tr>
                                <th>Product</th>
                                <th>Available Quantity</th>
                                <th>Rate</th>
                                <th colSpan="2">Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {wholesalerItem.map((item) => (
                                <tr key={item.product.id}>
                                  <td>{item.product.productName}</td>
                                  <td>
                                    <input
                                      type="number"
                                      style={{
                                        width: "30per",
                                        height: "10per",
                                        textAlign: "center",
                                      }}
                                      placeholder={
                                        item.quantity + " " + item.product.unit
                                      }
                                      onChange={(e) => {
                                        console.log(e);

                                        this.setState({
                                          quantity: e.target.value,
                                        });
                                      }}
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="number"
                                      style={{
                                        width: "30per",
                                        height: "10per",
                                        textAlign: "center",
                                        size: "5",
                                      }}
                                      placeholder={
                                        item.rate + " /" + item.product.unit
                                      }
                                      onChange={(e) => {
                                        console.log(e);

                                        this.setState({
                                          rate: e.target.value,
                                        });
                                      }}
                                    />
                                  </td>
                                  <td>
                                    <button
                                      className="btn btn-success ml-6"
                                      onClick={() => {
                                        this.handleQuantity(
                                          this.state.quantity
                                        );
                                        this.handleUpdate(item.product.id);
                                      }}
                                    >
                                      update
                                    </button>
                                  </td>
                                  <td>
                                    <button
                                      className="btn btn-danger ml-6"
                                      onClick={() => {
                                        this.handleDelete(item.product.id);
                                      }}
                                    >
                                      delete
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                          <button
                            className="btn btn-success col-lg-3"
                            onClick={this.handleAdd}
                          >
                            Add New Product
                          </button>
                          <span>&nbsp;&nbsp;</span>
                          <button
                            className="btn btn-success ml-2 col-lg-3"
                            onClick={this.goToPrevOrders}
                          >
                            Orders Received
                          </button>
                          <span>&nbsp;&nbsp;</span>
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
    }
  }
}
const mapStateToProps = ({ cart }) => {
  return {
    cart,
  };
};

export default connect(mapStateToProps)(WholesalerHome);
