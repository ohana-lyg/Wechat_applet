import {
    HEADER,
    TOKENNAME,
    HTTPS_REQUEST_URL,
  } from '../data/config.js';

export default function request(api, method, data, {
    noAuth = false,
    customHeader = null,
    baseURL =  "https://qcd2ep.app.cloudendpoint.cn/api" //"http://127.0.0.1:3000/api"
}) {
    let header = customHeader || HEADER
    const token = wx.getStorageSync('CACHE_TOKEN')
    if (!noAuth && token) { 
        header[TOKENNAME] = `Bearer ${token}`
    }

    return new Promise((reslove, reject) => {
        wx.request({
            url: (baseURL || HTTP_REQUEST_URL) + api,
            method: method || 'GET',
            header: header,
            data: data || {},
            success: (res) => {
                if (res.statusCode === 401) {
                    wx.switchTab({
                        url: '/pages/home/home'
                    })
                    wx.showToast({
                        icon: 'none',
                        title: '登录已过期，请重新登录',
                        duration: 800,
                    })
                    wx.clearStorageSync();
                }
                reslove(res.data || null)
            },
            fail: (err) => {
                wx.hideLoading()
                wx.showToast({
                    icon: "none",
                    title: '请求失败，服务器异常！',
                })
            }
        })
    })
}

['get', 'post', 'put', 'head', 'delete', 'trace', 'connect'].forEach((method) => {
    request[method] = (api, data, opt) => request(api, method, data, opt || {})
});