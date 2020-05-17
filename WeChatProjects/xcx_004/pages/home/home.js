// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  btnHandler: function() {
    wx.navigateTo({
      url: '/pages/info/info?name=zs&age=20'
    })
  },

  getInfo: function() {
    wx.request({
      url: 'https://www.liulongbin.top:8082/api/get',
      data: {name: 'zs',age: 20},
      success: function(result) {
        console.log(result)
      }
    })
  },

  postInfo: function() {
    wx.request({
      url: 'https://www.liulongbin.top:8082/api/post',
      method: 'POST',
      data: {name: 'ls', age: 23},
      success: function(result) {
        console.log(result)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})