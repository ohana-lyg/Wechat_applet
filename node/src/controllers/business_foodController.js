const business_foodService = require("../services/business_foodService");

class business_foodController {
  /* async check(ctx) {
    const list = await business_foodService.check(ctx.params.dname);
    ctx.body = { list };
  } */
  async listAll(ctx) {
    const list = await business_foodService.listAll();
    ctx.body = { list };
  }
  /* async create(ctx) {
    const { name } = ctx.request.body;
    const result = await business_foodService.create({ name });
    ctx.body = { result };
  }
  async delete(ctx) {
    await business_foodService.delete(ctx.params.id);
    ctx.body = { ok: true };
  }
  async update(ctx) {
    await business_foodService.update(ctx.params.id, { name: "shfk" });
    ctx.body = { ok: true };
  } */
}
module.exports = new business_foodController();
