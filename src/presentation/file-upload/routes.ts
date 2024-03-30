import { Router } from "express";
import { FileUploadController } from "./controller";
import { FileUploadService } from "../services/files.upload-service";
import { fileUploadMiddleware } from "../middlewares/file-upload.middleware";

export class FileUploadRouter {


    static get routes(): Router {

        const router = Router()

        //service
        const service = new FileUploadService()
        //controllador
        const controller = new FileUploadController( service )

        //ruta
        // api/upload/single/{user}|{category}|{product}/
        // api/upload/multiple/{user}|{category}|{product}/
        router.post('/single/:type', [ fileUploadMiddleware.typeInvalid(['users', 'categories', 'products']) , fileUploadMiddleware.wasSelected], controller.uploadFileSingle)
        router.post('/multiple/:type', [fileUploadMiddleware.typeInvalid(['users', 'categories', 'products']), fileUploadMiddleware.wasSelected ], controller.uploadMultipleFiles)
   


        return router

    }

}