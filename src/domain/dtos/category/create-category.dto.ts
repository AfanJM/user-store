import { validators } from "../../../config";


export class createCategoryDto {


    constructor(

        public name: string,
        public available: boolean,
        public user: string, //id del usuario

    ){}

    static create ( object:  { [ key: string ]: any } ): [string?, createCategoryDto?] {

        const { name, available = false, user } = object;

        let availableBoolean = available

        if(!name) return ['Missing name', undefined] 

        if(!available) return ['Missing available', undefined]

        if(typeof available !== 'boolean'){

            availableBoolean = (available === 'true')
        }

        if(!user) return  ['Missing user', undefined]

        if( !validators.isMongoId(user) ) return ['Invalid user', undefined]

        return [undefined, new createCategoryDto( name, availableBoolean, user )]

    }

}