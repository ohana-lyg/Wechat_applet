// pages/order/order.js
import {
  formatTime,
} from '../../utils/util'

import Button from "../../miniprogram/miniprogram_npm/@vant/weapp/button/index";
import Dialog from '../../miniprogram/miniprogram_npm/@vant/weapp/dialog/dialog';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    order: []
  },

  cancelorder: function (options) {
    var that = this;
    //console.log(options);
    var orderTime = new Date(options.target.dataset.any.createdAt).getTime();
    //console.log(orderTime);
    //console.log(formatTime(orderTime));
    var time = new Date().getTime();
    //console.log(formatTime(time));
    //console.log(time - orderTime);
    var timer = (time - orderTime) / 60000;
    //console.log(timer);
    if (timer > 15) {
      Dialog.confirm({
          title: '订单已超过15分钟',
          message: '无法取消订单',
        })
        .then(() => {
          // console.log(options.target.dataset.any._id);
          // wx.request({
          //   url: 'http://127.0.0.1:3000/api/order/update',
          //   method: "PUT",
          //   data: {
          //     cancel: "1",
          //     _id: options.target.dataset.any._id
          //   },
          //   success: function (res) {
          //     console.log(res);
          //     that.showorder();
          //   }
          // })
        })
        .catch(() => {
          // on cancel
        })
    } else {
      Dialog.confirm({
          title: '确定取消订单',
          message: '如果点击确定，将取消订单',
        })
        .then(() => {
          console.log(options.target.dataset.any._id);
          wx.request({
            url: 'http://127.0.0.1:3000/api/order/update',
            method: "PUT",
            data: {
              cancel: "1",
              _id: options.target.dataset.any._id
            },
            success: function (res) {
              console.log(res);
              that.showorder();
            }
          })
        })
        .catch(() => {
          // on cancel
        })
    }
  },

  comment: function (options) {
    console.log(options.target.dataset.any);
    wx.setStorageSync('order_food', options.target.dataset.any)
    wx.request({
      url: 'http://127.0.0.1:3000/api/business/check',
      method: "POST",
      data: {
        business_id: options.target.dataset.any.business_id
      },
      success: function (res) {
        //console.log(res.data.list.name);
        wx.setStorageSync('business_name', res.data.list.name)
      }
    })
    //wx.set
  },

  showorder: function () {
    var that = this;
    wx.getStorage({
      key: 'user_id',
      success: function (res) {
        console.log(res);
        that.setData({
          user_id: res.data
        })
        wx.request({
          url: 'http://127.0.0.1:3000/api/order/check',
          method: "POST",
          data: {
            user_oppenid: res.data
          },
          success: function (res2) {
            console.log(res2.data)
            res2.data.list.forEach(item => {
              item.createdAt = formatTime(item.createdAt)
            })
            that.setData({
              order: res2.data.list
            })
          }
        })
      },
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.showorder();
    wx.setNavigationBarTitle({
      title: options.name,
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