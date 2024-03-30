import { bcryptAdapter, envs, jwtAdapter } from "../../config";
import { userModel } from "../../data";
import { customError, loginUserDto, registerUserDto, userEntity } from "../../domain";
import { EmailService } from "./email.services";



//todo el proceso para registar un nuevo usuario LO PESADO DE LA LOGICA
export class authServices {

    constructor(

        private readonly emailService: EmailService
    ) 
        {}

    public async registerUser(dto: registerUserDto) {

        const existEmail = await userModel.findOne({ email: dto.email })

        if (existEmail) throw customError.badRequest('Email already registered')

        try {

            const user = new userModel(dto)

            //encriptamos la password
            user.password = bcryptAdapter.hash(dto.password)

            //mandamos el correo de validacion
            await this.sendEmailValidationLink( user.email )


            await user.save()

            //operador resto para no mostrar la password
            const { password, ...data } = userEntity.fromObject(user)

            const token = await jwtAdapter.generateToken({id: user.id})

            if(!token) throw customError.internalServerError('Error generating token')

            return {
                user: { data },
                token: token
            }

        } catch (error) {

            throw customError.internalServerError(`${error}`)

        }

    }


    public async loginUser(dto: loginUserDto) {

        const user = await userModel.findOne({ email: dto.email })

        if (!user) throw customError.badRequest('Email not found')

        const comparePassword = bcryptAdapter.compare(dto.password, user.password)

        if (!comparePassword) throw customError.badRequest('Email - Password not match')

        const { password, ...data } = userEntity.fromObject(user)

        //JWT

        const token = await jwtAdapter.generateToken({

            id: user.id,
            email: user.email,
            duration: '1h'

        })

        if (!token) throw customError.internalServerError('Error generating token')

        return {
            user: { data },
            token: token
        }
    }

    private  async sendEmailValidationLink (email: string) {

        const token = await jwtAdapter.generateToken( { email } )

        if(!token) throw customError.internalServerError('Error generating token')

        const link = ` ${ envs.WEBSERVICE_URL }/auth/validate-email/${token} `
 
        const html = `
            <h1>Validate Your Email</h1>
            <p>Clic on the following link to validate your email</p>
            <a href="${link}" > validate your email: ${email} </a>
        `

        const options = {

            to: email,
            subject: 'Validate your email',
            htmlBody: html
        }

        const isSent = await this.emailService.sendEmail(options)

        if(!isSent) throw customError.internalServerError('Error sending email')

        return true;

    }

    public async  validateEmail(token: string){ 

        const payload = await jwtAdapter.validateToken(token)

        if(!payload) throw customError.unauthorized('Invalid token')

        const { email } = payload as {email: string}

        if(!email) throw customError.internalServerError('Email not in token')

        const user = await userModel.findOne({ email })

        if(!user) throw customError.internalServerError('Email not exist')

        user.emailValidated = true

        await user.save()

        return true

    }

}