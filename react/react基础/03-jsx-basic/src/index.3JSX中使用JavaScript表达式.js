import React from 'react';
import ReactDOM from 'react-dom';

/**
 * JSX中使用JavaScript表达式
 */
const name = 'Jack'
const age = 19
const title = (
  <h1 className="title"> 
    Hello JXS ,{name}, 年龄：{age}
  </h1>
)

// 渲染react元素
ReactDOM.render(title, document.getElementById('root'))
