import { Router } from "express";
import { usersController } from "../controllers/users.controller";
import { authJwt } from "../middlewares/auth.middleware";

class UserRoutes {
  public router: Router = Router();
  constructor() {
    this.config();
  }

  private config() {
    this.router.route("/")
      .post(usersController.createUser)
      .get([authJwt],usersController.readPerfil)
      .put([authJwt],usersController.update)
      .delete([authJwt],usersController.delete);
    this.router.route("/login")
      .post(usersController.readUser);
  }
}
const usersRoutes = new UserRoutes();
export default usersRoutes.router;