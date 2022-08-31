import express, { query } from 'express'
import ProductModel from './model.js'
import sequelize from '../db/index.js'
import { Op } from 'sequelize'

const productsRouter = express.Router()

productsRouter.get('/', async (req,res,next) => {
    try {
         const query = {}

         if(req.query.name) {
            query.name = {
                [Op.iLike]: `%${req.query.name}%`
            }
         }

         if(req.query.range) {
            query.price = {
                [Op.between] : req.query.range.split(',')
            }
         }

         if(req.query.category) {
            query.category = {
                [Op.in] : req.query.category.split(',')
            }
         }
        // attributes:['id',"name",'description',"price",'category','createdAt','updatedAt'],
        const products = await ProductModel.findAll({
            
            where: query
        })

        res.send(products)
    } catch (error) {
        console.log(error)
        next(error)
        
    }
} )

productsRouter.get("/:id", async (req, res, next) => {
    try {
     
      const prod= await ProductModel.findByPk(req.params.id);
      res.send(prod);
    } catch (error) {
      console.log(error);
      next(error);
    }
  });


productsRouter.post("/", async (req, res, next) => {
    try {
      const prod = await ProductModel.create(req.body);
  
      res.send(prod);
    } catch (error) {
      console.log(error);
      next(error);
    }
  });

  productsRouter.put("/:id", async (req, res, next) => {
    try {
      const prod = await ProductModel.update(req.body, {
        where: {
          id: req.params.id,
        },
        returning: true,
      });
      res.send(prod);
    } catch (error) {
      console.log(error);
      next(error);
    }
  });



  productsRouter.delete("/:id", async (req, res, next) => {
    try {
      const products = await ProductModel.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.send({ rows: products });
    } catch (error) {
      console.log(error);
      next(error);
    }
  });

export default productsRouter