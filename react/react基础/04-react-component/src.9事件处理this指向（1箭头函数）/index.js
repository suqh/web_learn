import React from 'react'
import ReactDOM from 'react-dom'

/**
 * 事件处理this指向（箭头函数)
 */
class App extends React.Component {
  state = {
    count: 0,
    test: 'a'
  }

  // 事件处理程序
  onIncrement() {
    console.log('事件处理程序中的this:'+this)
    this.setState({
        count: this.state.count + 1
    })
  }

  render () {
    return (
      <div>
        <h1>计数器：{this.state.count}</h1>
        {/* 箭头函数中的this指向外部环境，此处为：render() 方法 */}
        <button onClick={() => this.onIncrement()}>+1</button>
        {/* <button onClick={this.onIncrement}>+1</button> */}
      </div>
    )
  }
}

// 渲染组件
ReactDOM.render(<App />, document.getElementById('root'))