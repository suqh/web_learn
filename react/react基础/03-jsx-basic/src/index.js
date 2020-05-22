import React from 'react';
import ReactDOM from 'react-dom';

// 引入css
import './index.css'

/**
 * JSX的样式处理
 */

//  歌曲列表
const list = (
  <h1 className="title" style={{color: 'red', backgroundColor: 'skyblue'}}>
    JSX样式的处理
  </h1>

)

// 渲染react元素
ReactDOM.render(list, document.getElementById('root'))
