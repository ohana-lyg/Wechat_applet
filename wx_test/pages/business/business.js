// pages/business/business.js
import {
  Updatebusiness,
  Createbusiness,
  Checkbusiness,
} from "../apis/business";
import Getdining_room from "../apis/dining_room";
import Switch from "../../miniprogram/miniprogram_npm/@vant/weapp/switch/index";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    shop: "",
    businesss_name: '',
    dining_room: '',
    checked: true
  },

  onChange: function ({
    detail
  }) {
    var user_oppenid = wx.getStorageSync('user_id')
    console.log(detail);
    this.setData({
      checked: detail
    });
    const data = {
      rest: this.data.checked,
      user_oppenid: user_oppenid
    };
    Updatebusiness(data).then(res => {
      console.log(res);
    })
  },

  commit: function () {
    var that = this;
    var user_oppenid = wx.getStorageSync('user_id');
    console.log(that.data.businesss_name);
    Getdining_room().then(res => {
      //console.log(res);
      const dining = res.data.list.filter(item => item.name == that.data.dining_room);
      //console.log(dining[0]._id);
      const data = {
        user_oppenid: user_oppenid,
        name: that.data.businesss_name,
        dining_room_id: dining[0]._id,
        rest: false,
        examine: false
      };
      Createbusiness(data).then(res => {
        that.setData({
          shop: false
        })
      })
    })
  },

  showbusiness: function () {
    var user_oppenid = wx.getStorageSync('user_id');
    var that = this;
    const data = {
      user_oppenid: user_oppenid
    };
    Checkbusiness(data).then(res => {
      console.log(res);
      console.log(res.list.rest);
      if (res.list.examine) {
        that.setData({
          shop: true,
        })
        if (res.list.rest) {
          that.setData({
            checked: true
          })
        } else {
          that.setData({
            checked: false
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.showbusiness();
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
    var user_oppenid = wx.getStorageSync('user_id');
    wx.request({
      url: 'url',
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