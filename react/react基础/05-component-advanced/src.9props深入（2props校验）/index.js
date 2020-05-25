import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from  'prop-types'

import './index.css'

/**
 * props 校验
 */

const App = props => {
  const arr = props.colors
  const list = arr.map((item, index) => <li key={index}>{item}</li>)
  return <ul>{list}</ul>
}

// 添加props检验
App.propTypes = {
  colors: PropTypes.array
}

 ReactDOM.render(<App colors={['red', 'blue']}/>,document.getElementById('root'))