const foodTable = require("../models/foodTable");
const inspirecloud = require("@byteinspire/inspirecloud-api");
const ObjectId = inspirecloud.db.ObjectId;

class foodService {
  async listAll() {
    const all = await foodTable.where().find();
    return all;
  }
  async create(food) {
    return await foodTable.save(food);
  }
  async delete(foodInfo) {
    console.log(foodInfo);
    const result = await foodTable
      .where({ _id: ObjectId(foodInfo.id) })
      .delete();
    if (result.deletedCount === 0) {
      const error = new Error(`food:${id} not found`);
      error.status = 404;
      throw error;
    }
  }
  async update(foodInfo) {
    const food = await foodTable
      .where({ _id: ObjectId(foodInfo.id) })
      .findOne();
    if (!food) {
      const error = new Error(`food:${id} not found`);
      error.status = 404;
      throw error;
    }
    /* food = foodInfo; */
    food.name = foodInfo.name;
    food.price = foodInfo.price;
    food.picture = foodInfo.picture;
    return await foodTable.save(food);
  }
  async check(foodInfo) {
    console.log(foodInfo);
    if (foodInfo.business_id) {
      //console.log(foodInfo);
      const food = await foodTable
        .where({ business_id: String(foodInfo.business_id) })
        .find();
      if (!food) {
        const error = new Error(`food:${id} not found`);
        error.status = 404;
        throw error;
      }
      console.log(food);
      return food;
    } else {
      //console.log(foodInfo.food_id);
      const food = await foodTable
        .where({ _id: ObjectId(foodInfo.food_id) })
        .findOne();
      if (!food) {
        const error = new Error(`food:${id} not found`);
        error.status = 404;
        throw error;
      }
      return food;
    }
  }
}
module.exports = new foodService();
