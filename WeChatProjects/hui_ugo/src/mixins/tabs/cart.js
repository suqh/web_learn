import wepy from 'wepy'

export default class extends wepy.mixin {
  data = {
    // 购物车商品列表
    cart: []
  }
  onLoad() {
    this.cart = this.$parent.globalData.cart
    console.log(this.cart)
  }
  methods = {
    // 监听商品数量变化的事件
    countChange(e) {
      // 获取到变化之后最新的数量值
      const count = e.detail
      // 商品的Id值
      const id = e.target.dataset.id
      this.$parent.updateGoodsCount(id, count)
    },
    // 当商品前面的饿复选框，选中状态变化，会触发这个函数
    statusChanged(e) {
      console.log(e)
      // 当前最新的选中状态
      const status = e.detail
      // 当前点击项对应的商品id
      const id = e.target.dataset.id
      this.$parent.updateGoodsStatus(id, status)
    },
    // 点击删除对应的商品
    close(id) {
      console.log(id)
      this.$parent.removeGoodsById(id)
    },
    // 监听全选复选框值改变的事件
    onFullCheckChanged(e) {
      this.$parent.updateAllGoodsStauts(e.detail)
    },
    // 提交订单
    submitOrder() {
      if (this.amount <= 0) {
        return wepy.baseToast('订单金额不能为空!')
      }
      wepy.navigateTo({
        url: '/pages/order'
      })
    }
  }
  computed = {
    // 判断购物车是否为空
    isEmpty() {
      if (this.cart.length <= 0) {
        return true
      }
      return false
    },
    // 总价格，单位是分
    amount() {
      // 单位是元
      let total = 0
      this.cart.forEach(x => {
        if (x.isCheck) {
          total += x.price * x.count
        }
      })
      return total * 100
    },
    // 是否全选
    isFullChecked() {
      const allCount = this.cart.length
      let c = 0
      this.cart.forEach(x => {
        if (x.isCheck) {
          c++
        }
      })
      return allCount === c
    }
  }
}
