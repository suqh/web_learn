import React from 'react';
import ReactDOM from 'react-dom';

/**
 * 组件声明周期
 */
class App extends React.Component {
  constructor(props) {
    super(props)
    // 初始化state
    this.state = {
      count: 0
    }
  }
  handleClick = () => {
    // this.setState({
    //   count: this.state.count + 1
    // })
    // 演示强制更新
    this.forceUpdate()
  }
  render() {
    console.log('生命周期钩子函数： render')
    
    return (
      <div>
        <Counter count={this.state.count}/>
        <button onClick={this.handleClick}>打豆豆</button>
      </div>
    )
  }
}

class Counter extends React.Component {
  render() {
  console.log('---子组件----生命周期钩子函数： render')
  return <h1>统计豆豆被打的次数：{this.props.count}</h1>
  }
}

ReactDOM.render(<App />,  document.getElementById('root'))
