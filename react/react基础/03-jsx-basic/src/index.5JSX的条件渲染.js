import React from 'react';
import ReactDOM from 'react-dom';

/**
 * 条件渲染
 */
const isLoading = true

// if-else
const loadData = () => {
  if (isLoading) {
    return <div>loading...</div>
  }
  return <div>数据加载完成，此处显示加载后的数据</div>
}

// 三元表达式
const loadData1 = () => {
  return isLoading ? (<div>loading...</div>) : (<div>数据加载完成，此处显示加载后的数据</div>)
}

// 逻辑与运算符
const loadData2 = () => {
  return isLoading && (<div>loading...</div>)
}

const title = (
  <h1 className="title"> 
    if 条件渲染
    {loadData()}
    三元表达式渲染
    {loadData1()}
    逻辑与运算符
    {loadData2()}
  </h1>
)



// 渲染react元素
ReactDOM.render(title, document.getElementById('root'))
