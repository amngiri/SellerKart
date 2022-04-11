import React, { Component } from "react";
import { connect } from "react-redux";
import ApiService from "../services/ApiService";
import Toastify from "toastify-js";

class RetailerHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      retailerItem: [],
      flag: false,
      filterflag: false,
      id: 0,
      quantity: 0,
      productName: "",
      proid: 0,
      threshold_limit: 0,
      unit: "kg",
    };
    this.newquantity = 0;
    this.newlimit = 0;
    this.newname = "";
    this.newunit = "";
  }
  goToPrevOrders = () => {
    this.props.history.push("/prevorders");
  };
  handleSubmitAgain = () => {
    const { cart } = this.props;
    const { user } = cart;
    console.log("in handle submit  ", user.id);
    let userid = user.id;
    console.log("statename" + this.state.productName);
    console.log("statequan" + this.state.quantity);
    console.log("statelimit" + this.state.threshold_limit);
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
      this.state.threshold_limit === "" ||
      this.state.threshold_limit === 0 ||
      isNaN(this.state.threshold_limit)
    ) {
      document.getElementById("errorlimit").innerText =
        "invalid input for limit";
      return;
    } else {
      document.getElementById("errorlimit").innerText = "";
    }
    const addedProduct = {
      retailer: {
        id: userid,
      },

      product: {
        productName: this.state.productName,
        unit: this.state.unit,
      },

      quantity: this.state.quantity,
      threshold_limit: this.state.threshold_limit,
    };
    console.log("retailer Id" + userid);
    console.log("prod Id" + this.state.proid);
    console.log("pro name" + this.state.productName);
    console.log("quantityy" + this.state.quantity);
    console.log("thresh limit " + this.state.threshold_limit);
    console.log("unit " + this.state.unit);
    console.log("added prods " + addedProduct);

    ApiService.addItem(addedProduct)
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
        this.getRetailerItems();
      })
      .catch((err) => {
        document.getElementById("error").innerText =
          "You already have this product";
        console.log(err.toString());
      });
  };

  componentDidMount() {
    this.getRetailerItems();
  }
  filterProducts = () => {
    const { cart } = this.props;
    console.log("In cardList  ", cart);
    const { email } = cart;
    console.log("In cardList email ", email);
    const { user } = cart;
    console.log("In cardList id ", user.id);
    ApiService.getFilteredRetailerProducts(user.id)
      .then((response) => {
        const { data } = response;
        console.log(response);
        console.log(data);

        this.setState({
          isLoaded: true,
          retailerItem: response.data,
        });
      })
      .catch((err) => {
        document.getElementById("error").innerText = "";
        console.log(err.toString());
      });
  };
  getRetailerItems = () => {
    console.log("retailer home");

    const { cart } = this.props;
    console.log("In cardList  ", cart);
    const { email } = cart;
    console.log("In cardList email ", email);
    const { user } = cart;
    console.log("In cardList id ", user.id);
    ApiService.getRetailerItems(user.id)

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
            retailerItem: response.data,
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
  orderProduct = (proid, quantity) => {
    console.log(proid, quantity);

    this.props.history.push("/Retailerlist" + "/" + proid);
  };

  handleDelete = (id) => {
    console.log(id);
    const { cart } = this.props;
    const { user } = cart;
    console.log("this is user id-" + user.id);
    let userid = parseInt(user.id);
    console.log(id, userid);
    ApiService.deleteProduct(id, userid)
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
        this.getRetailerItems();
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
  changefilterflag = () => {
    this.setState({ filterflag: !this.state.filterflag });
  };
  handleUpdate = (id) => {
    console.log(id);
    this.handleSubmit(id);
  };

  handleSubmit = (id) => {
    if (
      this.state.quantity === "" ||
      this.state.quantity === undefined ||
      this.state.quantity === 0
    ) {
      Toastify({
        text: "please enter quantity.",
        duration: 5000,
        close: true,
        style: {
          background: "red",
          color: "white",
        },
      }).showToast();
      return;
    }
    let quant = parseInt(this.state.quantity);
    const { cart } = this.props;
    const { user } = cart;
    console.log("this is user id-" + user.id);
    let userid = parseInt(user.id);
    console.log(id, quant, user.id);
    ApiService.updateQuantity(id, quant, userid)
      .then((response) => {
        const { data } = response;
        console.log(response);
        console.log(data);

        Toastify({
          text: "Quantity updated.",
          duration: 3000,
          style: {
            background: "green",
            color: "white",
          },
        }).showToast();

        this.getRetailerItems();
      })
      .catch((err) => {
        Toastify({
          text: "Unable to update quantity.",
          duration: 5000,
          close: true,
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
    const { error, retailerItem, flag } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else {
      if (flag === true) {
        return (
          <div className="container-fluid ps-md-0">
            <div className="row g-0">
              <div className=" col-md-4 col-lg-6 bg-image3">
                <div className="col-md-8 col-lg-9">
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
                                <th></th>
                                <th>Product</th>
                                <th>Limit</th>
                                <th colSpan="4">Available Quantity</th>
                              </tr>
                            </thead>
                            <tbody>
                              {retailerItem.map((item) => (
                                <tr key={item.product.id}>
                                  <td>
                                    {item.quantity > item.threshold_limit ? (
                                      <button className="btn btn-outline-warning btn-small ml-2 ">
                                        Order
                                      </button>
                                    ) : (
                                      <button className="btn btn-warning btn-small ml-2 ">
                                        Order
                                      </button>
                                    )}
                                  </td>
                                  <td>{item.product.productName}</td>
                                  <td>
                                    {item.threshold_limit +
                                      " " +
                                      item.product.unit}
                                  </td>
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
                            Previous Orders
                          </button>
                          <span>&nbsp;&nbsp;</span>
                          {this.state.filterflag === false ? (
                            <button
                              className="btn btn-success ml-2 col-lg-4"
                              onClick={() => {
                                this.changefilterflag();
                                this.filterProducts();
                              }}
                            >
                              Ready to Order Products
                            </button>
                          ) : (
                            <button
                              className="btn btn-success ml-2 col-lg-2"
                              onClick={() => {
                                this.changefilterflag();
                                this.getRetailerItems();
                              }}
                            >
                              My store
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-8 col-lg-6">
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
                                  newname: e.target.value,
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
                                  newquantity: e.target.value,
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
                                  threshold_limit: e.target.value,
                                  newlimit: e.target.value,
                                });
                              }}
                              type="text"
                              class="form-control"
                              id="floatingInput"
                              placeholder="Enter threshold limit"
                              required
                            />
                            <label for="floatingInput">Threshold Limit</label>
                            <div id="errorlimit" style={{ color: "red" }}></div>
                          </div>
                          <div class="form-floating mb-3">
                            <select
                              onChange={(e) => {
                                console.log(e);

                                this.setState({
                                  unit: e.target.value,
                                  newunit: e.target.value,
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
                              onClick={() => {
                                this.handleSubmitAgain(
                                  this.newname,
                                  this.newquantity,
                                  this.newlimit,
                                  this.newunit
                                );
                              }}
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
              <div className=" col-md-4  bg-image2">
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
                                <th></th>
                                <th>Product</th>
                                <th>Limit</th>
                                <th colSpan="4">Available Quantity</th>
                              </tr>
                            </thead>
                            <tbody>
                              {retailerItem.map((item) => (
                                <tr key={item.product.id}>
                                  <td>
                                    {item.quantity >= item.threshold_limit ? (
                                      <button
                                        className="btn btn-outline-warning btn-small ml-2 "
                                        onClick={() => {
                                          this.orderProduct(
                                            item.product.id,
                                            item.quantity
                                          );
                                        }}
                                      >
                                        Order
                                      </button>
                                    ) : (
                                      <button
                                        className="btn btn-warning btn-small ml-2 "
                                        onClick={() => {
                                          this.orderProduct(
                                            item.product.id,
                                            item.quantity
                                          );
                                        }}
                                      >
                                        Order
                                      </button>
                                    )}
                                  </td>
                                  <td>{item.product.productName}</td>
                                  <td>
                                    {item.threshold_limit +
                                      " " +
                                      item.product.unit}
                                  </td>
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
                            Previous Orders
                          </button>
                          <span>&nbsp;&nbsp;</span>
                          {this.state.filterflag === false ? (
                            <button
                              className="btn btn-success ml-2 col-lg-3"
                              onClick={() => {
                                this.changefilterflag();
                                this.filterProducts();
                              }}
                            >
                              Ready to Order Products
                            </button>
                          ) : (
                            <button
                              className="btn btn-success ml-2 col-lg-2"
                              onClick={() => {
                                this.changefilterflag();
                                this.getRetailerItems();
                              }}
                            >
                              My store
                            </button>
                          )}
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

export default connect(mapStateToProps)(RetailerHome);
