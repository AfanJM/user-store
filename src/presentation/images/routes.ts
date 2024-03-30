import { Router } from "express";
import { ImageController } from "./controller";



export class ImageRoutes {


    static get routes(): Router {


        //servicio

        //controller
        const controller = new ImageController()

        const router = Router()


        router.get('/:type/:image', controller.getImage)
      

        return router

    }


}