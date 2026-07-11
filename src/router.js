import Navigo from "navigo";
import { homePage } from "./pages/home";
import { tableInfo } from "./pages/table-info";
import { game } from "./pages/game";
import { calculator } from "./pages/calculator";
import { setting } from "./pages/setting";

const router = new Navigo("/");
router.on("", function () {
  homePage();
});
router.on("/table-info", function () {
  tableInfo();
});
router.on("/game", function () {
  game();
});
router.on("/calculator", function () {
  calculator();
});
router.on("/setting", function () {
  setting();
});
export default router;
