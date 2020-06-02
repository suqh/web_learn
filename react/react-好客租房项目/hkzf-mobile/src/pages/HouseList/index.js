import React from 'react'

import { Flex, Toast } from 'antd-mobile'

import { List, AutoSizer, WindowScroller,InfiniteLoader } from 'react-virtualized'

import { API } from '../../utils/api'
import { getCurrentCity } from '../../utils'

import { BASE_URL } from '../../utils/url'

// 导入样式
import styles from './index.module.css'

import SearchHeader from '../../components/SearchHeader'
import Filter from './components/Filter'
import HouseItem from '../../components/HouseItem'
import NoHouse from '../../components/NoHouse'

// 导入吸顶组件
import Sticky from '../../components/Sticky'

/* 
  切换城市显示房源：

  原因：在组件外部的代码只会在项目加载时执行一次（刷新页面）。在切换路由时，不会重新重新执行。

       组件内部的 componentDidMount() 会在组件展示时执行，进入页面一次，执行一次。

  1 注释掉 获取当前定位城市信息 的代码。
  2 导入 utils 中的 getCurrentCity 方法。
  3 在 componentDidMount 中调用 getCurrentCity() 方法来获取当前定位城市信息。
  4 将 label 和 value 保存到 this 中。
  5 用到 label 和 value 的地方，使用 this.label 或 this.value 来访问。
*/

export default class HouseList extends React.Component {

  state = {
    // 列表数据
    list: [],
    // 总条数
    count: 0,
    // 表示数据是否在加载中
    isLoading: false
  }

  // 初始化默认值
  label = ''
  value = ''

  // 初始化实例属性
  filters = {}

  async componentDidMount() {
    const { label, value } = await getCurrentCity()
    this.label = label
    this.value = value
    this.searchHouseList()
  }

  // 用来获取房屋列表数据
  async searchHouseList() {
    this.setState({
      isLoading: true
    })
    // 获取当前定位城市Id
    // 开启loading
    Toast.loading('加载中...',0,null,false)
    const res = await API.get('/houses', {
      params: {
        cityId: this.value,
        ...this.filters,
        start: 1,
        end: 20
      }
    })
    const { list, count } = res.data.body
    // 关闭loading
    Toast.hide()

    // 提示房源数量
    if (count !== 0) {
      Toast.info(`共找到${count}套房源`, 2,null, false)
    }

    this.setState({
      list,
      count,
      // 数据加载完成的状态
      isLoading: false
    })
  }

  // 接收Filter组件中筛选条件数据
  onFilter = filters => {
    // 返回页面顶部
    window.scrollTo(0,0)
    this.filters = filters
    
    // 调用获取房屋数据的方法
    this.searchHouseList()
  }

  // List组件渲染每一行的方法
  renderHouseList = ({
    key,
    index,
    style,
  }) => {
    // 根据索引号来获取当前这一行的房屋数据
    const { list } = this.state
    const house = list[index]

    // 判断 house 是否存在
    // 如果不存在，就渲染 loading 元素占位
    if (!house) {
      return (
        <div key={key} style={style}>
          <p className={styles.loading}></p>
        </div>
      )
    }

    return (
      <HouseItem 
        key={key} 
        onClick={() => this.props.history.push(`/detail/${house.houseCode}`)}
        // 注意：该组件中应该接收 style 然后给组件元素设置样式
        style={style} 
        src={BASE_URL + house.houseImg} 
        title={house.title} 
        desc={house.desc} 
        tags={house.tags} 
        price={house.price}
      />
    )
  }

  // 判断列表中的每一行是否加载完成
  isRowLoaded = ({ index }) => {
    return !!this.state.list[index]
  }

  // 用来获取更多房屋列表数据
  // 注意： 该方法的返回值是一个 Promise 对象，并且，这个对象应该在数据加载完成时，来调用 resolve 让 Promise 对象的状态变为已完成
  loadMoreRows = ({ startIndex, stopIndex }) => {
    new Promise(resolve => {
      API.get('/houses', {
        params: {
          cityId: this.value,
          ...this.filters,
          start: startIndex,
          end: stopIndex
        }
      }).then(res => {
        this.setState({
          list: [...this.state.list,...res.data.body.list]
        })
        // 数据加载完成时， 调用 resolve 即可
        resolve()
      })
    })
  }

  // 渲染列表数据
  renderList() {
    const { count, isLoading } = this.state
    // 关键点：在数据加载完成后，再进行 count 的判断
    // 解决方案，如果数据加载中，咋不展示 NoHouse 组件 而 但数据加载完成后，在展示 NoHouse 组件
    if (count === 0 && !isLoading) {
      return <NoHouse>没有找到房源，请您换个搜索条件吧~</NoHouse>
    }
    return (
      <InfiniteLoader
      isRowLoaded={this.isRowLoaded}
      loadMoreRows={this.loadMoreRows}
      rowCount={count}>
      {({ onRowsRendered, registerChild}) => (
        <WindowScroller>
        {({height, isScrolling, scrollTop }) => (
          <AutoSizer>
            {({ width }) => (
              <List
              autoHeight // 设置高度为 WindowScroller 最终渲染的列表高度
              width={width} // 视口的宽度
              height={height} // 视口的高度
              rowCount={count} // List 列表项的行数
              rowHeight={120} // 每一行的高度
              rowRenderer={this.renderHouseList} //渲染列表项中的每一行
              isScrolling={isScrolling}
              scrollTop={scrollTop}
              onRowsRendered={onRowsRendered}
              ref={registerChild}
            />
            )}
          </AutoSizer>
        )}
      </WindowScroller>
      )}
    </InfiniteLoader>
    )
  }

  render() {
    return (
      <div>
        {/* 搜索框 */}
        <Flex className={styles.header}>
          <i className="iconfont icon-back" onClick={() => this.props.history.go(-1)}/>
          <SearchHeader cityName={this.label} className={styles.searchHeader}/>
        </Flex>

        {/* 条件筛选栏 */}
        <Sticky height={40}>
          <Filter onFilter={this.onFilter}/>
        </Sticky>
        

        {/* 房屋列表 */}
        <div className={styles.houseItems}>
          {this.renderList()}
        </div>
      </div>
    )
  }
}