import React from 'react';
import ReactDOM from 'react-dom';

/**
 * 组件性能优化 纯组件
 * 内部自动实现了 shouldComponentUpdate钩子，不需要手动比较
 * 纯组件内部通过分别对比前后两次props和state的值，来决定是否重新渲染组件
 */

class App extends React.Component {
  state = {
    number: 0
  }
  handleClick = () => {
    this.setState(() => {
      return {
        number: Math.floor(Math.random() * 3)
      }
    })
  }
  render() {
    // console.log('父组件中的render')
    return (
      <div>
        {/* <h1>随机数：{this.state.number}</h1> */}
        <NumberBox number={this.state.number}></NumberBox>
        <button onClick={this.handleClick}>重新生成</button>
      </div>
    )
  }
}

class NumberBox extends React.PureComponent {
  render() {
    console.log('子组件中的render')
    return (
      <h1>随机数：{this.props.number}</h1>
    )
  }
}

ReactDOM.render(<App />,  document.getElementById('root'))
