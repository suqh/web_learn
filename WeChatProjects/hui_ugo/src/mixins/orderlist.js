import wepy from 'wepy'

export default class extends wepy.mixin {
  data = {
    // 默认被激活的标签页的索引值
    active: 0,
    // 全部 订单列表
    allOrderList: [],
    // 代付款 订单列表
    waitOrderList: [],
    // 已付款 订单列表
    finishOrderList: []
  }
  onLoad() {
    this.getOrderList(this.active)
  }
  methods = {
    // 每当切换标签页的时候，都会触发这个函数
    tabChanged(e) {
      console.log(e)
      this.active = e.detail.index
      this.getOrderList(this.active)
    }
  }
  // 获取订单列表
  async getOrderList(index) {
    // 登录接口不成功，获取不到token，所以造数据，如果成功登录成功，就用这段代码
    // const {data: res} = await wepy.get('/my/orders/all', {type: index + 1})
    // if (res.meta.status !== 200) {
    //   return wepy.baseToast('获取订单列表失败!')
    // }
    // 数据
    const res = {
      'message': [
        {
          'order_id': 44,
          'user_id': 12,
          'order_number': 'GD20180507000000000050',
          'order_price': 0.1,
          'order_pay': '0',
          'is_send': '否',
          'trade_no': '',
          'order_fapiao_title': '个人',
          'order_fapiao_company': '',
          'order_fapiao_content': '',
          'consignee_addr': '广州市天河区',
          'pay_status': '0',
          'create_time': 1525407814,
          'update_time': 1525407814,
          'order_detail':
          "[{\"goods_id\":55578,\"goods_name\":\"初语2017秋装新款潮牌女装加绒宽松BF风慵懒卫衣女套头连帽上衣\",\"goods_price\":279,\"goods_small_logo\":\"http://image5.suning.cn/uimg/b2c/newcatentries/0070177617-000000000686906489_2_400x400.jpg\",\"counts\":1,\"selectStatus\":true}]",
          'total_count': 1
        }
      ],
      'meta': { 'msg': '获取订单列表成功', 'status': 200 }
    }
    res.message.forEach(x => (x.order_detail = JSON.parse(x.order_detail)))
    if (index === 0) {
      this.allOrderList = res.message
    } else if (index === 1) {
      this.waitOrderList = res.message
    } else if (index === 2) {
      this.finishOrderList = res.message
    } else {
      wepy.baseToast('订单类型错误!')
    }
    this.$apply()
  }
}
