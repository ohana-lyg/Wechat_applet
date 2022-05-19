// pages/details/details.js
import Image from "../../miniprogram/miniprogram_npm/@vant/weapp/image/index";
import {
  formatTime
} from "../../utils/util";
import {
  foods,
  food
} from "../../data/data";
import Icon from '../../miniprogram/miniprogram_npm/@vant/weapp/icon/index';

import {
  Createcollection,
  Deletecollection,Checkcollection
} from "../apis/collection";
import {
  Createcomment,Checkcomment
} from "../apis/comment";
import {
  Createshopcar,
  Checkshopcar
} from "../apis/shopcar";
import {Checkorder} from "../apis/order";
import {Checkfood} from "../apis/food";


Page({

  /**
   * 页面的初始数据
   */
  data: {
    food: [],
    images: "",
    currentTab: 0,
    price: '',
    count: 0,
    comment: [],
    stars: [0, 1, 2, 3, 4],
    normalSrc: '../../images/normal.png',
    selectedSrc: '../../images/selected.png',
    iscollect: ''
  },

  collection: function (e) {
    console.log(e.currentTarget.dataset.any);
    var that = this;
    var bol = e.currentTarget.dataset.any;
    var user_oppenid = wx.getStorageSync('user_id');
    var business_name = wx.getStorageSync('business_name');
    that.setData({
      iscollect: !bol
    })
    if (that.data.iscollect) {
      const data = {
        user_oppenid: user_oppenid,
        business_name: business_name,
        business_id: that.data.food[0].business_id,
        food_id: that.data.food[0]._id,
        food_name: that.data.food[0].name,
        food_price: that.data.food[0].price,
        food_picture: that.data.food[0].picture,
      };
      Createcollection(data).then(res => {
        console.log(res);
      })
    } else {
      const data = {
        user_oppenid: user_oppenid,
        food_id: that.data.food[0]._id,
      };
      Deletecollection(data).then(res => {
        console.log(res);
      })
    }
    console.log(bol);
  },

  swichNav: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },

  huadong: function (e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    })
  },

  select00: function (e) {
    var that = this;
    var key = e.currentTarget.dataset.key + 1
    console.log("得分：" + key)
    that.setData({
      key: key - 1,
      key2: key
    })
  },

  pinglun: function (e) {
    var that = this;
    //console.log(e);
    //console.log("分数：" + that.data.key2 + "| 用户id：" + that.data.user_id + "|产品id：" + that.data.food[0]._id + "|内容：" + e.detail.value.neirong);
    //console.log(that);
    const user_name = wx.getStorageSync('user_name')
    const business_name = wx.getStorageSync('business_name');
    //console.log(user_name);
    const data = {
      picture: that.data.food[0].picture,
      food_name: that.data.food[0].name,
      business_name: business_name,
      food_id: that.data.food[0]._id,
      user_oppenid: that.data.user_id,
      user_name: user_name,
      fraction_star: that.data.key2,
      content: e.detail.value.neirong
    };
    Createcomment(data).then(res => {
      wx.showToast({
        title: '提交成功',
      })
    })
  },

  jiaGwc: function () {
    var that = this;
    //console.log(that.data)
    //console.log("用户id：" + that.data.user_id + "|产品id：" + that.data.food[0]._id + that.data.food[0].name + that.data.food[0].price)

    //加入购物车
    const data = {
      user_oppenid: that.data.user_id,
      food_id: that.data.food[0].id,
      name: that.data.food[0].name,
      price: that.data.food[0].price,
      count: 1
    };
    Checkshopcar(data).then(res => {
      var data_food = res.list.filter(item => item.food_id == that.data.food[0]._id);
      if (!data_food.length) {
        const datax = {
          user_oppenid: that.data.user_id,
          food_id: that.data.food[0]._id,
          business_id: that.data.food[0].business_id,
          name: that.data.food[0].name,
          price: that.data.food[0].price,
          picture: that.data.food[0].picture,
          count: 1
        };
        Createshopcar(datax).then(res1 => {
          wx.showToast({
            title: '加入购物车成功',
          })
        })
      } else {
        wx.showToast({
          title: '已经在购物车',
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    var that = this;
    wx.setStorageSync('food', options)
    console.log(options);
    var business_id = options.business_id;
    //console.log(business_id);

    //获取产品图片
    const data_food = {
      business_id: business_id
    };
    Checkfood(data_food).then(res => {
      f = res.list.filter(item => item._id == options.food_id);
        that.setData({
          food: f
        })
    })

    // console.log(date);
    //获取评论信息
    console.log(options.food_id);
    const data_comment = {
      food_id: options.food_id
    };
    Checkcomment(data_comment).then(res => {
      console.log(res);
        res.list.forEach(item => {
          item.createdAt = formatTime(item.createdAt)
        })
        console.log(res.list);
        that.setData({
          comment: res.list
        })
    })

    //获取收藏
    var user_oppenid = wx.getStorageSync('user_id');
    const data_collection = {
      user_oppenid: user_oppenid,
      food_id: options.food_id,
    };
    Checkcollection(data_collection).then(res => {
      console.log(res);
        if (res.list.length) {
          that.setData({
            iscollect: true
          })
        }
    })

    //获取菜品销售量
    const data_order = {
      business_id: business_id
    };
    Checkorder(data_order).then(res => {
      console.log(res);
        var count = 0;
        res.list.forEach(item => {
          item.food.forEach(item1 => {
            if (item1.food_id) {
              if (item1.food_id == options.food_id) {
                count += item1.count;
                console.log(count);
              }
            } else {
              if (item1._id == options.food_id) {
                count += item1.count;
                console.log(count);
              }
            }
          })
        })
        console.log(count);
        that.setData({
          count: count
        })
    })

    //获得用户id
    wx.getStorage({
      key: 'user_id',
      success: function (res) {
        that.setData({
          user_id: res.data
        })
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
  // onShow: function () {
  //   wx.request({
  //     url: 'http://127.0.0.1:3000/api/comment/check',
  //     method:"POST",
  //     data: {
  //       food_id: that.data.food[0]._id
  //     },
  //     success: function (res) {
  //       console.log(res);
  //       res.data.list.forEach(item => {
  //         item.createdAt = formatTime(item.createdAt)
  //       })
  //       //console.log(res.data.list);
  //       that.setData({
  //         comment: res.data.list
  //       })
  //     }
  //   })
  // },

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