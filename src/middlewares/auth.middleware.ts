import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken"
import { claveToken } from "../config/claveJWT";

export const authJwt = (req: Request,res: Response,next: NextFunction) => {
  if(req.headers.authorization == null){
    res.status(401).send("Fallo en la autorizacion");
  } else {
    req.headers.authorization = req.headers.authorization.replace("Angular ","");
    verify(req.headers.authorization, claveToken, (err:any, verifiedJwt: any) => {
      if(err){
        res.status(401).send("Fallo en la autorizacion");
      }else{
        req.body.idJWT = verifiedJwt.id;
        next();
      }
    });
  }
}