import React from 'react';
import ReactDOM from 'react-dom';

/**
 * 组件性能优化 避免不必要的重新渲染
 */

class App extends React.Component {
  state = {
    count: 0
  }

  handleClick = () => {
    this.setState(state => {
      return {
        count: state.count + 1
      }
    })
  }

  // 钩子函数
  shouldComponentUpdate(nextProps, nextState) {
    // 返回false 阻止组件重新渲染
    // return false
    // 最新的状态
    console.log('最新的state:', nextState)
    // 更新前的状态
    console.log('this.state :', this.state)
    return true
  }

  render() {
    console.log('组件更新了')
    return (
      <div>
        <h1>计数器：{this.state.count}</h1>
        <button onClick={this.handleClick}>+1</button>
      </div>
    )
  }
}

ReactDOM.render(<App />,  document.getElementById('root'))
