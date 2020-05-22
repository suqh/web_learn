import React from 'react'
import ReactDOM from 'react-dom'

/**
 * 函数组件：使用函数组件创建的组件
 * 1、函数组件必须有返回值
 * 2、组件名称必须以大写字母开头，React据此区分 组件 和 普通的 React元素
 */


// function Hello() {
//    return (
//      <div>这是我的第一个函数组件</div>
//    )
//  }

// function Hello() {
//   return null
// }

const Hello = () =>  <div>这是我的第一个函数组件</div>

//  渲染组件
 ReactDOM.render(<Hello />, document.getElementById('root'))