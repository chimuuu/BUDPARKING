Page({
  data: {

  },
onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    
  },

  weixin_ensure_pay:function(){
		//保留当前页面
    wx.navigateTo({
      url: 'succeed_pay/succeed_pay' 
    })
  }
  
})
