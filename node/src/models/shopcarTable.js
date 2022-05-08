// 使用 inspirecloud 调用轻服务功能
const inspirecloud = require("@byteinspire/inspirecloud-api");

//购物车表
const shopcarTable = inspirecloud.db.table("shopcar");

module.exports = shopcarTable;
