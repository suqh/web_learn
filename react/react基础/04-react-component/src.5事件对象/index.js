import React from 'react'
import ReactDOM from 'react-dom'

/**
 * React事件对象
 */
class App extends React.Component {
  handleClick(e) {
    // 阻止浏览器的默认行为
    e.preventDefault()
    console.log('a标签的单击事件触发了')
  }
  render () {
    return (
      <a href="https://www.baidu.com" onClick={this.handleClick}>百度</a>
    )
  }
}

// 渲染组件
ReactDOM.render(<App />, document.getElementById('root'))