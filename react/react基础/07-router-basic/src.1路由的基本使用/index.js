import React from 'react';
import ReactDOM from 'react-dom';

/**
 * react-router-dom 的基本使用：
 * 1、安装 npm install react-router-dom
 * 
 */

// 2、导入组件：
import { BrowserRouter as Router,Route, Link} from 'react-router-dom'

const First = () => <p>页面一的内容</p>

// 3、使用Router组件包裹整个应用
const App = () => (
  <Router>
    <div>
      <h1>React路由基础</h1>
      {/* 4、指定路由入口 */}
      <Link to="/first">页面一</Link>

      {/* 5、指定路由出口 */}
      <Route path="/first" component={First}></Route>
    </div>
  </Router>
)

ReactDOM.render(<App />, document.getElementById('root'))