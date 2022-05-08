// pages/evaluate/evaluate.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    stars: [0, 1, 2, 3, 4],
    normalSrc: '../../images/normal.png',
    selectedSrc: '../../images/selected.png',
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
    console.log(e);
    //console.log("分数：" + that.data.key2 + "| 用户id：" + that.data.user_id + "|产品id：" + that.data.food[0]._id + "|内容：" + e.detail.value.neirong);
    //console.log(that);
    var user_oppenid = wx.getStorageSync('user_id');
    const user_name = wx.getStorageSync('user_name');
    const business_name = wx.getStorageSync('business_name');
    console.log(business_name);
    var order_food = wx.getStorageSync('order_food');
    console.log(order_food);
    console.log(user_name);
    order_food.food.forEach(item => {
      console.log(item);
      wx.request({
        url: 'http://127.0.0.1:3000/api/comment/create',
        method: "POST",
        data: {
          picture: item.picture,
          food_name: item.name,
          business_name: business_name,
          food_id: item.food_id ? item.food_id : item._id,
          user_oppenid: user_oppenid,
          user_name: user_name,
          fraction_star: that.data.key2,
          content: e.detail.value.neirong
        },
        success: function (res) {
          console.log(res);
        }
      })
    })

    wx.navigateTo({
      url: '/pages/myorder/myorder',

    })
    wx.showToast({
      title: '提交成功',
    })
  },
  // wx.request({
  //   url: 'http://127.0.0.1:3000/api/comment/create',
  //   method:"POST",
  //   data: {
  //     picture:that.data.food[0].picture,
  //     food_name:that.data.food[0].name,
  //     business_name:business_name,
  //     food_id: that.data.food[0]._id,
  //     user_oppenid: that.data.user_id,
  //     user_name: user_name,
  //     fraction_star: that.data.key2,
  //     content: e.detail.value.neirong
  //   },
  //   success: function (res) {
  //     wx.showToast({
  //       title: '提交成功',
  //     })
  //   }
  // })

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
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