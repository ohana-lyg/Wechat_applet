// 使用 inspirecloud 调用轻服务功能
const inspirecloud = require("@byteinspire/inspirecloud-api");

//商家和菜品联系表
const business_foodTable = inspirecloud.db.table("business_food");

module.exports = business_foodTable;
