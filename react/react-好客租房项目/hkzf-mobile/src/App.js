import React, { lazy, Suspense } from 'react'

// 导入路由
import { BrowserRouter as Router, Route, Redirect } from  'react-router-dom'

// 导入首页和城市选择两个组件（页面）
import Home from './pages/Home'

// 路由访问控制组件
import AuthRoute from  './components/AuthRoute'

// 使用动态组件的方式导入
const CityList = lazy(() => import('./pages/CityList'))
// 导入Map组件
const Map = lazy(() => import('./pages/Map'))
// 导入房屋详情组件
const HouseDetail = lazy(() => import('./pages/HouseDetail'))
// 登录
const Login = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/Register'))
// 房源发布
const Rent =  lazy(() => import('./pages/Rent'))
const RentAdd = lazy(() => import('./pages/Rent/Add'))
const RentSearch = lazy(() => import('./pages/Rent/Search'))

function App() {
  return (
    <Router>
      <Suspense fallback={<div className="route-loading">loading...</div>}>
        <div className="App">
          {/* 默认路由匹配时，跳转到 /home 实现路由的重定向到首页 */}
          <Route path="/" exact render={() => <Redirect to="/home" />}></Route>
          {/* 配置路由 */}
          <Route path="/home" component={Home} />
          <Route path="/citylist" component={CityList} />
          <Route path="/map" component={Map} />

          {/* 房屋详情的路由规则 */}
          <Route path="/detail/:id" component={HouseDetail} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />

          {/* 配置登录后，才能放问的页面 */}
          <AuthRoute exact path="/rent" component={Rent} />
          <AuthRoute path="/rent/add" component={RentAdd} />
          <AuthRoute path="/rent/search" component={RentSearch} />
        </div>
      </Suspense>
    </Router>
  )
}

export default App;
