import { Router } from "express";
import { CategoryController } from './controller'
import { AuthMiddleware, AutorizacionMiddleware } from "../middlewares";
import { CategoryService } from "../services/categories-service";


export class CategoryRoutes {
    
    static get routes(): Router {

        const router = Router()

        const service = new CategoryService () //creamos la instancia del servicio para inyectarla abajo

        const controller = new CategoryController( service ) //inyectamos la dependencia del servicio

        //rutas
        router.get('/', controller.getCategory)
        router.post('/', [ AuthMiddleware.validateJwt , AutorizacionMiddleware.ValidRole(['ADMIN_ROLE']) ] ,  controller.createCategory)

        return router;

    }


}