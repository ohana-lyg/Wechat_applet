// pages/shopcar/shopcar.js

//import { foods } from '../../data/data'

import Image from "../../miniprogram/miniprogram_npm/@vant/weapp/image/index";
import {
  Deleteshopcar,
  Updateshopcar,
  Getshopcar
} from "../apis/shopcar";


Page({

  /**
   * 页面的初始数据
   */
  data: {
    foods: [],
    cost: 0,
    user_oppenid: '',
  },

  jiesuan: function () {
    var user_id = wx.getStorageSync('user_id')
    console.log(user_id);
    wx.navigateTo({
      url: '/pages/place_order/place_order?user_oppenid=user_id',
    })
  },

  myjian: function (event) {
    var that = this;
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
            const data = {
              user_oppenid: user_oppenid,
              food_id: event.target.dataset.food_id
            };
            Deleteshopcar(data).then(res => {
              that.shopcar();
            })
          } else if (res.cancel) {
            //console.log("用户点击了取消")
          }
        }
      })
    } else {
      var user_oppenid = wx.getStorageSync('user_id');
      const data = {
        count: event.currentTarget.dataset.jian,
        food_id: event.target.dataset.food_id,
        user_oppenid: user_oppenid
      };
      Updateshopcar(data).then(res => {
        that.shopcar();
      })
    }
  },

  myjia: function (event) {
    var that = this;
    //console.log(event);
    var user_oppenid = wx.getStorageSync('user_id');
    const data = {
      count: event.currentTarget.dataset.jia,
      food_id: event.target.dataset.food_id,
      user_oppenid: user_oppenid
    };
    Updateshopcar(data).then(res => {
      that.shopcar()
    })
  },

  shopcar: function () {
    var that = this;
    wx.getStorage({
      key: 'user_id',
      success: function (res) {
        //console.log(res.data)
        that.setData({
          user_oppenid: res.data
        })
        //获取远程数据
        const data = {
          user_oppenid: res.data
        };
        Getshopcar(data).then(res2 => {
          console.log(res2.list);
          var money = 0
          res2.list.forEach(item => {
            money += item.count * item.price;
          })
          //console.log(money);
          that.setData({
            cost: money
          })
          that.setData({
            foods: res2.list
          })
        })
      },
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.shopcar();
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
    var that = this
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