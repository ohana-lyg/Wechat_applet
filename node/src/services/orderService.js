const orderTable = require("../models/orderTable");
const inspirecloud = require("@byteinspire/inspirecloud-api");
const ObjectId = inspirecloud.db.ObjectId;

class orderService {
  async listAll() {
    const all = await orderTable.where().find();
    return all;
  }
  async create(order) {
    return await orderTable.save(order);
  }
  async delete(id) {
    console.log(id);
    const result = await orderTable.where({ _id: ObjectId(id) }).delete();
    if (result.deletedCount === 0) {
      const error = new Error(`order:${id} not found`);
      error.status = 404;
      throw error;
    }
  }
  async update(orderInfo) {
    console.log(orderInfo);
    const order = await orderTable
      .where({ _id: ObjectId(orderInfo._id) })
      .findOne();
    if (!order) {
      const error = new Error(`order:${id} not found`);
      error.status = 404;
      throw error;
    }
    console.log(order);
    order.cancel = orderInfo.cancel;
    return await orderTable.save(order);
  }
  async check(orderInfo) {
    if (orderInfo.user_oppenid) {
      const order = await orderTable
        .where({ user_oppenid: orderInfo.user_oppenid })
        .find();
      if (!order) {
        const error = new Error(`order:${id} not found`);
        error.status = 404;
        throw error;
      }
      return order;
    } else {
      const order = await orderTable
        .where({ business_id: orderInfo.business_id })
        .find();
      if (!order) {
        const error = new Error(`order:${id} not found`);
        error.status = 404;
        throw error;
      }
      return order;
    }
  }
}
module.exports = new orderService();
