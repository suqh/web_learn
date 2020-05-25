import React from 'react';
import ReactDOM from 'react-dom';

/**
 * render props 模式
 */

import propTypes from 'prop-types'

// 导入图片资源
import img from './images/cat.png'

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

  // 推荐在组件卸载是移除事件绑定
  componentWillUnmount() {
    window.removeEventListener('mousemove', this.handleMouseMove)
  }

  render() {
    // return null
    // return this.props.render(this.state)
    return this.props.children(this.state)
  }
}

// 添加props校验
Mouse.propTypes = {
  children: propTypes.func.isRequired
}

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>render props 模式</h1>
        {/* <Mouse render={ mouse => {
          return <p>鼠标位置： {mouse.x} {mouse.y}</p>
        }}/> */}

        <Mouse>
         {
            mouse => {
              return (
                <p>鼠标位置： {mouse.x} {mouse.y}</p>
              )
            }
         }
        </Mouse>

        <Mouse>
          {
            mouse => <img src={img} alt="猫" style={{
              position: 'absolute',
              top: mouse.y - 64,
              left: mouse.x -64
            }}/>
          }
        </Mouse>

      {/* 猫捉老鼠 */}
      {/* <Mouse render={mouse => {
        return <img src={img} alt="猫" style={{
          position: 'absolute',
          top: mouse.y - 64,
          left: mouse.x -64
        }}/>
      }} /> */}
      </div>
    )
  }
}

ReactDOM.render(<App />,  document.getElementById('root'))
