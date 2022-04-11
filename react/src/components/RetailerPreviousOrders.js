import React, { Component } from "react";
import { connect } from "react-redux";
import ApiService from "../services/ApiService";
import "./RetailerPreviousOrders.css";

class RetailerPreviousOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      quantity: 0,
      productName: "",
      proid: 0,
      threshold_limit: 0,
      allorders: [],
      wholesalerid: 0,
    };
    this.totalPrice = 0;
  }
  componentDidMount() {
    this.getAllOrders();
  }
  cancelOrder = (id, status, wholesaler, retailer, product, rate, quantity) => {
    console.log(
      "id:" + id,
      "status:" +
        status +
        "wid" +
        wholesaler +
        "rid" +
        retailer +
        "proid" +
        product +
        "rate" +
        rate +
        "quantity" +
        quantity
    );
    ApiService.cancelOrder(
      id,
      status,
      wholesaler,
      retailer,
      product,
      rate,
      quantity
    )
      .then((response) => {
        const { data } = response;
        console.log(response);
        console.log(data);
        console.log("no error1 ");
        this.getAllOrders();
        console.log("no error2 ");
      })
      .catch((err) => {
        document.getElementById("error").innerText = "error aaya";
        console.log(err.toString());
      });
  };
  handleAdd = () => {
    this.props.history.push("/retailer");
  };
  handleStatus = (
    id,
    status,
    wholesaler,
    retailer,
    product,
    rate,
    quantity
  ) => {
    ApiService.updateStatus(
      id,
      status,
      wholesaler,
      retailer,
      product,
      rate,
      quantity
    )
      .then((response) => {
        const { data } = response;
        console.log(response);
        console.log(data);
        this.getAllOrders();
      })
      .catch((err) => {
        document.getElementById("error").innerText = "";
        console.log(err.toString());
      });
  };
  handleReview = (
    id,
    review,
    wholesaler,
    retailer,
    product,
    rate,
    quantity
  ) => {
    console.log(
      "inside update review" +
        "id:" +
        id +
        "review:" +
        review +
        "wid" +
        wholesaler +
        "rid" +
        retailer +
        "proid" +
        product +
        "rate" +
        rate +
        "quantity" +
        quantity
    );
    ApiService.updateReview(
      id,
      review,
      wholesaler,
      retailer,
      product,
      rate,
      quantity
    )
      .then((response) => {
        const { data } = response;
        console.log(response);
        console.log(data);

        this.getAllOrders();
        console.log("no error2 ");
      })
      .catch((err) => {
        document.getElementById("error").innerText = "";
        console.log(err.toString());
      });
  };
  getAllOrders = () => {
    const { cart } = this.props;
    console.log("In cardList  ", cart);
    const { email } = cart;
    console.log("In cardList email ", email);
    const { user } = cart;
    console.log("In cardList id ", user.id);

    ApiService.getAllOrders(user.id)
      .then((response) => {
        const { data } = response;
        console.log(response);
        console.log("this is data" + data);
        return response;
      })
      .then(
        (response) => {
          this.setState({
            isLoaded: true,
            allorders: response.data,
          });
          console.log("all orders" + this.state.allorders);
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  };
  render() {
    const { allorders } = this.state;
    return (
      <div className="container-fluid ps-md-0">
        <div className="row g-0">
          <div className=" col-md-4 col-lg-6 bg-image2">
            <div className="col-md-12 col-lg-12">
              <div className="login d-flex align-items-right py-5">
                <div className="container">
                  <div className="row">
                    <div className="col-md-9 col-lg-11 mx-auto">
                      <h3
                        className="col-lg-3"
                        style={{
                          color: "black",
                          backgroundColor: "white",
                          textAlign: "center",
                        }}
                      >
                        <b>
                          <u>Previous Orders</u>
                        </b>
                      </h3>
                      <div id="error"></div>
                      <table className="table table-sm table-dark text-center ">
                        <thead className="thead-dark">
                          <tr>
                            <th>Action</th>
                            <th>Status</th>
                            <th>OrderDate</th>
                            <th>Wholesaler</th>
                            <th>Contact</th>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Amount</th>
                            <th>Review</th>
                          </tr>
                        </thead>
                        <tbody>
                          {allorders.map((item) => (
                            <tr key={item.id}>
                              <td>
                                {item.status === 1 ? (
                                  <button
                                    className="btn btn btn-danger ml-3 "
                                    onClick={() => {
                                      this.cancelOrder(
                                        item.id,
                                        item.status,
                                        item.wholesaler.id,
                                        item.retailer.id,
                                        item.product.id,
                                        item.order_rate,
                                        item.order_quantity
                                      );
                                    }}
                                  >
                                    Cancel
                                  </button>
                                ) : (
                                  <>
                                    {item.status === 3 ? (
                                      <button className="btn btn-success ml-2 ">
                                        Delivered
                                      </button>
                                    ) : (
                                      <>
                                        {item.status === 2 ? (
                                          <button
                                            className="btn btn-outline-danger ml-2 "
                                            disabled
                                          >
                                            Rejected
                                          </button>
                                        ) : (
                                          <button
                                            className="btn btn-outline-success ml-2 "
                                            onClick={() => {
                                              this.handleStatus(
                                                item.id,
                                                3,
                                                item.wholesaler.id,
                                                item.retailer.id,
                                                item.product.id,
                                                item.order_rate,
                                                item.order_quantity
                                              );
                                            }}
                                          >
                                            Delivered
                                          </button>
                                        )}
                                      </>
                                    )}
                                  </>
                                )}
                              </td>
                              <td>
                                {item.status === 1 ? (
                                  <p
                                    style={{
                                      color: "yellow",
                                      textAlign: "center",
                                      verticalAlign: "middle",
                                    }}
                                  >
                                    Pending
                                  </p>
                                ) : (
                                  <>
                                    {item.status === 2 ? (
                                      <p
                                        style={{
                                          color: "red",
                                          textAlign: "center",
                                          verticalAlign: "middle",
                                        }}
                                      >
                                        Rejected
                                      </p>
                                    ) : (
                                      <p
                                        style={{
                                          color: "cyan",
                                          textAlign: "center",
                                        }}
                                      >
                                        Approved
                                      </p>
                                    )}
                                  </>
                                )}
                              </td>
                              <td>{item.orderdate}</td>
                              <td>{item.wholesaler.name}</td>
                              <td>{item.wholesaler.mobileNo}</td>
                              <td>{item.product.productName}</td>
                              <td>
                                Rs.{item.order_rate + "/" + item.product.unit}
                              </td>
                              <td>
                                {item.order_quantity + " " + item.product.unit}
                              </td>
                              <td>
                                Rs.{item.order_rate * item.order_quantity}
                              </td>
                              <td>
                                {item.status !== 2 ? (
                                  <>
                                    <span>
                                      <button
                                        className={
                                          item.review >= 1 && item.status !== 2
                                            ? "star"
                                            : ""
                                        }
                                        type="submit"
                                        name="rating[rating]"
                                        value="1"
                                        onClick={() => {
                                          this.handleReview(
                                            item.id,
                                            1,
                                            item.wholesaler.id,
                                            item.retailer.id,
                                            item.product.id,
                                            item.order_rate,
                                            item.order_quantity
                                          );
                                        }}
                                      >
                                        &#9734;
                                      </button>
                                    </span>{" "}
                                    <span>
                                      <button
                                        className={
                                          item.review >= 2 && item.status !== 2
                                            ? "star"
                                            : ""
                                        }
                                        type="submit"
                                        name="rating[rating]"
                                        value="2"
                                        onClick={() => {
                                          this.handleReview(
                                            item.id,
                                            2,
                                            item.wholesaler.id,
                                            item.retailer.id,
                                            item.product.id,
                                            item.order_rate,
                                            item.order_quantity
                                          );
                                        }}
                                      >
                                        &#9734;
                                      </button>
                                    </span>
                                    <span>
                                      <button
                                        className={
                                          item.review >= 3 && item.status !== 2
                                            ? "star"
                                            : ""
                                        }
                                        type="submit"
                                        name="rating[rating]"
                                        value="3"
                                        onClick={() => {
                                          this.handleReview(
                                            item.id,
                                            3,
                                            item.wholesaler.id,
                                            item.retailer.id,
                                            item.product.id,
                                            item.order_rate,
                                            item.order_quantity
                                          );
                                        }}
                                      >
                                        &#9734;
                                      </button>
                                    </span>
                                    <span>
                                      <button
                                        className={
                                          item.review >= 4 && item.status !== 2
                                            ? "star"
                                            : ""
                                        }
                                        type="submit"
                                        name="rating[rating]"
                                        value="4"
                                        onClick={() => {
                                          this.handleReview(
                                            item.id,
                                            4,
                                            item.wholesaler.id,
                                            item.retailer.id,
                                            item.product.id,
                                            item.order_rate,
                                            item.order_quantity
                                          );
                                        }}
                                      >
                                        &#9734;
                                      </button>
                                    </span>
                                    <span>
                                      <button
                                        className={
                                          item.review >= 5 && item.status !== 2
                                            ? "star"
                                            : ""
                                        }
                                        type="submit"
                                        name="rating[rating]"
                                        value="5"
                                        onClick={() => {
                                          this.handleReview(
                                            item.id,
                                            5,
                                            item.wholesaler.id,
                                            item.retailer.id,
                                            item.product.id,
                                            item.order_rate,
                                            item.order_quantity
                                          );
                                        }}
                                      >
                                        &#9734;
                                      </button>
                                    </span>
                                  </>
                                ) : (
                                  <span>
                                    <p style={{ color: "red" }}>
                                      You can't review this order.
                                    </p>
                                  </span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <button
                        className="btn btn-success col-lg-2"
                        onClick={this.handleAdd}
                      >
                        My Store
                      </button>

                      <span>&nbsp;&nbsp;</span>
                      <button
                        className="btn btn-success ml-2 col-lg-2"
                        onClick={this.getAllOrders}
                      >
                        Refresh
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
const mapStateToProps = ({ cart }) => {
  return {
    cart,
  };
};

export default connect(mapStateToProps)(RetailerPreviousOrders);
