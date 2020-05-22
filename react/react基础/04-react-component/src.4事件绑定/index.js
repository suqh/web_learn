import React from 'react'
import ReactDOM from 'react-dom'

/**
 * React事件处理
 */
class App extends React.Component {
  // 事件处理程序
  handleClick() {
    console.log('单击事件触发了')
  }
  render () {
    return (
      <button onClick={this.handleClick}>点我，点我</button>
    )
  }
}

// 通过函数组件绑定事件
function App2() {
  function handleClick() {
    console.log('函数组件中的事件绑定，事件触发了')
  }
  return (
    <button onClick={handleClick}>点我</button>
  )
}

// 渲染组件
ReactDOM.render(<App2 />, document.getElementById('root'))