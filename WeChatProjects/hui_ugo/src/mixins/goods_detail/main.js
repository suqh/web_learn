import wepy from 'wepy'

export default class extends wepy.mixin {
  data = {
    // 商品的Id值
    goods_id: '',
    // 商品详情信息
    goodsInfo: {},
    // 收货地址
    addressInfo: null
  }
  methods ={
    // 点击预览图片
    preview(current) {
      wepy.previewImage({
        // 所有图片的路径
        urls: this.goodsInfo.pics.map(x => x.pics_big),
        // 当前默认看到的图片
        current: current
      })
    },
    // 获取用户的收获地址
    async chooseAddress() {
      const res = await wepy.chooseAddress().catch(err => err)
      if (res.errMsg !== 'chooseAddress:ok') {
        return wepy.baseToast('获取收货地址失败!')
      }
      console.log(res)
      this.addressInfo = res
      wepy.setStorageSync('address', res)
      this.$apply()
    },
    // 点击按钮，把商品添加到购物车列表中
    addToCart() {
      // 获取到当前商品的所有信息
      this.$parent.addGoodsToCart(this.goodsInfo)
      // 提示用户加入购物车成功
      wepy.showToast({
        title: '已经加入购物车',
        icon: 'success'
      })
    }
  }

  computed = {
    addressStr() {
      if (this.addressInfo === null) {
        return '请选择收获地址'
      }
      const addr = this.addressInfo
      const str = addr.provinceName + addr.cityName + addr.countyName + addr.detailInfo
      return str
    },
    // 所有已经勾选的购物车商品数量
    total() {
      return this.$parent.globalData.total
    }
  }

  onLoad(options) {
    console.log(options)
    this.goods_id = options.goods_id
    this.getGoodsInfo()
  }
  // 获取商品详情数据
  async getGoodsInfo() {
    const {data: res} = await wepy.get('/goods/detail', {
      goods_id: this.goods_id
    })
    if (res.meta.status !== 200) {
      return wepy.baseToast()
    }
    this.goodsInfo = res.message
    this.$apply()
  }
}
