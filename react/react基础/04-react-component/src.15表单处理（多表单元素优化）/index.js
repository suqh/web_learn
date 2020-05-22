import React from 'react'
import ReactDOM from 'react-dom'

/**
 * 受控组件
 * 操作文本框的值
 */
class App extends React.Component {

  state = {
    txt: '',
    content: '',
    city: 'bj',
    isChecked: false
  }

  handleForm = e => {
    // 获取当前DOM对象
    const target = e.target

    // 根据类型获取值
    const value = target.type === 'checkbox' ? target.checked: target.value

    // 获取name
    const name = target.name


    this.setState({
      [name]: value
    })
  }

  render () {
    return (
      <div>
        {/* 文本框 */}
        <input type="text" name="txt" value={this.state.txt} onChange={this.handleForm}/>
        <br />

        {/* 富文本框 */}
        <textarea name="content" value={this.state.content} onChange={this.handleForm}></textarea>
        <br />

        {/* 下拉框 */}
        <select name="city" value={this.state.city} onChange={this.handleForm}>
          <option value="sh">上海</option>
          <option value="bj">北京</option>
          <option value="gz">广州</option>
        </select>
        <br />

        {/* 复选框 */}
        <input name="isChecked" type="checkbox" checked={this.state.isChecked} onChange={this.handleForm}/>
      </div>
    )
  }
}

// 渲染组件
ReactDOM.render(<App />, document.getElementById('root'))