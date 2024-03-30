import { regularExps } from "../../../config";



export class loginUserDto {


    constructor(

        public readonly email: string,
        public readonly password: string

    ){}


    static create (object:  { [key: string]: any  }  ): [string?, loginUserDto?] {

        const { email, password } = object;

        if(!email) return ['Missing email', undefined]

        if (!regularExps.email.test(email)) return ['Email is not valid', undefined]

        if(!password) return ['Missing password', undefined]

        if (password.length < 6) return ['Password too short', undefined]

        return [undefined, new loginUserDto(email, password)]

    } 

}