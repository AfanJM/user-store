
import mongoose, { connect } from 'mongoose'

interface Options {


    mongoUrl: string;
    dbName: string;

}

export class MongoDatabase {


    static async connect( options:Options  ) {

        const { mongoUrl, dbName } = options

        try {
            
            await connect( mongoUrl , {

                dbName: dbName
            })

            console.log('connect is successful')

            return true

        } catch (error) {
            
            console.log('mongo conection error =>', error)

            throw error

        }

    }


    static async disconnect(){

        await mongoose.disconnect()

    }
    

}
