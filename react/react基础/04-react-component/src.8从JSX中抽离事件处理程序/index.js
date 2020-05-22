import React from 'react'
import ReactDOM from 'react-dom'

/* 
  从JSX中抽离事件处理程序
*/

class App extends React.Component {
  state = {
    count: 0
  }

  // 事件处理程序
  onIncrement() {
    console.log('事件处理程序中的this：', this)
    this.setState({
      count: this.state.count + 1
    })
  }

  render() {
    return (
      <div>
        <h1>计数器：{ this.state.count }</h1>
        <button onClick={this.onIncrement}>+1</button>
        {/* <button onClick={() => {
          this.setState({
            count: this.state.count + 1
          })
        }}>+1</button> */}
      </div>
    )
  }
}

// 渲染组件
ReactDOM.render(<App />,  document.getElementById('root'))