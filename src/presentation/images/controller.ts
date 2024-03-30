import fs from 'fs'

import path from "path"

import { Request, Response } from "express"


export class ImageController {


    constructor() { }


    getImage = (req: Request, res: Response) => {

        const { type = '', image = '' } = req.params

        const imagePath = path.resolve(__dirname, `../../../uploads/${type}/${image}`)

        const error = path.resolve(__dirname, `../../../uploads/404.jpg`)

        if (!fs.existsSync(imagePath)) return res.status(404).sendFile(error)

        res.sendFile(imagePath)

    }

    
}