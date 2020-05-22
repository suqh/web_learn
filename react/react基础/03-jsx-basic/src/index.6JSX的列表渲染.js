import React from 'react';
import ReactDOM from 'react-dom';

/**
 * 列表渲染
 */

//  歌曲列表
const songs = [
  {id: 1, name: '痴心绝对'},
  {id: 2, name: '像我这样的人'},
  {id: 3, name: '南山南'}
]


const list = (
  <ul>
    {songs.map(item => <li key={item.id}>{item.name}</li>)}
  </ul>
)

// 渲染react元素
ReactDOM.render(list, document.getElementById('root'))
