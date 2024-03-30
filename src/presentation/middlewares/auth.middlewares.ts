import {Response, Request, NextFunction} from 'express'
import { jwtAdapter } from '../../config'
import { userModel } from '../../data'
import { userEntity } from '../../domain'

//middleware para valida el token

export class AuthMiddleware {

    static async validateJwt(req: Request, res: Response, next: NextFunction) {
        
        const authorization = req.header('Authorization')

        if(!authorization) return res.status(401).json({error: 'No token provided'})

        if(!authorization.startsWith('Bearer ')) return res.status(400).json({error: 'Invalid Bearer token'})

        const token = authorization.split(' ')[1]

        try {

            const payload = await jwtAdapter.validateToken< {id: string} >(token)

            if(!payload ) return res.status(401).json({error: 'Invalid token'})

            const user = await userModel.findById( payload.id )

            if(!user) return res.status(401).json({error: 'Invalid token - user'})

            //validamos si el usuario esta activo
            if(!user.emailValidated) return res.status(401).json({error: 'Invalid token - user'})

            req.body.user = userEntity.fromObject(user)

            next()

        } catch (error) {
            
            console.log(error)

            res.status(500).json({error: 'Internal Server Error'})

        }




    }


}