// 使用 inspirecloud 调用轻服务功能
const inspirecloud = require("@byteinspire/inspirecloud-api");

//菜品表
const foodTable = inspirecloud.db.table("food");

module.exports = foodTable;
