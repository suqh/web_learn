import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { isAuth } from '../../utils'

const AuthRoute = ({ component: Component, ...rest}) => {
  return <Route {...rest} render={props => {
      const isLogin = isAuth()
      if (isLogin) {
        // 已登录
        // 将 props 传递给组件 组件中才能获取到相关路由信息
        return <Component {...props} />
      } else {
        // 未登录
        return <Redirect to={{
          pathname: '/login',
          state: {
            from: props.location
          }
        }}/>
      }
  }}></Route>
}

export default AuthRoute