const shopcarTable = require("../models/shopcarTable");
const inspirecloud = require("@byteinspire/inspirecloud-api");
const ObjectId = inspirecloud.db.ObjectId;
const db = inspirecloud.db;

class shopcarService {
  async listAll(shopcarInfo) {
    const all = await shopcarTable
      .where({ user_oppenid: shopcarInfo.user_oppenid })
      .find();
    return all;
  }
  async create(shopcar) {
    console.log(shopcar);
    return await shopcarTable.save(shopcar);
  }
  async delete(shopcarInfo) {
    console.log(shopcarInfo);
    console.log(shopcarInfo.food_id);
    if (shopcarInfo.food_id) {
      const result = await shopcarTable
        .where(
          db.and(
            { user_oppenid: shopcarInfo.user_oppenid },
            { food_id: shopcarInfo.food_id }
          )
        )
        .delete();
      if (result.deletedCount === 0) {
        const error = new Error(`shopcar:${shopcarInfo.food_id} not found`);
        error.status = 404;
        throw error;
      }
    } else {
      const result = await shopcarTable
        .where({ user_oppenid: shopcarInfo.user_oppenid })
        .delete();
      if (result.deletedCount === 0) {
        const error = new Error(`shopcar:${shopcarInfo.food_id} not found`);
        error.status = 404;
        throw error;
      }
    }
  }
  async update(shopcarInfo) {
    const shopcar = await shopcarTable
      .where(
        db.and(
          { user_oppenid: shopcarInfo.user_oppenid },
          { food_id: shopcarInfo.food_id }
        )
      )
      .findOne();
    if (!shopcar) {
      const error = new Error(`shopcar:${id} not found`);
      error.status = 404;
      throw error;
    }
    shopcar.count = shopcarInfo.count;
    return await shopcarTable.save(shopcar);
  }
  async check(shopcarInfo) {
    console.log(shopcarInfo);
    const shopcar = await shopcarTable
      .where({ food_id: shopcarInfo.food_id })
      .find();
    console.log(shopcar);
    //console.log(shopcar);
    if (!shopcar) {
      const result = await shopcarTable.save(shopcarInfo);
      return result;
    }
    return shopcar;
  }
}
module.exports = new shopcarService();
