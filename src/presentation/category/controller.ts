import { Request, Response } from 'express'
import { customError, paginationCategoryDto } from '../../domain'
import { createCategoryDto } from '../../domain'
import { CategoryService } from '../services/categories-service'

export class CategoryController {


    //DI
    constructor(

        private readonly categoryService: CategoryService
    ) { }

    private handleError = (error: unknown, res: Response) => {


        if (error instanceof customError) {

            return res.status(error.statusCode).json({ error: error.message })
        }

        return res.status(500).json({ error: 'Internal server error' })

    }

    createCategory =  (req: Request, res: Response) => {

        const [error, dto] = createCategoryDto.create({

            ...req.body,
             user: req.body.user.id,
        
        })

        if(error) return res.status(400).json({msg: error})

        this.categoryService.createCategory(dto!)
        .then(category => res.status(200).json(category))
        .catch(error => this.handleError(error, res))

    }

    getCategory =  (req: Request, res: Response) => {

        const {page = 1, limit = 10} = req.query

        //como los query parametros son string les pongo el simbolo + para volverlos numeros
        const [error, dto] = paginationCategoryDto.create(+page, +limit)

        if(error) return res.status(400).json({msg: error})

        this.categoryService.getCategories( dto! )
        .then(categories => res.status(200).json(categories))
        .catch(error => this.handleError(error, res))



    }   


  


}