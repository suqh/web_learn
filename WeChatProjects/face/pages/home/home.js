const app = getApp()

// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 窗口可用的宽度
    wh: 0,
    // 摄像头的朝向  前置 front  后置 back
    position: 'front',
    // 照片的路径
    src: '',
    // 是否展示选择的照片
    isShowPic: false,
    isShowBox: false,
    // 人脸信息
    faceInfo: null,
    // 映射关系
    map: {
      gender: {
        male: '男',
        female: '女'
      },
      expression: {
          none: '不笑', 
          smile: '微笑',
          lauhg: '大笑'
      },
      glasses: {
          none:'无眼镜',
          common:'普通眼镜',
          sun:'墨镜'
      },
      emotion: {
          angry:'愤怒',
          disgust:'厌恶',
          fear:'恐惧', 
          happy:'高兴', 
          sad:'伤心', 
          surprise:'惊讶', 
          neutral:'无表情', 
          pouty: '撅嘴',
          grimace:'鬼脸'
      }
    }
  },

  // 点击按钮，切换摄像头
  reverseCamera() {
    const newPosition = this.data.position === 'front' ? 'back': 'front'
    this.setData({
      position: newPosition
    })
  },

  // 拍照
  takePhoto() {
    // 创建相机的实例对象
    const ctx = wx.createCameraContext()
    // ctx.takePhoto 实现拍照
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        console.log(res.tempImagePath)
        this.setData({
          src: res.tempImagePath,
          isShowPic: true
        }, () => {
          this.getFaceInfo()
        })
      },
      fail: () => {
        console.log('拍照失败！')
        this.setData({
          src: ''
        })
      }
    })
  },

  // 从相册选取照片
  choosePhoto() {
    wx.chooseImage({
      count: 1,
      sizeType: ['original'],
      sourceType: ['album'],
      success: (res) => {
        if (res.tempFilePaths.length > 0) {
          this.setData({
            src: res.tempFilePaths[0],
            isShowPic: true
          }, () => {
            this.getFaceInfo()
          })
        }
        console.log(res)
      },
      fail: () => {
        console.log('选择照片失败！')
        this.setData({
          src: ''
        })
      }
    })
  },
  // 重新选择照片
  reChoose() {
    this.setData({
      isShowPic: false,
      src: '',
      isShowBox: false
    })
  },
  // 测颜值的函数
  getFaceInfo() {
    const token = app.globalData.access_token
    if (!token) {
      return wx.showToast({
        title: '鉴权失败!'
      })
    }

    wx.showLoading({
      title: '颜值检测中...'
    })

    // 进行颜值检测
    // 把用户选择的照片 转码为 base64 格式的字符串
    const fileManager = wx.getFileSystemManager()
    const fileStr = fileManager.readFileSync(this.data.src,'base64')

    wx.request({
      method: 'POST',
      url: 'https://aip.baidubce.com/rest/2.0/face/v3/detect?access_token='+token,
      header: {
        'Content-Type': 'application/json'
      },
      data: {
        image: fileStr,
        image_type: 'BASE64',
        // 年龄，颜值分数，表情，性别，是否戴眼镜，情绪
        face_field: 'age,beauty,expression,gender,glasses,emotion'
      },
      success: (res) => {
        console.log(res)
        if (res.data.result.face_num <= 0) {
          return wx.showToast({
            title: '未检测到人脸!',
          })
        }
        this.setData({
          faceInfo: res.data.result.face_list[0],
          isShowBox: true
        })
      },
      fail: () => {
        wx.showToast({
          title: '颜值检测失败!',
        })
      },
      complete: () => {
        wx.hideLoading()
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const sysInfo = wx.getSystemInfoSync()
    console.log(sysInfo.windowHeight)
    this.setData({
      wh: sysInfo.windowHeight
    })
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