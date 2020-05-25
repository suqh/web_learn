import React from 'react';
import ReactDOM from 'react-dom';

/**
 * 组件性能优化 纯组件
 */

//  引用类型
const obj = { number: 0}
const newObj = obj
newObj.number = 2
console.log(newObj === obj)

// 生成随机数
class App extends React.PureComponent {
  state = {
    obj: {
      number: 0
    }
  }
  handleClick = () => {
    // 正确做法，创建新对象
    const newObj = {...this.state.obj.number,number: Math.floor(Math.random() * 3)}
    this.setState(() => {
      return {
        obj: newObj
      }
    })

    // 错误演示，直接修改原始对象中属性的值
    // const newObj = this.state.obj
    // newObj.number = Math.floor(Math.random() * 3)
    // this.setState(() => {
    //   return {
    //     obj: newObj
    //   }
    // })
  }
  render() {
    console.log('父组件中的render')
    return (
      <div>
        <h1>随机数：{this.state.obj.number}</h1>
        {/* <NumberBox number={this.state.number}></NumberBox> */}
        <button onClick={this.handleClick}>重新生成</button>
      </div>
    )
  }
}

ReactDOM.render(<App />,  document.getElementById('root'))
