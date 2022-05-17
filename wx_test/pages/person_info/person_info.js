// pages/person_info/person_info.js

import Toast from "../../miniprogram/miniprogram_npm/@vant/weapp/toast/toast";
import FieId from "../../miniprogram/miniprogram_npm/@vant/weapp/field/index";
import Button from "../../miniprogram/miniprogram_npm/@vant/weapp/button/index";
import {Checkuser,Updateuser} from "../apis/user";

Page({

    /**
     * 页面的初始数据
     */
    data: {
        address:'',
        phonenum:'',
        mailbox:''
    },

    
    commit() {
       var that = this;
       var user_oppenid = wx.getStorageSync('user_id');
        const data = {
            user_oppenid:user_oppenid,
            phonenum:that.data.phonenum,
            address:that.data.address,
            mailbox:that.data.mailbox
        };
        Updateuser(data).then(res => {
            Toast('修改成功');
        })
       //console.log(that.data);
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
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
        var that = this;
        var user_oppenid = wx.getStorageSync('user_id');
        const data = {
            user_oppenid:user_oppenid
        };
        Checkuser(data).then(res => {
            that.setData({
                phonenum:res.list.phonenum,
                address:res.list.address,
                mailbox:res.list.mailbox
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