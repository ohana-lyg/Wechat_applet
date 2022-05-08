// pages/shopcar/shopcar.js

//import { foods } from '../../data/data'

import Image from "../../miniprogram/miniprogram_npm/@vant/weapp/image/index";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    foods:[],
    cost:0,
    user_oppenid:'',
  },

  jiesuan: function () {
    var user_id = wx.getStorageSync('user_id')
    console.log(user_id);
    wx.navigateTo({
      url: '/pages/place_order/place_order?user_oppenid=user_id',
    })
  },

  myjian:function(event) {
    var that = this;
    //console.log(event);
    // console.log(event.target.dataset.any.user_oppenid);
    // console.log(event.target.dataset.any.food_id);
    //var num = event.target.dataset.any.count;
    // console.log(event.currentTarget.dataset.jian);
    if (event.currentTarget.dataset.jian == 0) {
      //console.log("数量为0，删除购物车数据")
      //删除数据
      wx.showModal({
        title: '删除确认',
        content: '删除后不可恢复',
        success(res) {
          if (res.confirm) {
            //console.log("用户点击了确认")
            //删除购物车，参数为用户的id和购物车id
            var user_oppenid = wx.getStorageSync('user_id');
            wx.request({
              url: 'http://127.0.0.1:3000/api/shopcar/delete',
              method:"POST",
              data: {
                user_oppenid:user_oppenid,
                food_id:event.target.dataset.food_id
              },
              success: function (res2) {
                //console.log(res2.data)
                that.shopcar()
              }
            })
          } else if (res.cancel) {
            //console.log("用户点击了取消")
          }
        }
      })
    }
    else {
      var user_oppenid = wx.getStorageSync('user_id');
    wx.request({
      url: 'http://127.0.0.1:3000/api/shopcar/update',
      method:"PUT",
      data: {
        count: event.currentTarget.dataset.jian,
        food_id: event.target.dataset.food_id,
        user_oppenid: user_oppenid
      },
      success: function (res2) {
        //console.log(res2.data)
        that.shopcar()
      }
    })
    }
  },

  myjia:function(event) {
    var that = this;
    //console.log(event);
    var user_oppenid = wx.getStorageSync('user_id');
    wx.request({
      url: 'http://127.0.0.1:3000/api/shopcar/update',
      method:"PUT",
      data: {
        count: event.currentTarget.dataset.jia,
        food_id: event.target.dataset.food_id,
        user_oppenid: user_oppenid
      },
      success: function (res2) {
        //console.log(res2.data)
        that.shopcar()
      }
    })
  },

  shopcar:function() {
    var that = this;
    wx.getStorage({
      key: 'user_id',
      success: function (res) {
        //console.log(res.data)
        that.setData({ user_oppenid: res.data })
        //获取远程数据
        wx.request({
          url: 'http://127.0.0.1:3000/api/shopcar/listAll',
          method:"POST",
          data: { user_oppenid: res.data },
          success: function (res2) {
            console.log(res2.data.list);
            var money = 0
            res2.data.list.forEach(item => {
              money += item.count * item.price;
            })
            //console.log(money);
            that.setData({
              cost:money
            })
            that.setData({ 
              foods: res2.data.list
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
    //获取系统信息，手机的屏幕高度
    // wx.getSystemInfo({
    //   success: function (res) {
    //     that.setData({
    //       winHeight: res.windowHeight
    //     })
    //   },
    // })
    //获取用户id和远程数据
    wx.getStorage({
      key: 'user_id',
      success: function (res) {
        //console.log(res.data)
        that.setData({ user_oppenid: res.data })
        //获取远程数据
        wx.request({
          url: 'http://127.0.0.1:3000/api/shopcar/listAll',
          method:"POST",
          data: { user_oppenid: res.data },
          success: function (res2) {
            //console.log(res2);
            var money = 0
            res2.data.list.forEach(item => {
              money += item.count * item.price;
            })
            //console.log(money);
            that.setData({
              cost:money
            })
            that.setData({ 
              foods: res2.data.list
            })
          }
        })

        //获取购物车费用
        // wx.request({
        //   url: 'http://116.yaoyiwangluo.com/wx_gwc_feiyong.asp',
        //   data: { uid: res.data },
        //   success: function (res2) {
        //     that.setData({ zongfeiyong: res2.data })
        //   }
        // })
      },
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
    var that=this
    that.shopcar()
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