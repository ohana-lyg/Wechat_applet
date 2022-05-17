// pages/place_order/place_order.js

import FieId from "../../miniprogram/miniprogram_npm/@vant/weapp/field/index";
import Dialog from '../../miniprogram/miniprogram_npm/@vant/weapp/dialog/dialog';

import {
  Createorder
} from "../apis/order";
import {
  Deleteshopcar,
  Getshopcar
} from "../apis/shopcar";
import {
  Checkfood
} from "../apis/food";
import {Checkuser} from "../apis/user";

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
            const data = {
              user_oppenid: user_oppenid,
              food: fo,
              address: that.data.address,
              business_id: item.business_id,
              cost: money,
              user_name: user_name,
              message: event.detail.value.liuyan
            };
            Createorder(data).then(res => {
              console.log(res);
            })
          })
          wx.switchTab({
            url: '/pages/index/index',
          })
          const data_shopcar = {
            user_oppenid: user_oppenid
          };
          Deleteshopcar(data_shopcar).then(res => {
            console.log(res);
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
      const data = {
        user_oppenid: options.user_oppenid
      };
      Getshopcar(data).then(res => {
        console.log(res);
        var money = 0;
        res.list.forEach(item => {
          money += item.count * item.price;
        })
        //console.log(money);
        that.setData({
          cost: money
        })
        that.setData({
          food: res.list
        })
      })
    } else {
      const data = {
        business_id: options.business_id
      };
      Checkfood(data).then(res => {
        f = res.list.filter(item => item._id == options.food_id);
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
    var user_oppenid = wx.getStorageSync('user_id');
    const data = {
      user_oppenid: user_oppenid
    };
    Checkuser(data).then(res => {
      that.setData({
        address: res.list.address
      })
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