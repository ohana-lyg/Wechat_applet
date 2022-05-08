const orderService = require("../services/orderService");

class orderController {
  async check(ctx) {
    const order = ctx.request.body;
    const list = await orderService.check(order);
    ctx.body = { list };
  }
  async listAll(ctx) {
    const list = await orderService.listAll();
    ctx.body = { list };
  }
  async create(ctx) {
    const order = ctx.request.body;
    const result = await orderService.create(order);
    ctx.body = { result };
  }
  async delete(ctx) {
    console.log(ctx);
    await orderService.delete(ctx.params.id);
    ctx.body = { ok: true };
  }
  async update(ctx) {
    const order = ctx.request.body;
    const result = await orderService.update(order);
    ctx.body = { result };
  }
}
module.exports = new orderController();
