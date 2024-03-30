import { validators } from "../../../config"


export class createProductDto {


    constructor(

        public name: string,
        public available: boolean,
        public price: number,
        public description: string,
        public user: string, //id del usuario
        public category: string, //id de la categoria
        ){}


        static create (object:  {[key: string]:  any} ): [string? , createProductDto?] {

            const {name , available, price, description, user, category} = object

            if(!name) return ['Missing name']

            if(!user) return ['Missing user']

            if( !validators.isMongoId( user ) ) return ['Invalid user id ']

            if(!category) return ['Missing category']

            if(!validators.isMongoId( category ) ) return ['Invalid category']

            if(!price) return ['Missing price']

            if(!description) return ['Missing description']

            return[ undefined, new createProductDto(name, !!available, price, description, user, category) ]

        }

}