const Router = require("@koa/router");
const router = Router({
  prefix: "/api/food",
});
const foodController = require("../controllers/foodController");

router.post("/check", foodController.check);
router.get("/listAll", foodController.listAll);
router.post("/create", foodController.create);
router.post("/update", foodController.update);
router.post("/delete", foodController.delete);
module.exports = router.routes();
