import jwt from 'jsonwebtoken'
import { envs } from './index'

export class jwtAdapter {


    static async generateToken(payload: any, duration: string = '3h') {

        return new Promise((resolve) => {

            jwt.sign(payload, envs.SEED_JWT, { expiresIn: duration }, (error, token) => {

                if (error) {

                    return resolve(null)
                }

                return resolve(token)


            })


        })


    }

    static validateToken<T>(token: string): Promise<T | null> {

        return new Promise((resolve) => {

            jwt.verify(token, envs.SEED_JWT , (error, decoded) => {

                if(error) return resolve(null)

                resolve(decoded as T)

            })

        })

    }
}