import React from 'react'
// 导入 NavBar 组件
import { NavBar } from 'antd-mobile'

// 导入withRouter 高阶组件
import { withRouter } from 'react-router-dom'

// 导入组件样式
import styles from './index.module.css'

// 导入 props 检验
import PropTypes from 'prop-types'

// 注意：默认情况下，只有路由 Router 直接渲染的组件才能够获取到路由信息（比如 history.go() 等）
// 如果需要在其他组件中获取到路由信息可以通过 withRouter 高阶组件来获取
// 添加 className 和 rightContent  (导航栏右侧内容) 属性
function NavHeader({ children,history, onLeftClick,className,rightContent }) {
  //   默认点击行为
  const defaultHandler = () => history.go(-1)
  return (
    <NavBar className={[styles.navBar, className || ''].join('  ')}
      mode="light"
      icon={<i className="iconfont icon-back"></i>}
      onLeftClick={onLeftClick || defaultHandler}
      rightContent={rightContent}>
      {children}
    </NavBar>
  )
}

// 添加 props 校验
NavHeader.propTypes = {
  children: PropTypes.string.isRequired,
  onLeftClick: PropTypes.func,
  className: PropTypes.string,
  rightContent: PropTypes.array
}

// withRouter(NavHeader) 函数的返回值也是一个组价
export default withRouter(NavHeader)