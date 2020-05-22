import React from 'react'
import ReactDOM from 'react-dom'

/**
 * 非受控组件
 */
import './index.css'
class App extends React.Component {
  // 初始化状态
  state = {
    comments: [
      { id: 1, name: 'jack', content: '沙发！！！' },
      { id: 2, name: 'rose', content: '板凳~' },
      { id: 3, name: 'tom', content: '楼主好人' }
    ],
    // 评论人
    userName: '',
    // 评论内容
    userContent: ''
  }

  // 渲染评论列表
  renderList() {
    const {comments} = this.state
    if (comments.length === 0) {
      return <div className="no-comment">暂无评论，快去评论吧~</div>
    }
    return (<ul>
      {comments.map(item => (
        <li key={item.id}>
          <h3>评论人：{item.name}</h3>
          <p>评论内容：{item.content}</p>
        </li>
      ))}
    </ul>)
  }

  // 处理表单元素值
  handleForm = (e) => {
    const {name,value} = e.target

    this.setState({
      [name]: value
    })
  }

  // 发表评论
  addComments = () => {
    const {comments, userName, userContent} = this.state
    // 非空校验
    if (userName.trim() === '' || userContent.trim() === '') {
        alert('请输入评论人和评论内容')
        return
    }
    const newComments = [{
      id: Math.random(),
      name: userName,
      content: userContent
    }, ...comments]
    console.log(newComments)
    this.setState({
      comments: newComments,
      userName: '',
      userContent: ''
    })
  }

  render () {
    const {userName, userContent} = this.state
    return (
    <div className="app">
      <div>
        <input className="user" type="text" placeholder="请输入评论人" value={userName} name="userName" onChange={this.handleForm}/>
        <br />
        <textarea className="content" cols="30" rows="10" placeholder="请输入评论内容" value={userContent} name="userContent" onChange={this.handleForm}></textarea>
        <br />
        <button onClick={this.addComments}>发表评论</button>
      </div>
      {/* 通过条件渲染决定渲染什么内容 */}
      {this.renderList()}
    </div>
    )
  }
}

// 渲染组件
ReactDOM.render(<App />, document.getElementById('root'))