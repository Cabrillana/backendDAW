import { Router } from "express";
import { notasController } from "../controllers/notas.controller";

class NotaRoutes {
  public router: Router = Router();
  constructor() {
    this.config();
  }

  private config() {
    this.router.route("/")
      .get(notasController.index)
      .put(notasController.update)
      .post(notasController.create);
    this.router.route("/:id")
      .get(notasController.read)
      .delete(notasController.delete);
  }
}
const notasRoutes = new NotaRoutes();
export default notasRoutes.router;