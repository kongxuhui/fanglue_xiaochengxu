// components/component-tag-name.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isShowModel:{
      type: Number,
      value: ''
    },
    ModelId:{
      type: String,
      value:''
    },
    ModelTitle: {
      type: String,
      value: '标题'
    }
  }, 
  data: { 
    isShowConfirm: true,//是否只显示确定按钮，默认不是
  }, 
  methods: { 
    //取消事件
    _cancel: function (e) { 
      //关闭模态弹窗
      this.setData({
        isShowModel: false
      })
    },
    //确定事件
    _confirm: function (e) {
      console.log(e)
      //关闭模态弹窗
      this.triggerEvent('IsShowHandle', { 'userInfo': e})
    }
  }
})
