import {Router} from 'express'
import { AuthController } from './controller'
import { authServices, EmailService } from '../services'
import { envs } from '../../config'



export class AuthRoutes {


    static get routes(): Router {

        const router = Router()

        const emailService = new EmailService(

            envs.MAILER_SERVICE,
            envs.MAILER_EMAIL,
            envs.MAILER_SECRET_KEY,
            envs.SEND_EMAIL
        )

        const AuthServices = new authServices(  emailService  ) //inyeccion de dependencia

        const controller = new AuthController( AuthServices ) //inyeccion de dependencia

        //definimos las rutas
        router.post('/login',   controller.loginUser)
        router.post('/register', controller.registerUser)


        router.get('/validate-email/:token',controller.validateEmail)


        return router;

    }


}