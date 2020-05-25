import React from 'react';
import ReactDOM from 'react-dom';

/**
 * render props 模式
 */

// 创建Mouse组件
class Mouse extends React.Component {
  // 鼠标位置state
  state = {
    x: 0,
    y: 0
  }

  // 鼠标移动事件的事件处理程序
  handleMouseMove = e => {
    this.setState({
      x: e.clientX,
      y: e.clientY
    })
  }

  // 监听鼠标移动事件
  componentDidMount() {
    window.addEventListener('mousemove', this.handleMouseMove)
  }

  render() {
    // return null
    return this.props.render(this.state)
  }
}

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>render props 模式</h1>
        <Mouse render={(mouse) => {
          return <p>鼠标位置： {mouse.x} {mouse.y}</p>
        }}/>
      </div>
    )
  }
}

ReactDOM.render(<App />,  document.getElementById('root'))
