const foodService = require("../services/foodService");

class foodController {
  async check(ctx) {
    const food = ctx.request.body;
    //console.log(food);
    const list = await foodService.check(food);
    ctx.body = { list };
  }
  async listAll(ctx) {
    const list = await foodService.listAll();
    ctx.body = { list };
  }
  async create(ctx) {
    const food = ctx.request.body;
    const result = await foodService.create(food);
    ctx.body = { result };
  }
  async delete(ctx) {
    const food = ctx.request.body;
    const result = await foodService.delete(food);
    ctx.body = { result };
  }
  async update(ctx) {
    const food = ctx.request.body;
    const result = await foodService.update(food);
    ctx.body = { result };
  }
}
module.exports = new foodController();
