const Router = require("@koa/router");
const router = Router({
  prefix: "/api/business",
});
const businessController = require("../controllers/businessController");

router.post("/check", businessController.check);
router.get("/listAll", businessController.listAll);
router.post("/create", businessController.create);
router.post("/update", businessController.update);
router.delete("/delete/:id", businessController.delete);
module.exports = router.routes();
