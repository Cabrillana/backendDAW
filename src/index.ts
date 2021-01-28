import express from "express";
import notaRoutes from "./routes/nota.routes";
import cors from "cors";

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
  }

  start(): void {
    this.app.listen(this.app.get('port'), () => {
        console.log('El servidor funciona en el puerto: ' + this.app.get('port'))
    });
  } 
}

const server = new Server();
server.start();