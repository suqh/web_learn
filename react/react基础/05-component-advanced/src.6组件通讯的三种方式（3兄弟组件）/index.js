import React from 'react'
import ReactDOM from 'react-dom'

import './index.css'
/**
 * props
 */

//  父组件
class Counter extends React.Component {
  // 提供共享状态
  state = {
    count: 0
  }
  // 提供修改状态的方法
  onIncrement = () => {
    this.setState({
      count: this.state.count + 1
    })
  }

  render() {
    return (
      <div>
        <Child1 count={this.state.count}/>
        <Child2 onIncrement={this.onIncrement}/>
      </div>
    )
  }
}

const Child1 = (props) => {
return <h1>计数器：{props.count}</h1>
}

const Child2 = (props) => {
  return <button onClick={() => props.onIncrement()}>+1</button>
}

// 1、 传递数据
 ReactDOM.render(<Counter />,document.getElementById('root'))