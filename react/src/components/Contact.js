import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Card.css";
class Contact extends Component {
  render() {
    return (
      <>
        <div class="bg-image1">
          {/* <h2>Contact Details:</h2> */}
          <Container>
            <Row>
              <Col sm>
                <div class="text-header5">
                  {/* <h2 style={{ color: "skyblue" }}>Contact Details:</h2> */}
                  <Card
                    style={{
                      width: "20rem",
                      color: "black",
                      backgroundColor: "skyblue",
                    }}
                  >
                    {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                    <Card.Body>
                      {/* <Card.Title c>Project Partners</Card.Title> */}
                      <Card.Text>
                        <p>
                          <b>Name:</b> <i>Aman Giri</i>
                        </p>
                        <p>
                          <b>Email Id:</b> <i>aman.giri0@gmail.com</i>
                        </p>
                        <p>
                          <b>Mobile Number:</b> <i>9074155495</i>
                        </p>
                        <p>
                          <b>Address:</b> <i>Bhilai,Chhattisgarh</i>
                        </p>
                      </Card.Text>
                      {/* <Button variant="primary">Go somewhere</Button> */}
                    </Card.Body>
                  </Card>
                </div>
              </Col>
              <col></col>
            </Row>
            {/* </Container> */}
            <Row>
              <Col sm>
                <div class="text-header5">
                  {/* <h2 style={{ color: "skyblue" }}>Contact Details:</h2> */}
                  <Card
                    style={{
                      width: "20rem",
                      color: "black",
                      backgroundColor: "skyblue",
                    }}
                  >
                    {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                    <Card.Body>
                      {/* <Card.Title c>Project Partners</Card.Title> */}
                      <Card.Text>
                        <p>
                          <b>Name:</b> <i>Akshata Naik</i>
                        </p>
                        <p>
                          <b>Email Id:</b> <i>naik.akshta@gmail.com</i>
                        </p>
                        <p>
                          <b>Mobile Number:</b> <i>98767876</i>
                        </p>
                        <p>
                          <b>Address:</b> <i>Sangali,Maharstra</i>
                        </p>
                      </Card.Text>
                      {/* <Button variant="primary">Go somewhere</Button> */}
                    </Card.Body>
                  </Card>
                </div>
              </Col>
              <col></col>
            </Row>
          </Container>
        </div>
      </>
    );
  }
}

export default Contact;
