// // Time_fee.js

// var util = require('../../utils/util.js')

  function formatTime(date) {
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()

    var hour = date.getHours()
    var minute = date.getMinutes()
    var second = date.getSeconds()

    return "停车开始时间:" + [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute].map(formatNumber).join(':')
    }

function formatNumber(n) {
  	n = n.toString()
  	return n[1] ? n : '0' + n
	}



/** 
计时功能模块
//初始化开始时间为0毫秒

/* 秒级计时 */
var total_micro_second = 0;
function timer_cost(that) {	

  	  	that.setData({
  		Timer:date_format(total_micro_second),
		total_cost:Math.floor(total_micro_second/1000)
  		});
// 一个月
		if (total_micro_second/1000/24/3600>=30) {	
  			that.setData({
  			Timer:"已经达到一个月期限"
  		})
	    }    
setTimeout(function(){
// 10ms递归调用自己，刷新数据
		total_micro_second += 10;
		timer_cost(that);
	}
	,10)

}

// 时间格式化输出，如03:25:19 86。每10ms都会调用一次
function date_format(micro_second) {
  	// 秒数
  	var second = Math.floor(micro_second / 1000);
	// 天数位
	var day = Math.floor(second/3600/24);
  	// 小时位
  	var hr = Math.floor(second / 3600);
  	// 分钟位
  	var min = fill_zero_prefix(Math.floor((second - hr * 3600) / 60));
  	// 秒位
	var sec = fill_zero_prefix((second - hr * 3600 - min * 60));// equal to => var sec = second % 60;
	// 毫秒位，保留2位
	var micro_sec = fill_zero_prefix(Math.floor((micro_second % 1000) / 10));
	// time_clock=[day,hr,min,sec];
	// return time_clock;
	return  "停车时间："+ day + "天" + hr +"时" + min+"分" + sec +"秒" ;
}

// 位数不足补零
function fill_zero_prefix(num) {
	return num < 10 ? "0" + num : num
}

Page({
	data: {
		Timer: '',
		start_time:'',
		total_cost:'',
		qrcode:'初始二维码',
	},
	onLoad: function(options) {
		timer_cost(this);
		this.setData({
			// 记录下停车开始时间	
			start_time:formatTime(new Date()),
			//二维码扫描结果
			qrcode:options.qrcode,
		})
	},
	weixin_pay:function(){
		//保留当前页面
    wx.navigateTo({
      url: 'succeed_pay/succeed_pay' 
    })
  }
});
