import mongoose from "mongoose";



export class validators {


    static isMongoId( id: string ) {

        return mongoose.isValidObjectId( id )

    }

}