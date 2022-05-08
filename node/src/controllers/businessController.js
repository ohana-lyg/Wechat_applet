const businessService = require("../services/businessService");

class businessController {
  async check(ctx) {
    const business = ctx.request.body;
    const list = await businessService.check(business);
    ctx.body = { list };
  }
  async listAll(ctx) {
    const list = await businessService.listAll();
    ctx.body = { list };
  }
  async create(ctx) {
    const business = ctx.request.body;
    const result = await businessService.create(business);
    ctx.body = { result };
  }
  async delete(ctx) {
    await businessService.delete(ctx.params.id);
    ctx.body = { ok: true };
  }
  async update(ctx) {
    const business = ctx.request.body;
    //console.log(business);
    const list = await businessService.update(business);
    ctx.body = { list };
  }
}
module.exports = new businessController();
