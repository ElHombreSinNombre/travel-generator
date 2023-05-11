import React from "react";
import PropTypes from "prop-types";

import "./../../assets/globals.scss";

const Spinner = ({ type }) => {
  return (
    <div
      className={`spinner ${type} align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]`}
    />
  );
};
Spinner.PropTypes = {
  type: PropTypes.oneOf(["primary", "secondary"]),
};

export default Spinner;
