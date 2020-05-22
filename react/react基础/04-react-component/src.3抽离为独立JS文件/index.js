import React from 'react'
import ReactDOM from 'react-dom'

/**
 *抽离组件到单独的JS文件中
 */

// 导入Hello组件
import Hello from './Hello'

//  渲染组件
 ReactDOM.render(<Hello />, document.getElementById('root'))