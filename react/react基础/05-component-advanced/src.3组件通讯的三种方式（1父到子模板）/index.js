import React from 'react'
import ReactDOM from 'react-dom'

import './index.css'
/* 
  props
*/

// 父组件
class Parent extends React.Component {
  state = {}

  render() {
    return (
      <div className="parent">
        父组件：
        <Child />
      </div>
    )
  }
}

// 子组件
const Child = () => {
  return (
    <div className="child">
      <p>子组件，接收到父组件的数据：</p>
    </div>
  )
}

ReactDOM.render(<Parent />, document.getElementById('root'))
