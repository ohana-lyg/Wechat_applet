const business_foodTable = require("../models/business_foodTable");
const inspirecloud = require("@byteinspire/inspirecloud-api");
const ObjectId = inspirecloud.db.ObjectId;

class business_foodService {
  async listAll() {
    const all = await business_foodTable.where().find();
    return all;
  }
  /*   async create(business_food) {
    return await business_foodTable.save(business_food);
  } */
  /*   async delete(id) {
    const result = await business_foodTable.where({ _id: ObjectId(id) }).delete();
    if (result.deletedCount === 0) {
      const error = new Error(`business_food:${id} not found`);
      error.status = 404;
      throw error;
    }
  } */
  /*   async update(id, updater) {
    const business_food = await business_foodTable
      .where({ _id: ObjectId(id) })
      .findOne();
    if (!business_food) {
      const error = new Error(`business_food:${id} not found`);
      error.status = 404;
      throw error;
    }
    business_food.name = updater.name;
    await business_foodTable.save(business_food);
  } */
  /*   async check(id) {
    const business_food = await business_foodTable.where({ name: dname }).findOne();
    if (!business_food) {
      const error = new Error(`business_food:${dname} not found`);
      error.status = 404;
      throw error;
    }
    return business_food;
  } */
}
module.exports = new business_foodService();
