import React from 'react';
import ReactDOM from 'react-dom';

/**
 * 组件性能优化 随机数案例
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
  // 因为两次生成的随机数可能相同，如果相同，此时，不需要重新渲染
  // shouldComponentUpdate(nextProps,nextState) {
  //   console.log('最新状态：',nextState,'当前状态',this.state)
  //   return nextState.number !== this.state.number
  // }
  render() {
    // console.log('render')
    return (
      <div>
        <NumberBox number={this.state.number}></NumberBox>
        <button onClick={this.handleClick}>重新生成</button>
      </div>
    )
  }
}

class NumberBox extends React.Component {
  render() {
    console.log('子组件中的render')
    return (
      <h1>随机数：{this.props.number}</h1>
    )
  }
  shouldComponentUpdate(nextProps) {
    console.log('最新props:',nextProps,'当前props:',this.props)
    // 如果前后两次的number值相同，就返回false,不更新组件
    return nextProps.number !== this.props.number
    // if (nextProps.number === this.props.number) {
    //   return false
    // }
    // return true
  }
}

ReactDOM.render(<App />,  document.getElementById('root'))
