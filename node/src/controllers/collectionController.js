const collectionService = require("../services/collectionService");

class collectionController {
  async check(ctx) {
    const collection = ctx.request.body;
    //console.log(collection);
    const list = await collectionService.check(collection);
    ctx.body = { list };
  }
  async listAll(ctx) {
    const collection = ctx.request.body;
    const list = await collectionService.listAll(collection);
    ctx.body = { list };
  }
  async create(ctx) {
    const collection = ctx.request.body;
    console.log(collection);
    const result = await collectionService.create(collection);
    ctx.body = { result };
  }
  async delete(ctx) {
    //console.log(ctx.request.body);
    const collectionInfo = ctx.request.body;
    await collectionService.delete(collectionInfo);
    ctx.body = { ok: true };
  }
  async update(ctx) {
    const collectionInfo = ctx.request.body;
    const result = await collectionService.update(collectionInfo);
    ctx.body = { result };
  }
}
module.exports = new collectionController();
