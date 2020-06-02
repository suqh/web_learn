import React from 'react'

// 导入 axios
import { API } from '../../utils/api'

import { Link } from 'react-router-dom'

import { Toast } from 'antd-mobile'

// 导入 BASE_URL
import { BASE_URL } from '../../utils/url'

// 导入封装好的 NavHeader 组件
import NavHeader from '../../components/NavHeader'

// 导入样式
// import './index.scss'
import styles from './index.module.css'
import HouseItem from '../../components/HouseItem'

// 解决脚手架中全局变量访问的问题
const BMapGL = window.BMapGL

// 覆盖物样式
const labelStyle = {
  cursor: 'pointer',
  border: '0px solid rgb(255, 0, 0)',
  padding: '0px',
  whiteSpace: 'nowrap',
  fontSize: '12px',
  color: 'rgb(255, 255, 255)',
  textAlign: 'center'
}

export default class Map extends React.Component{
  state = {
    // 小区下的房源列表
    housesList: [],
    // 表示是否展示房源列表
    isShowList: false
  }

  componentDidMount() {
    this.initMap()
  }

  // 初始化地图
  initMap() {
    // 获取当前定位城市
    const { label, value } = JSON.parse(localStorage.getItem('hkzf_city'))

    // 初始化地图实例
    // 注意：在react脚手架中全局对象需要使用 window来访问，否则，会造成 ESLint 校验错误
    const map = new BMapGL.Map('container')
    // 作用：能够在其他方法中通过 this 来获取到地图对象
    this.map = map

    // 创建地址解析器实例     
    const myGeo = new BMapGL.Geocoder();      
    // 将地址解析结果显示在地图上，并调整地图视野    
    myGeo.getPoint(label, async (point) => {      
        if (point) {      
            // 初始化地图
            map.centerAndZoom(point, 11);      
            map.addOverlay(new BMapGL.Marker(point));      

            // 添加常用控件
            map.addControl(new BMapGL.ZoomControl())
            map.addControl(new BMapGL.ScaleControl())

            // 调用 this.renderOverlays 方法
            this.renderOverlays(value)
        }      
    }, label)
    // 给地图绑定移动事件
    map.addEventListener('movestart', () => {
      if (this.state.isShowList) {
        this.setState(() => {
          return {
            isShowList: false
          }
        })
      }
    })
  }

  // 渲染覆盖物入口
  // 1 接收区域 id 参数，获取该区域下的房源数据
  // 2 获取房源类型以及下级地图缩放级别
  async renderOverlays(id) {
    try {
      // 开启loading
      Toast.loading('数据加载中...',0,null,false)
      const res = await API.get(`/area/map?id=${id}`)
      // 关闭loading
      Toast.hide()
      const data = res.data.body

      // 调用 this.getTypeAndZoom 方法 获取级别和类型
      const { nextZoom, type } = this.getTypeAndZoom()

      data.forEach(item => {
        // 创建覆盖物
        this.createOverlays(item, nextZoom, type)
      })
    }catch (e) {
      // 关闭loading
      Toast.hide()
    }
  }

  // 计算要绘制的覆盖物类型和下一个缩放级别
  // 区   -> 11 ，范围：>=10 <12
  // 镇   -> 13 ，范围：>=12 <14
  // 小区 -> 15 ，范围：>=14 <16
  getTypeAndZoom() {
    // 调用地图的 getZoom 来获取当前缩放级别
    const zoom = this.map.getZoom()
    let nextZoom, type
    if (zoom >= 10 && zoom < 12) {
      // 区
      // 下一个缩放级别
      nextZoom = 13
      // 表示绘制圆形覆盖物（区、镇）
      type = 'circle'
    } else if (zoom >= 12 && zoom < 14) {
      // 镇
      nextZoom = 15
      type = 'circle'
    } else if (zoom >= 14 && zoom < 16) {
      // 小区
      type = 'rect'
    }

    return {
      nextZoom,
      type
    }
  }

  // 创建覆盖物
  createOverlays(data,zoom,type) {
    const { coord: { longitude, latitude }, label: areaName, count, value } = data
    // 创建地图坐标
    const areaPoint = new BMapGL.Point(longitude, latitude)

    if (type === 'circle') {
      // 区或镇
      this.createCircle(areaPoint, areaName, count, value, zoom)
    } else {
      // 小区
      this.createRect(areaPoint, areaName, count, value)
    }
  }

