import React from 'react';
import ReactDOM from 'react-dom';

// 导入路由
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

/**
 * 默认路由
 */


const Home = () => <p>进入页面的时候，你能看到我吗？</p>

const App = () => (
  <Router>
    <div>
      <h1>默认路由</h1>

      {/* 默认路由 */}
      <Route path="/" component={Home}></Route>
    </div>
  </Router>
)

ReactDOM.render(<App />, document.getElementById('root'))