import React from 'react'
import ReactDOM from 'react-dom'

/**
 * props
 */

//  2、函数组件接收数据
//  const Hello = (props) => {
//    // props是一个对象
//    return (
//      <div>
//        <h1>props: {props.name}</h1>
//      </div>
//    )
//  }

//  2、类组件接收数据
class Hello extends React.Component {
  render() {
    console.log(this.props)
    return (
      <div>
        <h1>props:{this.props.name}</h1>
      </div>
    )
  }
}

// 1、 传递数据
 ReactDOM.render(<Hello name="rose" age={19}/>,document.getElementById('root'))