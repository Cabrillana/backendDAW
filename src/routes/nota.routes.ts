import { Router } from "express";
import { notasController } from "../controllers/notas.controller";
import { notasUser } from "../middlewares/nota.middleware";

class NotaRoutes {
  public router: Router = Router();
  constructor() {
    this.config();
  }

  private config() {
    this.router.route("/")
      .get([notasUser],notasController.index)
      .put([notasUser],notasController.update)
      .post([notasUser],notasController.create);
    this.router.route("/:id")
      .get([notasUser],notasController.read)
      .delete([notasUser],notasController.delete);

  }
}
const notasRoutes = new NotaRoutes();
export default notasRoutes.router;