import { Request, Response } from "express";
import { DestroyOptions, Op, UpdateOptions } from "sequelize";
import { Nota, NotaInterface } from "../models/nota.model";

class NotasController {
  public index(req: Request, res: Response) {
    const busqueda = req.query.busqueda;
    const condicion = busqueda ? { [Op.or]: [{titulo: { [Op.like]: `%${busqueda}%` } },
      { contenido: { [Op.like]: `%${busqueda}%` } }] } : undefined;

    Nota.findAll<Nota>({where: condicion})
      .then((notas: Array<Nota>) => res.json(notas))
      .catch((err: Error) => res.status(500).json(err));
  }

  public create(req: Request, res: Response) {
    const parametros: NotaInterface = req.body;

    Nota.create<Nota>(parametros)
      .then((nota: Nota) => res.status(201).json(nota))
      .catch((err: Error) => res.status(500).json(err));
  }

  public read(req: Request, res: Response) {
    const notaId: string = req.params.id;

    Nota.findByPk<Nota>(notaId)
      .then((nota:Nota | null) => {
        if(nota) res.json(nota)
        else res.status(404)
          .json({ errors: "No se ha encontrado la nota con id=" + notaId });})
        .catch((err: Error) => res.status(500).json(err));
  }

  public update(req: Request, res: Response) {
    const notaId: string = req.body.id;
    const parametros: NotaInterface = req.body;

    const actualiza: UpdateOptions = {
      where: { id: notaId }, limit: 1,
    };

    Nota.update(parametros, actualiza)
      .then(() => res.status(200)
        .json({ data: "Se ha actualizado la nota con id=" + notaId }))
      .catch((err: Error) => res.status(500).json(err));
  }

  public delete(req: Request, res: Response) {
    const notaId: string = req.params.id;

    const elimina: DestroyOptions = {
      where: { id: notaId }, limit: 1,
    };

    Nota.destroy(elimina)
      .then(() => res.status(200)
        .json({ data: "Se ha eliminado la nota con id=" + notaId }))
      .catch((err: Error) => res.status(500).json(err));
  }
}
export const notasController = new NotasController;