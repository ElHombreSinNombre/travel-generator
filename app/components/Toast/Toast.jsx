import React from 'react'
import PropTypes from 'prop-types'

import '@/assets/globals.scss'

const Toast = ({ children, type }) => {
  return <div className={`toast ${type}`}>{children}</div>
}
Toast.PropTypes = {
  children: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['primary', 'secondary', 'error'])
}

export default Toast
