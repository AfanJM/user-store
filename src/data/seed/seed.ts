import { envs } from "../../config/envs";

import { MongoDatabase, productModel, userModel, categoryModel } from '../mongo/'
import { seedData } from "./data";


(async () => {

    await MongoDatabase.connect({
        dbName: envs.MONGO_DB_NAME,
        mongoUrl: envs.MONGO_URL
    })

    await mainSeed()


    await MongoDatabase.disconnect()

})();


const random = (x: number) => {

    return Math.floor(Math.random() * x) // de 0 a x

}


async function mainSeed() {

    //borrar todo
    await Promise.all([
        userModel.deleteMany(),
        categoryModel.deleteMany(),
        productModel.deleteMany(),
    ])

    //creamos los usuarios
    const users = await userModel.insertMany(seedData.dataUser())

    //creamos las categorias
    const categories = await categoryModel.insertMany(

        seedData.dataCategories().map(category => {

            return {

                ...category,
                user: users[ random(seedData.dataUser().length - 1  ) ]._id
            }
        })
    )

    // //creamos los productos
    const products = await productModel.insertMany(

        seedData.dataProducts().map(product => {

            return {

                ...product,
                user: users[random(seedData.dataUser().length - 1)]._id,
                category: categories[random(seedData.dataCategories().length - 1)]._id

            }

        })

    )



    console.log('Seeding.... SEEDED')
}
