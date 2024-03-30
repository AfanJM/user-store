


export class paginationCategoryDto {

    constructor(

        public page: number,
        public limit: number
    ){}


    static create( page: number = 1, limit:number = 10 ): [string?, paginationCategoryDto?] {

        //si me manda un string
        if(isNaN(page) || isNaN(limit)) return ['Page and limit must be numbers', undefined]

        if(page  <= 0) return ['Page must be greater than zero', undefined]

        if(limit <= 0) return ['Limit must be greater than zero', undefined]

        return [undefined,  new paginationCategoryDto(page, limit)]

    
    }


}