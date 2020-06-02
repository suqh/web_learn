import React, { Component } from 'react'

// 导入 Spring 组件
import { Spring } from 'react-spring/renderprops'

import FilterTitle from '../FilterTitle'
import FilterPicker from '../FilterPicker'
import FilterMore from '../FilterMore'

import styles from './index.module.css'

// 导入自定义的axios
import { API } from '../../../../utils/api'

// 标题高亮状态
// true 表示高亮； false 表示不高亮
const titleSelectedStatus = {
  area: false,
  mode: false,
  price: false,
  more: false
}

const selectedValues = {
  area: ['area', 'null'],
  mode: ['null'],
  price: ['null'],
  more: []
}

export default class Filter extends Component {
  state = {
    titleSelectedStatus,
    // 控制 FilterPicker 或 FilterMore 组件的展示或隐藏
    openType: '',
    // 所有筛选条件数据
    filterData: {},
    // 筛选条件的选中值
    selectedValues
  }

  componentDidMount() {
    // 获取到body
    this.htmlBody = document.body
    this.getFiltersData()
  }

  // 封装获取所有筛选条件的方法
  async getFiltersData() {
    // 获取当前定位城市id
    const { value } =JSON.parse(localStorage.getItem('hkzf_city'))
    const res = await API.get(`/houses/condition?id=${value}`)
    this.setState({
      filterData: res.data.body
    })
  }

  // 点击标题菜单实现高亮
  // 注意：this 指向的问题
  // 说明：要实现完整的功能，需要后续的组件配合完成
  onTitleClick = (type) => {
    // 给 body 添加样式
    this.htmlBody.className = 'body-fixed'

    const {titleSelectedStatus, selectedValues } = this.state
    const newTitleSelectedStatus = {...titleSelectedStatus}

    // 遍历标题选中状态对象
    // Object.keys() => ['area','mode','price','more']
    Object.keys(titleSelectedStatus).forEach(key => {
      // key 表示数组中的每一项，此处，就是每个标题的 type 值
      if (key === type) {
        // 当前标题
        newTitleSelectedStatus[type] = true
        return
      }
      // 其他标题
      const selectedVal = selectedValues[key]
      if (key === 'area' && (selectedVal.length !== 2 || selectedVal[0] !== 'area')) {
        // 高亮
        newTitleSelectedStatus[key] = true
      } else if (key === 'mode' && (selectedVal[0] !== 'null')) {
        newTitleSelectedStatus[key] = true
      } else if (key === 'price' && (selectedVal[0] !== 'null')) {
        newTitleSelectedStatus[key] = true
      } else if (key === 'more' && selectedVal.length !== 0) {
        // 更多选择项 FilterMore 组件
        newTitleSelectedStatus[key] = false
      } else {
        newTitleSelectedStatus[key] = false
      }
    })
    this.setState({
      // 展示对话框
      openType: type,
      // 使用新的标题选中状态对象开更新
      titleSelectedStatus: newTitleSelectedStatus
    })
  }

  // 取消（隐藏对话框）
  onCancel = (type) => {
    this.htmlBody.className = ''
    const { titleSelectedStatus, selectedValues } = this.state
    const newTitleSelectedStatus = {...titleSelectedStatus}
    const selectedVal = selectedValues[type]
    if (type === 'area' && (selectedVal.length !== 2 || selectedVal[0] !== 'area')) {
      // 高亮
      newTitleSelectedStatus[type] = true
    } else if (type === 'mode' && (selectedVal[0] !== 'null')) {
      newTitleSelectedStatus[type] = true
    } else if (type === 'price' && (selectedVal[0] !== 'null')) {
      newTitleSelectedStatus[type] = true
    } else if (type === 'more' && selectedVal.length !== 0) {
      // 更多选择项 FilterMore 组件
      newTitleSelectedStatus[type] = false
    } else {
      newTitleSelectedStatus[type] = false
    }
    this.setState({
      // 更新菜单高亮状态数据
      titleSelectedStatus: newTitleSelectedStatus,
      openType: ''
    })
  }

