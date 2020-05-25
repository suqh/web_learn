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
    // 演示强制更新
    // this.forceUpdate()
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
  return <h1 id="title">统计豆豆被打的次数：{this.props.count}</h1>
  }

  // 注意，如果要调用 setState() 更新状态，必须要放在一个 if 条件中
  // 因为： 如果直接调用 setState() 更新状态，也会导致递归更新！！
  componentDidUpdate(prevProps) {
    console.warn('---子组件----生命周期钩子函数： componentDidUpdate')

    // 正确做法：
    // 做法： 比较更新前后的props是否相同，来决定是否重新渲染组件
    console.log('上一次的props:', prevProps, ',当前的props:', this.props)
    if (prevProps.count !== this.props.count) {
      // this.setState({})
      // 发送ajax请求的代码
    }

    // 错误演示！！
    // this.setState({})

    // 获取DOM
    const title = document.getElementById('title')
    console.log(title.innerHTML)
  }
}

ReactDOM.render(<App />,  document.getElementById('root'))
