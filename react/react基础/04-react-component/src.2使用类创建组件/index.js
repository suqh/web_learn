import React from 'react'
import ReactDOM from 'react-dom'

/**
 * 类组件
 * 1、类名称也必须以大写字母开头
 * 2、类名称应该继承React.Component父类，从而可以使用父类中提供的方法或属性
 * 3、类组件必须提供render() 方法
 * 4、render()方法必须有返回值，表示该组件的结构
 */

// 创建类组件
class Hello extends React.Component {
    render() {
        return (
            <div>这是我的第一个类组件</div>
        )
    }
}

//  渲染组件
 ReactDOM.render(<Hello />, document.getElementById('root'))