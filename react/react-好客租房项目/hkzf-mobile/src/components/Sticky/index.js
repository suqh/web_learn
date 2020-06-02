import React, { Component, createRef } from  'react'

import styles from './index.module.css'

import PropTypes from 'prop-types'

class Sticky extends Component {
  // 创建 ref 对象
  placeholder = createRef()
  content = createRef()

  // scroll 事件的事件处理程序
  handleScroll = () => {
    const { height } = this.props
    // 获取去DOM对象
    const placeholderEl = this.placeholder.current
    const contentEl = this.content.current

    const { top } =  placeholderEl.getBoundingClientRect()
    if (top < 0) {
      // 吸顶
      contentEl.classList.add(styles.fixed)
      placeholderEl.style.height = `${height}px`
    } else {
      // 取消吸顶
      contentEl.classList.remove(styles.fixed)
      placeholderEl.style.height = '0px'
    }
    
  }

  // 监听 scroll 事件
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  render() {
    return (
      <div>
          {/* 占位元素 */}
          <div ref={this.placeholder}/>
          {/* 内容元素 */}
          <div ref={this.content}>
            {this.props.children}
          </div>
      </div>

    )
  }
}

Sticky.propTypes = {
  height: PropTypes.number.isRequired
}

export default Sticky