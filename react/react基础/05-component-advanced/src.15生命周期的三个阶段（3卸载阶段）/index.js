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
    this.setState({
      count: this.state.count + 1
    })
  }
  render() {
    console.log('生命周期钩子函数： render')
    
    return (
      <div>
        {this.state.count > 3 ? (<p>豆豆被打哭了~</p>):(<Counter count={this.state.count}/>)}
        <button onClick={this.handleClick}>打豆豆</button>
      </div>
    )
  }
}

class Counter extends React.Component {
  componentDidMount() {
    // 开启定时器
    this.timerId = setInterval(() => {
      console.log('定时器正在执行')
    },500)
  }
  render() {
    return <h1>统计豆豆被打的次数：{this.props.count}</h1>
  }

  componentWillUnmount() {
    console.warn('生命周期钩子函数：componentWillUnmount')

    // 清理定时器
    clearInterval(this.timerId)
  }
}

ReactDOM.render(<App />,  document.getElementById('root'))
