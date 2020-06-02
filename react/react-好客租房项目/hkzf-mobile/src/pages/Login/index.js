import React, { Component } from 'react'
import { Flex, WingBlank, WhiteSpace, Toast } from 'antd-mobile'

import { Link } from 'react-router-dom'

// 导入 withFormik
import { withFormik, Form, Field, ErrorMessage } from 'formik'

// 导入 Yup
import * as Yup from 'yup'

// 导入 API
import { API } from '../../utils'

import NavHeader from '../../components/NavHeader'

import styles from './index.module.css'  

// 验证规则：
const REG_UNAME = /^[a-zA-Z_\d]{5,8}$/
const REG_PWD = /^[a-zA-Z_\d]{5,12}$/

class Login extends Component {
  render() {
    return (
      <div className={styles.root}>
        {/* 顶部导航 */}
        <NavHeader className={styles.navHeader}>账号登录</NavHeader>
        <WhiteSpace size="xl" />

        {/* 登录表单 */}
        <WingBlank>
          <Form>
            <div className={styles.formItem}>
              <Field className={styles.input} name="username" placeholder="请输入账号"></Field>
            </div>
            <ErrorMessage className={styles.error} name="username" component="div"></ErrorMessage>
            {/* 长度为5到8位，只能出现数字、字母、下划线 */}
            <div className={styles.formItem}>
              <Field className={styles.input} name="password" type="password" placeholder="请输入密码"></Field>
            </div>
            <ErrorMessage className={styles.error} name="password" component="div"></ErrorMessage>
            {/* 长度为5到12位，只能出现数字、字母、下划线 */}
            <div className={styles.formSubmit}>
              <button className={styles.submit} type="submit">
                登 录
              </button>
            </div>
          </Form>
          <Flex className={styles.backHome}>
            <Flex.Item>
              <Link to="/registe">还没有账号，去注册~</Link>
            </Flex.Item>
          </Flex>
        </WingBlank>
      </div>
    )
  }
}

// 使用 withFormik 高阶组件包装 Login 组件， 作为 Login 组件提供属性和方法
Login = withFormik({
  // 提供状态
  mapPropsToValues: () => ({ username: 'test2', password: 'test2'}),
  // 添加表单验证规则
  validationSchema: Yup.object().shape({
    username: Yup.string().required('账号必须为必填项').matches(REG_UNAME, '长度为5到8位，只能出现数字、字母、下划线'),
    password: Yup.string().required('密码为必填项').matches(REG_PWD, '长度为5到12位，只能出现数字、字母、下划线')
  }),
  // 表单的提交事件
  handleSubmit: async (values, { props }) => {
    // 组织表单默认提交行为
    // e.preventDefault()
    // 获取账号和密码
    const { username, password } = values

    const res = await API.post(`/user/login`,{
      username,
      password
    })
    const { status, body, description } = res.data
    if (status === 200) {
      // 登录成功
      localStorage.setItem('hkzf_token',body.token)
      // 注意：无法在该方法中，通过 this 来获取到路由信息
      // 所以，需要通过 第二个对象参数中获取到 props 来使用 props
      // props.history.go(-1)
      if (!props.location.state) {
        // 此时，表示是直接进入到了该页面，直接调用 go(-1) 即可
        props.history.go(-1)
      } else {
        // push: [home, login, map]
        // replace [home, login]
        props.history.replace(props.location.state.from.pathname)
      }
    } else {
      // 登录失败
      Toast.info(description, 2, null, false)
    }
  }
})(Login)

// 注意： 此处返回的是 高阶组件 包装后的组件
export default Login
