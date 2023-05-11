import React from "react";
import PropTypes from "prop-types";

import "./../../assets/globals.scss";

const Button = ({ children, type }) => {
  return <button className={`button ${type}`}>{children}</button>;
};
Button.PropTypes = {
  children: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["primary", "secondary"]),
};

export default Button;
