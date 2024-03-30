import { Request, Response } from "express";
import { customError, loginUserDto, registerUserDto } from "../../domain";
import { authServices } from "../services/auth-services";


export class AuthController {

    //DI
    constructor(

        public readonly AuthService: authServices
    ){}

    //manejamos los errores
    private handleErrors = (  error: any, res: Response  ) => {

        if(error instanceof customError){

             return res.status(error.statusCode).json({msg: error.message})
        }

        //console.log(error)
        return res.status(500).json({msg: 'Interval server errors'})

    }

    registerUser = ( req: Request, res: Response ) => {

        const [error, registerDto] = registerUserDto.create( req.body )

        if(error) return res.status(400).json({msg: error})

        this.AuthService.registerUser( registerDto! )
            .then(user => res.json( user ) )
            .catch(error => this.handleErrors(error, res))
            

    }

    loginUser = ( req: Request, res: Response ) => {

        const [error, loginDto] = loginUserDto.create( req.body )

        if(error) return res.status(400).json({msg: error})

        this.AuthService.loginUser(  loginDto! )
            .then(user => res.json(user) )
            .catch(error => this.handleErrors(error, res))

    }

    validateEmail = ( req: Request, res: Response ) => {

        const {token} = req.params

        this.AuthService.validateEmail(token)
        .then(() => res.json('Email validated'))
        .catch(error => this.handleErrors(error, res))

    }

}