import wepy from 'wepy'

export default class extends wepy.mixin {
  data= {
    // 轮播图的数据，默认为空数组
    swiperList: [],
    // 分类数组，默认为空数组
    cateItems: [],
    // 楼层相关的数据
    floorData: []
  }
  onLoad() {
    this.getSwiperData()
    this.getCateItems()
    this.getFloorData()
  }

  methods = {
    // 点击楼层中的每一张图片，都要跳转到商品列表页面
    goDoodsList(url) {
      wepy.navigateTo({
        url
      })
    }
  }

  // 获取轮播图数据的函数
  async getSwiperData() {
    const {data: res} = await wepy.get('/home/swiperdata')
    if (res.meta.status !== 200) {
      return wepy.baseToast()
    }
    this.swiperList = res.message
    this.$apply()
  }
  // 获取首页分类相关的数据项
  async getCateItems() {
    const {data: res} = await wepy.get('/home/catitems')
    if (res.meta.status !== 200) {
      return wepy.baseToast()
    }
    this.cateItems = res.message
    this.$apply()
  }
  async getFloorData() {
    const {data: res} = await wepy.get('/home/floordata')
    if (res.meta.status !== 200) {
      return wepy.baseToast()
    }
    console.log(res.message)
    this.floorData = res.message
    this.$apply()
  }
}
