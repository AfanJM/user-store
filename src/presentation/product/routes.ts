import { Router } from "express";
import { ProductController } from "./controller";
import { AuthMiddleware } from "../middlewares";
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
        router.post('/', AuthMiddleware.validateJwt ,controller.createProduct )

        return router;
    
    }


}