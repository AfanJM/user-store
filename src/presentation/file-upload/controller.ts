import { Request, Response } from "express";
import { FileUploadService } from "../services/files.upload-service";
import { customError } from "../../domain";
import { UploadedFile } from "express-fileupload";


export class FileUploadController {


    //DI - SERVICE
    constructor(

        private readonly fileUploadService: FileUploadService

    ){}

    private handleError = (error: unknown, res: Response) => {


        if (error instanceof customError) {

            return res.status(error.statusCode).json({ error: error.message })
        }

        return res.status(500).json({ error: 'Internal server error' })

    }


    
    uploadFileSingle = (req: Request, res: Response) => {

       // console.log(  { files:req.files } )

       //const files = req.files

       const type = req.params.type
      
       const file = req.body.files.at(0) as UploadedFile

        this.fileUploadService.uploadSingleFile( file, `uploads/${type}` )
        .then(uploaded => res.status(200).json(uploaded))
        .catch(error => this.handleError(error, res))
    }


    uploadMultipleFiles = (req: Request, res: Response) => {

        const type = req.params.type    
      
        const files = req.body.files as UploadedFile[]

        this.fileUploadService.uploadMultipleFiles( files,  `uploads/${type}`  )
        .then(uploaded => res.status(200).json(uploaded))
        .catch(error => this.handleError(error, res))


    }


}