import React from "react";
import "./Card.css";
const Card = (props) => {
  return (
    <div className="Card">
      <div className="Card-title">{props.title}</div>
      <div className="Card-content">{props.content}</div>
    </div>
  );
};
export default Card;
