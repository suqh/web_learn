import React from 'react'
import ReactDOM from 'react-dom'

import './index.css'

/**
 * Context
 */

// 创建context得到两个组件
const { Provider, Consumer } = React.createContext()

//  父组件
class App extends React.Component {
  render() {
    return (
      <Provider value="pink">
        <div className="app">
          <Node />
        </div>
      </Provider>
    )
  }
}

const Node = () => {
  return (
    <div className="node">
      <SubNode />
    </div>
  )
}

const SubNode = () => {
  return (
    <div className="subNode">
      <Child />
    </div>
  )
}

const Child = () => {
  return <div className="child">
    <Consumer>
      {
        data => <span>我是子节点 ---  {data}</span>
      }
    </Consumer>
  </div>
}

// 1、 传递数据
 ReactDOM.render(<App />,document.getElementById('root'))