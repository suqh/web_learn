import wepy from 'wepy'

export default class extends wepy.mixin {
  data = {
    addressInfo: null,
    cart: [],
    // 是否登录成功了
    isLogin: false
  }
  onLoad() {
    console.log('订单')
    this.addressInfo = wepy.getStorageSync('address') || null
    // 从购物车列表中将那些被勾选的商品，过滤出来，形成一个新的数组
    const newArr = this.$parent.globalData.cart.filter(x => x.isCheck)
    this.cart = newArr
  }
  methods = {
    // 选择收获地址
    async chooseAddress() {
      const res = await wepy.chooseAddress().catch(err => err)
      if (res.errMsg !== 'chooseAddress:ok') {
        return
      }
      this.addressInfo = res
      wepy.setStorageSync('address', res)
      this.$apply()
    },
    // 获取用户信息
    async getUserInfo(userInfo) {
      // 判断是否获取用户信息失败
      if (userInfo.detail.errMsg !== 'getUserInfo:ok') {
        return wepy.baseToast('获取用户信息失败!')
      }
      console.log(userInfo)
      // 获取用户登录的凭证
      const loginRes = await wepy.login()
      if (loginRes.errMsg !== 'login:ok') {
        return wepy.baseToast('微信登录失败!')
      }
      console.log(loginRes)
      const loginParams = {
        code: loginRes.code,
        encryptedData: userInfo.detail.encryptedData,
        iv: userInfo.detail.iv,
        rawData: JSON.stringify(userInfo.detail.rawData),
        signature: userInfo.detail.signature
      }
      console.log(loginParams)
      // 发起登录的请求，获取登录成功之后的 Token 值
      const {data: res} = await wepy.post('/users/wxlogin', loginParams)
      console.log(res)
      if (res.meta.status !== 200) {
        return wepy.baseToast('微信登录失败!')
      }
      // 把登录成功之后的 Token 字符串， 保存到 Storage
      wepy.setStorageSync('token', res.message.token)
      this.isLogin = true
      this.$apply()
    },
    // 支付订单
    async onSubmit() {
      if (this.amount <= 0) {
        return wepy.baseToast('订单金额不能为0!')
      }
      if (this.addressStr.length <= 0) {
        return wepy.baseToast('请选择收获地址!')
      }
      // 创建订单
      const {data: createResult} = await wepy.post('/my/orders/create', {
        // 订单金额 单位 元
        order_price: '0.01',
        consignee_addr: this.addressStr,
        order_detail: JSON.stringify(this.cart),
        goods: this.cart.map(x => {
          return {
            goods_id: x.id,
            goods_number: x.count,
            goods_price: x.price
          }
        })
      })
      // 登录不成功所以不能进行支付，所以重定向直接跳到了订单列表页面,如果登录成功，可以将下面的代码解开
      wepy.showToast({
        title: '提交订单成功',
        icon: 'success'
      })
      wepy.navigateTo({
        url: '/pages/orderlist'
      })
      /** 
      if (createResult.meta.status !== 200) {
        return wepy.baseToast('创建订单失败!')
      }
      // 创建订单成功了
      const orderInfo = createResult.message
      console.log(orderInfo)

      // 生成预支付订单
      const {data: orderResult} = await wepy.post('/my/orders/req_unifiedorder', {
        order_number: orderInfo.order_number
      })
      // 生成预支付订单失败
      if (orderResult.meta.status !== 200) {
        return wepy.baseToast('生成预支付订单失败!')
      }
      // 走支付的流程
      // 调用微信支付的API
      console.log(orderResult)
      const payResult = await wepy.requestPayment(orderResult.message.pay).catch(err => err)
      // 用户取消了支付
      if (payResult.errMsg === 'requetPayment:fail') {
        return wepy.baseToast('您已经取消了支付!')
      }
      // 用户完成了支付的过程
      // 检查用户支付的结果
      const {data: payCheckResult} = await wepy.post('/my/orders/chkOrder', {
        order_number: orderInfo.order_number
      })
      if (payCheckResult.meta.status !== 200) {
        return wepy.baseToast('订单支付失败!')
      }
      // 提示用户支付成功
      wepy.showToast({
        title: '支付成功'
      })
      // 跳转到的订单列表页面
      wepy.navigateTo({
        url: '/pages/orderlist'
      })
      */
    }
  }
  computed = {
    isHaveAddress() {
      if (this.addressInfo === null) {
        return false
      }
      return true
    },
    addressStr() {
      if (this.addressInfo === null) {
        return ''
      }
      return this.addressInfo.provinceName +
      this.addressInfo.cityName +
      this.addressInfo.countyName +
      this.addressInfo.detailInfo
    },
    // 当前订单的总价
    amount() {
      let total = 0
      this.cart.forEach(x => {
        total += x.price * x.count
      })
      return total * 100
    }
  }
}
