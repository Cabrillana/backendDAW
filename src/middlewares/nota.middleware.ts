import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken"
import { claveToken } from "../config/claveJWT";

export const notasUser = (req: Request,res: Response,next: NextFunction) => {
  if(req.headers.authorization != null){
    req.headers.authorization = req.headers.authorization.replace("Angular ","");

    verify(req.headers.authorization, claveToken, (err:any, verifiedJwt: any) => {
      if(err){
        req.body.idJWT = null;
      }else{
        req.body.idJWT = verifiedJwt.id;
      }
    });
    next();
  }
}