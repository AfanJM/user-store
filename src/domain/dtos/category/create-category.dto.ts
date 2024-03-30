

export class createCategoryDto {


    constructor(

        public name: string,
        public available: boolean

    ){}

    static create ( object:  { [ key: string ]: any } ): [string?, createCategoryDto?] {

        const { name, available = false } = object;

        let availableBoolean = available

        if(!name) return ['Missing name', undefined] 

        if(!available) return ['Missing available', undefined]

        if(typeof available !== 'boolean'){

            availableBoolean = (available === 'true')
        }

        return [undefined, new createCategoryDto( name, availableBoolean )]

    }

}