import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from  'prop-types'

/**
 * props 默认值
 */

const App = props => {
  console.log(props)
  return (
    <div>
      <h1>此处展示props的默认值：{props.pageSize}</h1>
    </div>
  )
}

// 添加props默认值
App.defaultProps = {
  pageSize: 10
}

 ReactDOM.render(<App pageSize={20}/>,document.getElementById('root'))