// components/test/test.js
Component({
  options: {
    multipleSlots: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    // propCount: {
    //   type: Number,
    //   value: 0
    // },
    propCount: Number
  },

  /**
   * 组件的初始数据
   */
  data: {
    name: 'zs'
  },

  observers: {
    'name, propCount': function(newName,newPropCount) {
      console.log('最新的name是：'+newName)
      console.log('最新的propCount是：'+newPropCount)
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    btnChangeName: function() {
      this.setData({
        name: 'ls'
      })
    },
    changePropCountVal: function() {
      this.setData({
        propCount: this.properties.propCount + 1
      })

      this.triggerEvent("myevent",{count: this.properties.propCount})
    }
  }
})
