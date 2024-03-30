import { productModel } from "../../data";
import { createProductDto, customError, paginationCategoryDto, userEntity } from "../../domain/";

export class ProductService {

    //DI
    constructor() { }

    public async getProduct(dto: paginationCategoryDto) {

        const { page, limit } = dto

        try {

            const [total, products] = await Promise.all([

                await productModel.countDocuments(),
                await productModel.find()
                    .skip((page - 1) * limit)
                    .limit(limit)
                    //TODO: populate 
                    .populate('user')
                    .populate('category')
            ])

            return {
                total: total,
                page: page,
                limit: limit,
                next: `/api/products?page=${(page + 1)}?limit=${limit}`,
                prev: (page - 1 > 0) ? `/api/products?page=${(page - 1)}?limit=${limit} ` : null,
                products: products,
            }

        } catch (error) {

            throw customError.internalServerError(`${error}`)

        }

    }

    public async createProduct(dto: createProductDto) {

       const productExist = await productModel.findOne({name: dto.name})

       if(productExist) throw customError.badRequest('product already exists')

        try {

            const product = new productModel( dto )

            await product.save()

            return product

        } catch (error) {

            console.log(error)

            throw customError.internalServerError(`${error}`)

        }

    }

}