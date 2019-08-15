Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    mobile: '',
    code: '',
    isShow: false,//默认按钮1显示，按钮2不显示
    sec: "30",//设定倒计时的秒数
    isSee01: false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    bindPhone: function (e) {
      this.setData({
        mobile: e.detail.value
      })
    },
    bindCode: function (e) {
      this.setData({
        code: e.detail.value
      })
    },
    getCode: function (e) {
      var _this = this;
      console.log(_this.data);
      let postNumber = {
        transCode: 'MVCL01',
        funType: 'sendMobileVelidate',
        phone: '17636656942',
      }
      app.wxRequest('post', postNumber, this.getData)
      utils.getCode(_this, _this.data.sec);//调用倒计时函数 
      wx.showToast({
        title: '发送成功',
        icon: 'success',
        duration: 2000
      })
    },
  }
})