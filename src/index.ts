import express from "express";
import cors from "cors";
import notaRoutes from "./routes/nota.routes";
import userRoutes from "./routes/user.routes";

class Server {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  private config(): void {
    this.app.set('port', process.env.PORT || 3000);
    this.app.use(cors())
    this.app.use(express.json());
  }

  private routes(): void {
    this.app.use('/notas', notaRoutes);
    this.app.use('/user', userRoutes);
  }

  start(): void {
    this.app.listen(this.app.get('port'), () => {
        console.log('El servidor funciona en el puerto: ' + this.app.get('port'))
    });
  } 
}

const server = new Server();
server.start();