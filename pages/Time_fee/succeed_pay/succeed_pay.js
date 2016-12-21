// pages/Time_fee/bill_pay/succeed_pay/succeed_pay.js
const AV = require('../../../../utils/av-weapp');

var app = getApp();
var start_time = 0;
var total_cost = 0;
var local = '';
var Timer = 0;
var latitude = 30.751661;
var longitude = 103.93016;
var localname = '';

Page({
  data: {},
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    start_time = options.start_time;
    total_cost = options.total_cost;
    local = options.local;
    Timer = options.Timer;
    latitude = options.latitude;
    longitude = options.longitude;
    localname = options.localname;

    app.globalData.timer_flag = 0;
    app.globalData.state_flag = 0;

    var userid = app.globalData.userid;
    var Guest2 = AV.Object.extend('Guest' + userid);

    var guest2 = new Guest2();
    guest2.set('start_time', start_time);
    guest2.set('total_cost', total_cost);
    guest2.set('local', local);
    guest2.set('Timer', Timer);
    guest2.set('latitude', latitude);
    guest2.set('longitude', longitude);
    guest2.set('localname', localname);
    guest2.save().then(function (guest2) {
      // 成功保存之后，执行其他逻辑.
      // console.log('新对象创建（ID）成功: ' + guest2.id);
    }, function (error) {
      // 异常处理
      console.error('新对象创建失败:, with error message: ' + error.message);
    })
  },
  onShareAppMessage: function () {
    return {
      title: '萌芽停車',
      desc: '便捷停車！！！',
      // path: '/pages/Time_fee/bill_pay/user?id=123'
    }
  }
})