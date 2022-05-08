const shopcarService = require("../services/shopcarService");

class shopcarController {
  async check(ctx) {
    const shopcar = ctx.request.body;
    const list = await shopcarService.check(shopcar);
    ctx.body = { list };
  }
  async listAll(ctx) {
    const shopcar = ctx.request.body;
    const list = await shopcarService.listAll(shopcar);
    ctx.body = { list };
  }
  async create(ctx) {
    const shopcar = ctx.request.body;
    //console.log(shopcar);
    const result = await shopcarService.create(shopcar);
    ctx.body = { result };
  }
  async delete(ctx) {
    console.log(ctx.request.body);
    const shopcarInfo = ctx.request.body;
    await shopcarService.delete(shopcarInfo);
    ctx.body = { ok: true };
  }
  async update(ctx) {
    const shopcarInfo = ctx.request.body;
    const result = await shopcarService.update(shopcarInfo);
    ctx.body = { result };
  }
}
module.exports = new shopcarController();
