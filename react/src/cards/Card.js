import React from "react";
import "./card-style.css";
function Card(props) {
  return (
    <>
      <div>
        <div className="card">
          <div className="card-body">
            <h6 className="card-title">{props.card.name}</h6>

            <div className="class-footer">
              RS.{props.card.price} /-
              <br />
              <button
                onClick={() => props.addCart(props.card)}
                className="btn btn-outline-success"
                style={{ margin: "10px" }}
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;
