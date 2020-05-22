import React from 'react';
import ReactDOM from 'react-dom';

/**
 * JSX中使用JavaScript表达式的注意点
 */

//  函数调用表达式
const sayHi = () => 'hi~'

// JSX 自身也是JS表达式
const div = <div>我是一个div</div>

const title = (
  <h1 className="title"> 
    Hello JXS
    <p>{1}</p>
    <p>{'a'}</p>
    <p>{1+7}</p>
    <p>{3 > 5? '大于': '小于'}</p>
    <p>{sayHi()}</p>
    {/* {div} */}
    {/* <p>{{a: '6'}}</p> */}
    {/* 不能在{}出现语句 */}
    {/* {if (true) {}} */}
    {/* {fot (var i = 0; i < 10; i++) {}} */}
  </h1>
)

// 渲染react元素
ReactDOM.render(title, document.getElementById('root'))
