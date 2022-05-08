// pages/order_info/order_info.js

import {
    formatTime
  } from '../../utils/util'
import {order} from '../../data/data'

Page({

    /**
     * 页面的初始数据
     */
    data: {
        order
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        var user_oppenid = wx.getStorageSync('user_id');
        wx.request({
          url: 'http://127.0.0.1:3000/api/business/check',
          method:"POST",
          data: {
              user_oppenid:user_oppenid
          },
          success:function(res) {
              console.log(res);
              console.log(res.data.list._id);
              wx.request({
                url: 'http://127.0.0.1:3000/api/order/check',
                method:"POST",
                data: {
                    business_id:res.data.list._id
                },
                success:function(res1) {
                    console.log(res1);
                    res1.data.list.forEach(item => {
                        item.createdAt = formatTime(item.createdAt)
                    })
                    that.setData({
                      order:res1.data.list  
                    })
                }
              })
          }
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