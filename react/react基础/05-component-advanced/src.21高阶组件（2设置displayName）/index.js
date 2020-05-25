import React from 'react';
import ReactDOM from 'react-dom';

import img from './images/cat.png'

/**
 * 高阶组件
 */

// 创建高阶组件
function withMouse(WrappedComponent) {
  // 该组件提供复用的状态逻辑
  class Mouse extends React.Component {
    // 鼠标状态
    state = {
      x: 0,
      y: 0
    }

    handleMouseMove = e => {
      this.setState({
        x: e.clientX,
        y: e.clientY
      })
    }

    // 控制鼠标状态的逻辑
    componentDidMount() {
      window.addEventListener('mousemove', this.handleMouseMove)
    }

    componentWillUnmount() {
      window.removeEventListener('mousemove', this.handleMouseMove)
    }

    render() {
      return <WrappedComponent {...this.state}></WrappedComponent>
    }
  }

  // 设置displayName
  Mouse.displayName = `WithMouse${getDisplayName(WrappedComponent)}`

  return Mouse
}

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}

// 用来测试高阶组件
const Position = props => (
  <p>
    鼠标当前位置： (x: {props.x}, y:{props.y})
  </p>
)

// 猫抓老鼠的组件
const Cat = props => (
  <img src={img} alt="" style={{
    position: 'absolute',
    top: props.y - 64,
    left: props.x - 64
  }} />
)

// 调用高阶组件来增强猫捉老鼠的组件
const MouseCat = withMouse(Cat)

// 获取增强后的组件：
const MousePosition = withMouse(Position)

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>高阶组件</h1>
        {/* 渲染增强后的组件 */}
        <MousePosition></MousePosition>
        <MouseCat></MouseCat>
      </div>
    )
  }
}

ReactDOM.render(<App />,  document.getElementById('root'))
