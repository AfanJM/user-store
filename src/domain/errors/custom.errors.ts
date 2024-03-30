

export class customError extends Error {

private constructor(

    public readonly statusCode: number,
    public readonly message: string,


){
    super( message ); // => constructor del error que nosotros extendemos
}


    static badRequest (message: string) {

        return new customError(400, message );

    }

    static unauthorized (message: string) {

        return new customError(401, message );

    }

    static susscess(message: string){

        return new customError(200, message)

    }

    static forbidden(message: string){

        return new customError(403, message)

    }

    static notFound(message: string){

        return new customError(404, message)

    }

    static internalServerError(message: string){

        return new customError(500, message)

    }

}