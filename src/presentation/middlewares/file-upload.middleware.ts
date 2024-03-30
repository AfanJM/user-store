import { NextFunction, Request, Response } from "express";

export class fileUploadMiddleware {


    static typeInvalid(validTypes: string[]) {

        return (req: Request, res: Response, next: NextFunction) => {

            const type = req.params.type

            if (!validTypes.includes(type)) return res.status(400).json({ Error: `Invalid type ${type} valid ones ${validTypes} ` })

            next()
        }
    }

    static wasSelected(req: Request, res: Response, next: NextFunction) {

        if (!req.files || Object.keys(req.files).length === 0) return res.status(400).json({ Error: 'No files was selected' })

        //si no es un arreglo entonces lo colocamos en el body
        if (!Array.isArray(req.files.file)) {

            req.body.files = [req.files.file]

        } else {
            //si es un arreglo lo dejamos asi pero en el body
            req.body.files = req.files.file

        }


        next()
    }


}