const Router = require("@koa/router");
const router = Router({
  prefix: "/api/shopcar",
});
const shopcarController = require("../controllers/shopcarController");

router.post("/check", shopcarController.check);
router.post("/listAll", shopcarController.listAll);
router.post("/create", shopcarController.create);
router.put("/update", shopcarController.update);
router.post("/delete", shopcarController.delete);
module.exports = router.routes();
