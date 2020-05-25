import React from 'react';
import ReactDOM from 'react-dom';

/**
 * 
 */
class App extends React.Component {
  state = {
    count: 1
  }

  handleClick = () => {
    // 此处，更新state
    // 注意：异步更新数据的！！
    this.setState({
      count: this.state.count + 1
    })
    console.log('count:',this.state.count)
    this.setState({
      count: this.state.count + 1
    })
    console.log('count:',this.state.count)
  }

  render() {
    console.log('render')
    return (
      <div>
        <h1>计数器： {this.state.count}</h1>
        <button onClick={this.handleClick}>+1</button>
      </div>
    )
  }
}

ReactDOM.render(<App />,  document.getElementById('root'))
