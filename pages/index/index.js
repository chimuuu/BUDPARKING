//index.js
//获取应用实例
var app = getApp()
const AV = require('../../utils/av-weapp.js');
Page({
  data: {
    // userInfo:{},
    indicatorDots:true,
    autoplay:true,
    interval:5000,
    duration:1000,
    imgUrls:[
      '../../images/1.png',
      '../../images/2.png'
    ]
  },
   onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    AV.init({
      appId: '6FR9SJu9wGBKXVN95sV48xNB-gzGzoHsz',
      appKey: 'AIWvKAxqanTFEmMC8vfrtzw5',
    });
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
      
    })
  },
  Parking_record:function(){
    wx.navigateTo({
      url: '../Parking_record/Parking_record',
     })
  },
  Time_fee:function(){
    wx.navigateTo({
      url: '../Time_fee/Time_fee',
      })
  },
  choose_image:function(){
    
    var _this = this;
    var fileurl = null;
    wx.chooseImage({
      count: 9, // 默认9  
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有  
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片  
        _this.setData({
          tempFilePaths: res.tempFilePaths
        })
        var tempFilePath = res.tempFilePaths[0];
        new AV.File('file-name', {
          blob: {
            uri: tempFilePath,
          },
        }).save().then(
          // fileurl = file.url(),
          function (file) {
            // src: file.url()
            wx.request({
              url: 'https://api.qrserver.com/v1/read-qr-code/',
              data: {
                fileurl: file.url()
              },
              header: {
                'content-type': 'application/json'
              },
              method: 'GET',
              success: function (res) {
                console.log(res.data[0].symbol[0].data)
                wx.navigateTo({
                  //携带二维码解析结果参数
                  url: '../Time_fee/Time_fee?qrcode='+res.data[0].symbol[0].data,
                })
              }
            })
            return console.log(file.url());
          },
        ).catch(console.error);
      }
    })
  },  
})