  // 确定（隐藏对话框）
  onSave = (type, value) => {
    this.htmlBody.className = ''
    // 高亮菜单处理
    const { titleSelectedStatus } = this.state
    const newTitleSelectedStatus = {...titleSelectedStatus}
    const selectedVal = value
    if (type === 'area' && (selectedVal.length !== 2 || selectedVal[0] !== 'area')) {
      // 高亮
      newTitleSelectedStatus[type] = true
    } else if (type === 'mode' && (selectedVal[0] !== 'null')) {
      newTitleSelectedStatus[type] = true
    } else if (type === 'price' && (selectedVal[0] !== 'null')) {
      newTitleSelectedStatus[type] = true
    } else if (type === 'more' && selectedVal.length !== 0) {
      // 更多选择项 FilterMore 组件
      newTitleSelectedStatus[type] = true
    } else {
      newTitleSelectedStatus[type] = false
    }

    const newSelectedValues = {
      ...this.state.selectedValues,
        // 只更新当前 type 对应的选中值
        [type]: value
    }

    const { area,mode,price,more } = newSelectedValues
 
    // 筛选条件数据
    const filters = {}

    // 区域
    const areaKey = area[0]
    let areaValue = 'null'
    if (area.length === 3) {
      areaValue = area[2] !== 'null' ? area[2] : area[1]
    }
    filters[areaKey] = areaValue
    
    // 方式和租金
    filters.mode = mode[0]
    filters.price = price[0]

    // 更多筛选条件
    filters.more = more.join(',')

    // 调用父组件中的方法，来将筛选值数据传递给父组件
    this.props.onFilter(filters)
    
    this.setState({
      openType: '',
      // 更新菜单高亮状态数据
      titleSelectedStatus: newTitleSelectedStatus,
      selectedValues: newSelectedValues
    })
  }

  // 渲染 FilterPicker 组件的方法
  renderFilterPicker() {
    const { openType, filterData: { area, subway, rentType, price }, selectedValues } = this.state
    if (openType !== 'area' && openType !== 'mode' && openType !== 'price') {
      return null
    }

    // 根据 openType 来拿当前筛选条件数据
    let data = []
    let cols = 3
    let defaultValue = selectedValues[openType]
    switch (openType) {
      case 'area':
        // 获取到区域数据
        data = [area, subway]
        cols = 3
        break;
      case 'mode':
        data = rentType
        cols = 1
        break;
      case 'price':
        data = price
        cols = 1
        break;
      default:
        break;
    }

    return <FilterPicker key={openType} onCancel={this.onCancel} onSave={this.onSave} data={data} cols={cols} type={openType} defaultValue={defaultValue}/>
  }

  renderFilterMore() {
    const { openType, filterData: { roomType, oriented, floor, characteristic}, selectedValues } = this.state
    if (openType !== 'more') {
      return null
    }

    const data = {
      roomType, oriented, floor, characteristic
    }

    const defaultValue = selectedValues.more

    return <FilterMore data={data} type={openType} onSave={this.onSave} defaultValue={defaultValue} onCancel={this.onCancel}/>
  }

  // 渲染遮罩层 div
  renderMask() {
    const { openType } = this.state
    const isHide = openType === 'more' || openType === ''
    return (
      <Spring
        from={{ opacity: 0}}
        to={{ opacity: isHide ? 0 : 1}}>
        {props => {
          // 说明遮罩层已经完成动画效果，隐藏了
          if (props.opacity === 0) {
            return null
          }
          // props => { opacity: 0 } 是从 0 到 1的中间值
          // console.log(props)
          return (
            <div style={props} className={styles.mask} onClick={() => this.onCancel(openType)}/>
          )
        }}
      </Spring>
    )
  }

  render() {
    const { titleSelectedStatus } = this.state
    return (
      <div className={styles.root}>
        {/* 前三个菜单的遮罩层 */}
        {
          this.renderMask()
        }

        <div className={styles.content}>
          {/* 标题栏 */}
          <FilterTitle titleSelectedStatus={titleSelectedStatus} onClick={this.onTitleClick}/>

          {/* 前三个菜单对应的内容： */}
          {this.renderFilterPicker()}

          {/* 最后一个菜单对应的内容： */}
          {this.renderFilterMore()}
        </div>
      </div>
    )
  }
}
