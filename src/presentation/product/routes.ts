import { Router } from "express";
import { ProductController } from "./controller";
import { AuthMiddleware, AutorizacionMiddleware } from "../middlewares";
import { ProductService } from "../services/products-service";

export class ProductRouter {


    static get router(): Router {

        //service
        const service = new ProductService()

        //controllador 
        const controller = new ProductController(service); // DI

        const router = Router()
        

        //rutas
        router.get('/' , controller.getProduct )
        router.post('/', [AuthMiddleware.validateJwt, AutorizacionMiddleware.ValidRole(['ADMIN_ROLE'])] ,controller.createProduct )

        return router;
    
    }


}