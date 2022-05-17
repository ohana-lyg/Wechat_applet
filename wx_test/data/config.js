const HTTP_REQUEST_URL = "http://127.0.0.1:3002/"
const HTTPS_REQUEST_URL = "https://qc4vl7.app.cloudendpoint.cn/"

module.exports = {
    HTTP_REQUEST_URL,
    HTTPS_REQUEST_URL,
    HEADER: {
        'content-type': 'application/json'
    },
    APP_ID: 'wxaefe0237fd2dfb1e',
    //回话密钥名称 
    TOKENNAME: 'Authorization',
    //用户信息缓存名称
    CACHE_USERINFO: 'USERINFO',
    //code
    CACHE_CODE: "CODE",
    //code获取时间戳
    CACHE_CODE_TIME: "CODETIME",
    //微信官方称code有效时间为五分钟，保险起见设置 4.5 分钟
    CODE_EFFECTIVE_TIME: 45000,
    //token缓存名称
    CACHE_TOKEN: 'TOKEN',
    //token获取时间戳
    CACHE_TOKEN_TIME: 'CACHE_TOKEN_TIME',
    //token有效时间
    TOKEN_EFFECTIVE_TIME: '10d',
}