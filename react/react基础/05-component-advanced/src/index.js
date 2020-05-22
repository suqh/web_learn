import React from 'react'
import ReactDOM from 'react-dom'

/**
 * props
 */

//  2、函数组件接收数据
//  const Hello = (props) => {
//    // props是一个对象
//    props.fn()

//   // 修改props值: 错误演示
//   // props.name = 'tom'

//    return (
//      <div>
//        <h1>props: {props.name}</h1>
//        {props.tag}
//      </div>
//    )
//  }

//  2、类组件接收数据
class Hello extends React.Component {
  // 推荐使用props作为constructor的参数
  constructor(props) {
    super(props)
    console.log(props)
  }
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
 ReactDOM.render(
  <Hello
    name="rose" 
    age={19} 
    colors={'red','green','blue'} 
    fn={() => { console.log('这是一个函数')}}
    tag={<p>这是一个p标签</p>}
 />,document.getElementById('root'))