import wepy from 'wepy'

export default class extends wepy.mixin {
  data = {
    // 查询关键词
    query: '',
    // 分类ID
    cid: '',
    // 页码值
    pagenum: 1,
    // 每页显示多少条数据
    pagesize: 10,
    // 商品列表数据
    goodsList: [],
    // 总数据条数
    total: 0,
    // 数据是否加载完毕的布尔值，默认为false
    isover: false,
    // 表示当前数据是否正在请求中
    isloading: false
  }

  onLoad(options) {
    this.query = options.query || ''
    this.cid = options.cid || ''
    this.getGoodsList()
  }

  methods = {
    // 点击跳转到商品详情页面
    goGoodsDetail(goodsId) {
      wepy.navigateTo({
        url: '/pages/goods_detail/main?goods_id=' + goodsId
      })
    }
  }

  // 获取商品列表数据
  async getGoodsList(cb) {
    this.isloading = true
    const {data: res} = await wepy.get('/goods/search', {
      query: this.query,
      cid: this.cid,
      pagenum: this.pagenum,
      pagesize: this.pagesize
    })
    if (res.meta.status !== 200) {
      return wepy.baseToase()
    }
    this.goodsList = [...this.goodsList, ...res.message.goods]
    this.total = res.message.total
    this.isloading = false
    this.$apply()
    cb && cb()
  }

  // 触底操作
  onReachBottom() {
    // 判断当前是否正在请求数据中
    if (this.isloading) {
      return
    }
    // 先判断是否有下一页的数据
    if (this.pagenum * this.pagesize >= this.total) {
      this.isover = true
      return
    }
    console.log('触底了')
    this.pagenum++
    this.getGoodsList()
  }
  onPullDownRefresh() {
    // 初始化必要的字段值
    this.pagenum = 1
    this.total = 0
    this.goodsList = []
    this.isover = false
    this.isloading = false
    // 重新发起数据请求
    this.getGoodsList(() => {
      // 停止下拉刷新的行为
      wepy.stopPullDownRefresh()
    })
  }
}