  // 创建区、镇覆盖物
  createCircle(point,name,count,id,zoom) {
    const opts = {
        position: point,
        offset: new BMapGL.Size(-35, -35)
      }

      // 说明： 设置 setContent 后，第一个参数中设置的文本内容就失效了，因此，直接清空即可
      const label = new BMapGL.Label('', opts)

      // 给 label 对象添加一个唯一标识
      label.id = id

      // 设置房源覆盖物
      label.setContent(`
      <div class="${styles.bubble}">
        <p class="${styles.name}">${name}</p>
        <p>${count}套</p>
      `)

      // 设置样式
      label.setStyle(labelStyle)

      // 添加单击事件
      label.addEventListener('click', () => {
        // 调用 this.renderOverlays 方法，获取该区域下的房源数据
        this.renderOverlays(id)

        // 放大地图，以当前点击的覆盖物为中心放大地图
        // 第一个参数：坐标对象
        // 第二个参数：放大级别
        this.map.centerAndZoom(point, zoom)

        // 解决清除覆盖物是，百度地图API的JS文件自身报错的问题
        setTimeout(() => {
          // 清除当前覆盖物信息
          this.map.clearOverlays()
        }, 0)
      })
      // 添加覆盖物到地图中
      this.map.addOverlay(label)
  }

  // 创建小区覆盖物
  createRect(point,name,count,id) {
    const opts = {
      position: point,
      offset: new BMapGL.Size(-50, -28)
    }

    // 说明： 设置 setContent 后，第一个参数中设置的文本内容就失效了，因此，直接清空即可
    const label = new BMapGL.Label('', opts)

    // 给 label 对象添加一个唯一标识
    label.id = id

    // 设置房源覆盖物
    label.setContent(`
      <div class="${styles.rect}">
        <span class="${styles.housename}">${name}</span>
        <span class="${styles.housenum}">${count}套</span>
        <i class="${styles.arrow}"></i>
      </div>
    `)

    // 设置样式
    label.setStyle(labelStyle)

    // 添加单击事件
    label.addEventListener('click', (e) => {
      this.getHousesList(id)

      // 获取当前被点击项
      const target = e.domEvent.changedTouches[0]
      this.map.panBy(
        window.innerWidth / 2 - target.clientX,
        (window.innerHeight - 330) / 2 - target.clientY
      )
    })
    // 添加覆盖物到地图中
    this.map.addOverlay(label)
  }

  // 获取小区房源数据
  async getHousesList(id) {
    try {
      // 开启loading
      Toast.loading('数据加载中...',0,null,false)
      const res = await API.get(`/houses?cityId=${id}`)
      // 关闭loading
      Toast.hide()
      this.setState({
        housesList: res.data.body.list,
        // 展示房源列表
        isShowList: true
      })
    }catch (e) {
      // 关闭loading
      Toast.hide()
    }
  }

  // 封装渲染房屋列表的方法
  renderHousesList() {
    return this.state.housesList.map(item => (
      <HouseItem
        key={item.houseCode}
        src={BASE_URL + item.houseImg}
        title={item.title}
        desc={item.desc}
        tags={item.tags}
        price={item.price}
      />
    ))
  }

  render() {
    return (
    <div className={styles.map}>
      {/* 顶部导航栏组件 */}
      <NavHeader>
        地图找房
      </NavHeader>
      {/* 地图容器 */}
      <div id="container" className={styles.container}/>
      {/* 房源列表 */}
      {/* 添加 styles.show 展示房屋列表 */}
      <div className={[styles.houseList, this.state.isShowList ? styles.show : ''].join(' ')}>
        <div className={styles.titleWrap}>
          <h1 className={styles.listTitle}>房屋列表</h1>
          <Link className={styles.titleMore} to="/home/list">
            更多房源
          </Link>
        </div>
        <div className={styles.houseItems}>
          {/* 房屋结构 */}
          {this.renderHousesList()}
        </div>
      </div>
    </div>
    )
  }
}