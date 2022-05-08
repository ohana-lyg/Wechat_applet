// pages/place_order/place_order.js

import FieId from "../../miniprogram/miniprogram_npm/@vant/weapp/field/index";
import Dialog from '../../miniprogram/miniprogram_npm/@vant/weapp/dialog/dialog';

import {
  foods
} from "../../data/data"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    food: [],
    cost: 0,
    address: '',
    isshow: true
  },


  xiadan: function (event) {
    var that = this;
    var user_oppenid = wx.getStorageSync('user_id');
    var user_name = wx.getStorageSync('user_name');
    console.log(user_name);
    console.log(that.data.food);
    if (event.detail.target.id == "xiadan") {
      var screen = that.data.food.slice();
      let obj = {};
      var peon = screen.reduce((cur, next) => {
        obj[next.business_id] ? "" : obj[next.business_id] = true && cur.push(next);
        return cur;
      }, [])
      console.log(peon);
      Dialog.confirm({
          title: '订单支付',
          message: '请继续确认支付',
        })
        .then(() => {
          peon.forEach(item => {
            console.log(item);
            var fo = that.data.food.filter(item1 => item.business_id == item1.business_id)
            console.log(fo);
            var money = 0;
            fo.forEach(item2 => {
              money += item2.count * item2.price;
            })
            wx.request({
              url: 'http://127.0.0.1:3000/api/order/create',
              method: "POST",
              data: {
                user_oppenid: user_oppenid,
                food: fo,
                address: that.data.address,
                business_id: item.business_id,
                cost: money,
                user_name: user_name,
                message: event.detail.value.liuyan
              },
              success: function () {
                // wx.switchTab({
                //   url: '/pages/index/index',
                // })
              },
            })
            // console.log("下单处理")
            // console.log(event.detail.value)
            // console.log("用户id:" + user_oppenid)
            // console.log(that.data.food);
            // console.log(that.data.cost);
          })
          wx.switchTab({
            url: '/pages/index/index',
          })
          wx.request({
            url: 'http://127.0.0.1:3000/api/shopcar/delete',
            method: "POST",
            data: {
              user_oppenid: user_oppenid
            }
          })
        })
        .catch(() => {
          // on cancel
        });
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log(options);
    if (options.user_oppenid) {
      wx.request({
        url: 'http://127.0.0.1:3000/api/shopcar/listAll',
        method: "POST",
        data: {
          user_oppenid: options.user_oppenid
        },
        success: function (res) {
          //console.log(res);
          var money = 0;
          res.data.list.forEach(item => {
            money += item.count * item.price;
          })
          //console.log(money);
          that.setData({
            cost: money
          })
          that.setData({
            food: res.data.list
          })
        }
      })
    } else {
      wx.request({
        url: 'http://127.0.0.1:3000/api/food/check',
        method: "POST",
        data: {
          business_id: options.business_id
        },
        success: function (res) {
          f = res.data.list.filter(item => item._id == options.food_id);
          //console.log(f);
          var money = f[0].price;
          //console.log(money);
          f.forEach(item => {
            item.count = 1;
            item.food_id = options.food_id;
          })
          that.setData({
            food: f
          })
          that.setData({
            cost: money
          })
        }
      })
    }
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
    var that = this;
    var user_oppenid = wx.getStorageSync('user_id')
    wx.request({
      url: 'http://127.0.0.1:3000/api/user/check',
      method: "POST",
      data: {
        user_oppenid: user_oppenid
      },
      success: function (res) {
        that.setData({
          address: res.data.list.address
        })
      }
    })
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