import { Request, Response } from "express";
import { DestroyOptions, Op, UpdateOptions } from "sequelize";
import { Nota, NotaInterface } from "../models/nota.model";

class NotasController {
  public index(req: Request, res: Response) {
    const filtro = req.query.busqueda;
    const userId = req.body.idUser;

    const eval1 = filtro ? { [Op.or]: [{titulo: { [Op.like]: `%${filtro}%` } },
      { contenido: { [Op.like]: `%${filtro}%` } }] } : undefined;
    const eval2 = userId ? { idUser: { [Op.or]: [userId,null] } } : { idUser: null };
    const eval3 = eval1 ? {[Op.and]: [eval1,eval2]} : eval2

    Nota.findAll<Nota>({where: eval3})
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
    const userId: string = req.body.idUser;

    if(userId) {
      const cond = {[Op.and]:[{ idUser: userId },{id: notaId}]};
      const parametros: NotaInterface = req.body;
      const actualiza: UpdateOptions = {
        where: cond, limit: 1,
      };
      Nota.update(parametros, actualiza)
        .then((num) => {
          if(num[0]!=1) res.status(404).json({ error: "No se ha actualizado la nota con id=" + notaId });
          else  res.json({ data: "Se ha actualizado la nota con id=" + notaId });
          })
        .catch((err: Error) => res.status(500).json(err));
    } else {
      res.status(401).json({ errors: "Fallo de Autorización" });
    }
  }

  public delete(req: Request, res: Response) {
    const notaId: string = req.params.id;
    const userId: string = req.body.idUser;

    if(userId){
      const cond = {[Op.and]:[{ idUser: userId },{id: notaId}]};
      const elimina: DestroyOptions = {
        where: cond, limit: 1,
      };
      Nota.destroy(elimina)
      .then((num) => {
        if(num != 1) res.status(404).json({ error: "No se ha eliminado la nota con id=" + notaId });
        else res.json({ data: "Se ha eliminado la nota con id=" + notaId });
        })
      .catch((err: Error) => res.status(500).json(err));
    } else {
      res.status(401).json({ errors: "Fallo de Autorización" });
    }
  }
}
export const notasController = new NotasController;