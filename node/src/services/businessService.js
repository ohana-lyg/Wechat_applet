const businessTable = require("../models/businessTable");
const inspirecloud = require("@byteinspire/inspirecloud-api");
const ObjectId = inspirecloud.db.ObjectId;

class businessService {
  async listAll() {
    const all = await businessTable.where().find();
    return all;
  }
  async create(business) {
    return await businessTable.save(business);
  }
  async delete(id) {
    const result = await businessTable.where({ _id: ObjectId(id) }).delete();
    if (result.deletedCount === 0) {
      const error = new Error(`business:${id} not found`);
      error.status = 404;
      throw error;
    }
  }
  async update(businessInfo) {
    if (businessInfo.user_oppenid) {
      const business = await businessTable
        .where({ user_oppenid: businessInfo.user_oppenid })
        .findOne();
      if (!business) {
        const error = new Error(`business:${id} not found`);
        error.status = 404;
        throw error;
      }
      business.rest = businessInfo.rest;
      await businessTable.save(business);
    } else {
      const business = await businessTable
        .where({ _id: ObjectId(businessInfo.id) })
        .findOne();
      if (!business) {
        const error = new Error(`business:${id} not found`);
        error.status = 404;
        throw error;
      }
      business.rest = true;
      business.examine = true;
      return await businessTable.save(business);
    }
  }
  async check(businessInfo) {
    console.log(businessInfo);
    if (businessInfo.user_oppenid) {
      const business = await businessTable
        .where({ user_oppenid: businessInfo.user_oppenid })
        .findOne();
      // if (!business) {
      //   const message = "你未注册店铺";
      //   return message;
      //   const error = new Error(`business:${id} not found`);
      //   error.status = 404;
      //   throw error;
      // }
      return business;
    } else {
      const business = await businessTable
        .where({ _id: ObjectId(businessInfo.business_id) })
        .findOne();
      if (!business) {
        const error = new Error(`business:${id} not found`);
        error.status = 404;
        throw error;
      }
      return business;
    }
  }
}
module.exports = new businessService();
