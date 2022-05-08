const Router = require("@koa/router");
const router = Router({
  prefix: "/api/business_food",
});
const business_foodController = require("../controllers/business_foodController");

/* router.post("/check/:dname", business_foodController.check); */
router.get("/listAll", business_foodController.listAll);
/* router.post("/create", business_foodController.create);
router.put("/update/:id", business_foodController.update);
router.delete("/delete/:id", business_foodController.delete); */
module.exports = router.routes();
