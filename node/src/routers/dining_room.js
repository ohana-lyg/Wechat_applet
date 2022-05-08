const Router = require("@koa/router");
const router = Router({
  prefix: "/api/dining_room",
});
const dining_roomController = require("../controllers/dining_roomController");

/* router.post("/check/:dname", dining_roomController.check); */
router.get("/listAll", dining_roomController.listAll);
/* router.post("/create", dining_roomController.create);
router.put("/update/:id", dining_roomController.update);
router.delete("/delete/:id", dining_roomController.delete); */
module.exports = router.routes();
