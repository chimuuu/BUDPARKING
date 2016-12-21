// pages/Time_fee/Time_fee.js

function formatTime(date) {
	var year = date.getFullYear()
	var month = date.getMonth() + 1
	var day = date.getDate()

	var hour = date.getHours()
	var minute = date.getMinutes()
	var second = date.getSeconds()

	return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute].map(formatNumber).join(':')
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
	// console.log('app.globalData.timer_flag' + app.globalData.timer_flag)
	if (start == 1 && app.globalData.timer_flag == 0) {
		that.setData({
			Timer: date_format(total_micro_second),
			total_cost: Math.floor(total_micro_second / 3000)
		});
		// 一个月
		if (total_micro_second / 1000 / 24 / 3600 >= 30) {
			that.setData({
				Timer: "已经达到一个月期限"
			})
		}
		// console.log('kaishi jishi'+total_micro_second)
		setTimeout(function () {
			// 10ms递归调用自己，刷新数据
			total_micro_second += 1000;
			timer_cost(that);
		}, 1000)
	}
}

function timer_cost_continue(that) {
	if (start == 1 && app.globalData.timer_flag == 1) {
		// console.log(app.globalData.start_time);
		var d = new Date();
		total_micro_second = d.getTime() - app.globalData.start_data;
		that.setData({
			Timer: date_format(total_micro_second),
			total_cost: Math.floor(total_micro_second / 3000)
		});
		// console.log('huilai jishi'+total_micro_second)
		// 一个月
		if (total_micro_second / 1000 / 24 / 3600 >= 30) {
			that.setData({
				Timer: "已经达到一个月期限"
			})
		}
		setTimeout(function () {
			// 10ms递归调用自己，刷新数据
			timer_cost_continue(that);
		}, 1000)
	}
}

// 时间格式化输出，如03:25:19 86。每10ms都会调用一次
function date_format(micro_second) {
	// 秒数
	var second = Math.floor(micro_second / 1000);
	// 天数位
	var day = fill_zero_prefix(Math.floor(second / 3600 / 24));
	// 小时位
	var hr = fill_zero_prefix(Math.floor(second / 3600));
	// 分钟位
	var min = fill_zero_prefix(Math.floor((second - hr * 3600) / 60));
	// 秒位
	var sec = fill_zero_prefix((second - hr * 3600 - min * 60));// equal to => var sec = second % 60;
	// 毫秒位，保留2位
	return day + ":" + hr + ":" + min + ":" + sec + " ";
}

// 位数不足补零
function fill_zero_prefix(num) {
	return num < 10 ? "0" + num : num
}

var start_time = 0;
var local = '';
var total_cost = 0;
var start = 0;
var start_flag = 0;
var latitude = 30.751661;
var longitude = 103.93016;
var localname = '';
var app = getApp()
var d = new Date();

Page({
	data: {
		Timer: '',
		total_cost: '',
		mlocation: '',
		start_time: '',
	},
	onLoad: function (options) {
		// 页面初始化 options为页面跳转所带来的参数	
		if (app.globalData.timer_flag == 0) {
			app.globalData.state_flag = 1;
			app.globalData.start_time = d.getTime();
			start = 1;
			timer_cost(this);
			app.globalData.start_data = new Date();
			// console.log('kaishiload'+app.globalData.start_data)
			// console.log('kaishiload'+'start_time'+start_time)
			start_time = formatTime(app.globalData.start_data);
			local = options.qrcode;
			app.globalData.local = local;
			this.setData({
				// 记录下停车开始时间	
				start_time: start_time,
				//二维码扫描结果
				mlocation: local,
			})
			wx.getLocation({
				type: 'gcj02', //返回可以用于wx.openLocation的经纬度
				success: function (lres) {
					latitude = lres.latitude
					longitude = lres.longitude
					localname = lres.name
				}
			})
		}
		var that = this
		wx.getUserInfo({
			success: function (res) {
				var userInfo = res.userInfo
				var nickName = userInfo.nickName
				var avatarUrl = userInfo.avatarUrl
				that.setData({
					avatarUrl:avatarUrl,
					nickName:nickName
				})
		}
	})
	},
	weixin_pay: function () {
		//保留当前页面
		// console.log(total_micro_second)
		wx.redirectTo({
			url: 'bill_pay/succeed_pay/succeed_pay?start_time=' + start_time + '&local='
			+ local + '&total_cost=' + Math.floor(total_micro_second / 3000) + '&Timer=' + date_format(total_micro_second)
			+ '&latitude=' + latitude + '&longitude=' + longitude + '&localname=' + localname,
			success: function () {
				total_micro_second = 0,
					start_time = 0,
					local = '',
					total_cost = 0,
					start = 0;
			},
		})
	},
	onShow: function () {
		if (app.globalData.timer_flag == 1) {
			start = 1;
			start_flag = 1;
			var start_data = formatTime(app.globalData.start_data);
			start_time = start_data;
			// console.log('huilai show'+'start_time'+start_data)
			timer_cost_continue(this);
			local = app.globalData.local;
			this.setData({
				// 记录下停车开始时间	
				start_time: start_time,
				//二维码扫描结果
				mlocation: local,
			})
		}
	},
	onUnload: function () {
		total_micro_second = 0;
		start_time = 0;
		local = '';
		total_cost = 0;
		console.log('unload');
		start = 0;
		app.globalData.timer_flag = 1;
	}
})