import { Request, Response } from 'express'
import { createProductDto, customError, paginationCategoryDto } from '../../domain'
import { ProductService } from '../services/products-service'



export class ProductController {


    //DI
    constructor(

        private readonly productService: ProductService
    ) { }

    private handleError = (error: unknown, res: Response) => {


        if (error instanceof customError) {

            return res.status(error.statusCode).json({ error: error.message })
        }

        return res.status(500).json({ error: 'Internal server error' })

    }

    getProduct = (req: Request, res: Response) => {

        const {page = 1, limit = 10} = req.query

        const [error, dto] = paginationCategoryDto.create(+page, +limit)

        if(error) return res.status(400).json({msg: error})

        this.productService.getProduct(dto!)
        .then(products => res.status(200).json(products))
        .catch(error => this.handleError(error, res))

    }

    createProduct = (req: Request, res: Response) => {

        const [error, dto] = createProductDto.create({
            
            ...req.body,
            user: req.body.user.id,
        
        } )

        if(error) return res.status(400).json({msg: error})

        this.productService.createProduct( dto! )
        .then(product => res.status(200).json(product))
        .catch(error => this.handleError(error, res))

    }



}