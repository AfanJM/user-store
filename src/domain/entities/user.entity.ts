import { customError } from "../errors/custom.errors";

export class userEntity {

    constructor(

        public id: string,
        public name: string,
        public email: string,
        public emailValidated: boolean,
        public password: string,
        public role: string,
        public img?: string[],

    ) {}

        static fromObject(object: { [key: string]: any }) {

            const {id ,_id, name, email, emailValidated, password, role, img} = object;

            if(!_id && !id)  throw customError.badRequest('missing ID')
        
            if(!name) throw customError.badRequest('missing name')

            if(!email) throw customError.badRequest('missing email')

            if(emailValidated === undefined)throw customError.badRequest('missing emailValidated')

            if(!password) throw customError.badRequest('Missing password')

            if(!role) throw customError.badRequest('Missing role')

            return new userEntity(_id || id , name, email, emailValidated, password, role, img)
    }


}


