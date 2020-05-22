import React from 'react'
import ReactDOM from 'react-dom'

/**
 * state的基本使用
 */
class App extends React.Component {
// 方法一：初始化state
//   constructor() {
//     super()

//     // 初始化state
//     this.state = {
//       count: 0
//     }
//   }

// 方法二：简化语法初始化state (推荐)
state = {
  count: 10
}
render () {
  return (
    <div>
      <h1>计数器：{this.state.count}</h1>
    </div>
  )
}
}

// 渲染组件
ReactDOM.render(<App />, document.getElementById('root'))