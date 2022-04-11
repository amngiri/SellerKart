import React, { Component } from "react";
import { connect } from "react-redux";
import ApiService from "../services/ApiService";
import Toastify from "toastify-js";

class RetailerList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flag: false,
      id: 0,
      quantity: 0,
      productName: "",
      proid: 0,
      threshold_limit: 0,
      wholesalerList: [],
      wholesalerid: 0,
      rate: 0,
    };
    this.totalPrice = 0;
  }
  componentDidMount() {
    console.log("inside component did mount");
    this.getWholesalerList();
  }

  orderProduct = (
    wholesalerid,
    rate,
    orderquantity,
    quantity,
    wholesalername,
    productname,
    unit
  ) => {
    if (
      orderquantity === "" ||
      orderquantity === 0 ||
      orderquantity === undefined
    ) {
      Toastify({
        text: "Please enter some quantity.",
        duration: 3000,
        style: {
          background: "red",
          color: "white",
        },
      }).showToast();
      return;
    }
    console.log(wholesalerid);
    const { cart } = this.props;
    const { user } = cart;
    let userid = parseInt(user.id);
    let quant = parseInt(this.state.quantity);
    console.log("retailer id" + userid);
    console.log("wholesaler id" + wholesalerid);
    console.log("qauntity:" + quant);
    const proid = this.props.match.params.productId;
    const status = 1;
    console.log("productid:" + proid);
    console.log("status:" + status);

    console.log("rate" + rate);
    console.log("orderquantity" + orderquantity);
    console.log("quantity" + quantity);
    const newdate = new Date();
    var dd = String(newdate.getDate()).padStart(2, "0");
    var mm = String(newdate.getMonth() + 1).padStart(2, "0");
    var yy = String(newdate.getFullYear());
    var date = yy + "-" + mm + "-" + dd;
    if (orderquantity < quantity) {
      Toastify({
        text:
          " order placed to: " +
          wholesalername +
          "\nProduct: " +
          productname +
          "\nQuantity: " +
          orderquantity +
          unit +
          "\nTotal Amount: Rs" +
          orderquantity * rate,
        duration: 3000,
        style: {
          background: "green",
          color: "white",
        },
      }).showToast();

      const orderplace = {
        retailer: {
          id: user.id,
        },
        product: {
          id: this.props.match.params.productId,
        },
        wholesaler: {
          id: wholesalerid,
        },
        order_date: date,
        order_rate: rate,
        order_quantity: this.state.quantity,
        status: status,
      };
      console.log("product id:" + this.props.match.params.productId);
      console.log("wholesalerid" + wholesalerid);
      console.log("retailerid" + userid);
      console.log("status" + status);
      console.log("quantity" + this.state.quantity);

      console.log("date:" + date);

      console.log("new product: " + orderplace);
      ApiService.placeOrder(orderplace)
        .then((response) => {
          const { data } = response;
          console.log(response);
          console.log("data is:" + data);
          if (data === "") {
            document.getElementById("error").innerText =
              "Invalid Email And Password";
            return;
          }

          this.props.history.push("/prevorders");
          return response;
        })

        .catch((err) => {
          document.getElementById("error").innerText = "cant order";
          console.log(err.toString());
        });
    } else if (orderquantity > quantity) {
      Toastify({
        text:
          wholesalername +
          " donot have enough supply to fullfill your demand\nplease try with anyother supplier",
        duration: 3000,
        style: {
          background: "red",
          color: "white",
        },
      }).showToast();
    }
  };

  gobackfuntion = () => {
    console.log("inside go back funtion");

    if (this.props.cart.user.role === "RETAILER") {
      this.props.history.push("/retailer");
    } else if (this.props.cart.user.role === "WHOLESALER") {
      this.props.history.push("/wholesaler");
    } else if (this.props.cart.user.role === "ADMIN") {
      this.props.history.push("/admin");
    }
  };
  handleQuantity = (quantity) => {
    console.log("inside handle quantity");
    console.log(quantity);
  };
  handleAdd = () => {
    this.props.history.push("/retailer");
  };

  getWholesalerList = () => {
    console.log("wholesalerList");

    const { cart } = this.props;
    console.log("In cardList  ", cart);
    const { email } = cart;
    console.log("In cardList email ", email);
    const { user } = cart;
    console.log("In cardList id ", user.id);

    const proid = this.props.match.params.productId;

    ApiService.getWholesalerList(proid)
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
            wholesalerList: response.data,
            productName: response.data[0]?.product.productName,
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
  prevorders = () => {
    this.props.history.push("/prevorders");
  };
  render() {
    const { wholesalerList } = this.state;

    const { cart } = this.props;
    console.log("In cardList  ", cart);
    const { email } = cart;
    console.log("In cardList email ", email);

    return (
      <div className="container-fluid ps-md-0">
        <div className="row g-0">
          <div className=" col-md-4 col-lg-6 bg-image2">
            <div className="col-md-8 col-lg-12">
              <div className="login d-flex align-items-right py-5">
                <div className="container">
                  <div className="row">
                    <div className="col-md-9 col-lg-9 mx-auto">
                      {wholesalerList.length !== 0 ? (
                        <>
                          <h4
                            className="col-lg-5"
                            style={{
                              color: "black",
                              backgroundColor: "white",
                              textAlign: "center",
                            }}
                          >
                            <b>
                              <u>
                                Wholesalers List for : {this.state.productName}
                              </u>
                            </b>
                          </h4>

                          <table className="table table-sm table-dark text-center ">
                            <thead className="thead-dark">
                              <tr>
                                <th>Wholesaler</th>
                                <th>Contact</th>
                                <th>Rating</th>
                                <th>Quantity</th>
                                <th>Unit Price</th>
                                <th>Order Quantity</th>
                                <th>Total Price</th>
                                <th colSpan="3">Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {wholesalerList.map((item) => (
                                <tr key={item.wholesaler.id}>
                                  <td>{item.wholesaler.name}</td>
                                  <td>{item.wholesaler.mobileNo}</td>
                                  <td>{item.wholesaler.averageReview}</td>
                                  <td>
                                    {item.quantity + " " + item.product.unit}
                                  </td>
                                  <td>
                                    Rs.{item.rate + "/" + item.product.unit}
                                  </td>
                                  <td>
                                    <input
                                      type="number"
                                      style={{
                                        width: "30per",
                                        height: "10per",
                                        textAlign: "center",
                                      }}
                                      placeholder="enter quantity"
                                      onChange={(e) => {
                                        console.log(e);
                                        this.setState({
                                          quantity: e.target.value,
                                        });
                                        item.order_quantity = e.target.value;
                                      }}
                                    />
                                  </td>
                                  <td>
                                    Rs.{item.rate * (item.order_quantity ?? 0)}
                                  </td>
                                  <td>
                                    <button
                                      className="btn btn-warning btn-small ml-2 "
                                      onClick={() => {
                                        this.handleQuantity(
                                          item.order_quantity
                                        );
                                        this.orderProduct(
                                          item.wholesaler.id,
                                          item.rate,
                                          item.order_quantity,
                                          item.quantity,
                                          item.wholesaler.name,
                                          item.product.productName,
                                          item.product.unit
                                        );
                                      }}
                                    >
                                      Order
                                    </button>
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
                            onClick={this.prevorders}
                          >
                            Previous Orders
                          </button>
                          <span>&nbsp;&nbsp;</span>
                        </>
                      ) : (
                        <>
                          <h4
                            className="col-lg-12"
                            style={{
                              color: "black",
                              backgroundColor: "white",
                              textAlign: "center",
                            }}
                          >
                            <b>
                              <br></br>
                              we are sorry
                              <br></br>
                              <br></br>
                              No Wholesaler sells this product
                              <br></br>
                            </b>
                          </h4>
                          <button
                            className="btn btn-success col-lg-2"
                            onClick={this.gobackfuntion}
                          >
                            My Store
                          </button>
                        </>
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

const mapStateToProps = ({ cart }) => {
  return {
    cart,
  };
};

export default connect(mapStateToProps)(RetailerList);
