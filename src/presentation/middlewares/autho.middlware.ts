import { NextFunction, Request, Response } from "express";

export class AutorizacionMiddleware {

    constructor(){}

    static ValidRole( typeRole: string[] ){

        return (  req: Request, res: Response , next: NextFunction ) =>{

            const {role, name} = req.body.user

            if(!typeRole.includes( role[0] ))  return res.status(401).json({Error: `${name} not permitted to`})

            next()

        }


    }

}