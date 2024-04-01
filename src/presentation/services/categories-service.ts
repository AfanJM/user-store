import { categoryModel } from '../../data'
import { createCategoryDto, paginationCategoryDto, customError, userEntity } from '../../domain'



export class CategoryService {

    //DI
    constructor() { }


    public async createCategory(dto: createCategoryDto) {

        const existCategory = await categoryModel.findOne({ name: dto.name })

        if (existCategory) throw customError.badRequest('Category already exist')

        try {

            const category = new categoryModel( dto )

            await category.save()

            return category

        } catch (error) {

            throw customError.internalServerError(`${error}`)

        }

    }

    public async getCategories(dto: paginationCategoryDto) {

        const { page, limit } = dto

        try {
    
            const [total, categories] = await Promise.all([

                await categoryModel.countDocuments(),
                await categoryModel.find()
                .skip((page - 1) * limit) //page 2
                 .limit(limit)

            ])

            return {
                total: total,
                page: page,
                limit: limit,
                next: `/api/categories?page=${(page + 1)}&limit=${limit}`,
                prev: (page - 1 > 0) ?`/api/categories?page=${(page - 1)}&limit=${limit}` : null,

                categories: categories.map(category => ({

                    id: category.id,
                    name: category.name,
                    available: category.available

                }))


            }

        } catch (error) {

            throw customError.internalServerError(`${error}`)

        }


    }



}