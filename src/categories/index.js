import express, { query } from 'express'
import CategoryModel from './model.js'
import sequelize from '../db/index.js'
import { Op } from 'sequelize'

const categoryRouter = express.Router()

categoryRouter.get('/', async (req,res,next) => {
    try {
       
       
        const categories = await CategoryModel.findAll({
            
           
        })

        res.send(categories)
    } catch (error) {
        console.log(error)
        next(error)
        
    }
} )

categoryRouter.get("/:id", async (req, res, next) => {
    try {
     
      const category= await CategoryModel.findByPk(req.params.id);
      res.send(category);
    } catch (error) {
      console.log(error);
      next(error);
    }
  });


categoryRouter.post("/", async (req, res, next) => {
    try {
      const categories = await CategoryModel.bulkCreate(
        [
            { name: "school" },
            { name: "electrical engeneering" },
            { name: "medical supplies" },
            { name: "pets" },
            { name: "sport equipment" }
        ]
      );
  
      res.send(categories);
    } catch (error) {
      console.log(error);
      next(error);
    }
  });

  categoryRouter.put("/:id", async (req, res, next) => {
    try {
      const category = await CategoryModel.update(req.body, {
        where: {
          id: req.params.id,
        },
        returning: true,
      });
      res.send(category);
    } catch (error) {
      console.log(error);
      next(error);
    }
  });



  categoryRouter.delete("/:id", async (req, res, next) => {
    try {
      const categories = await CategoryModel.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.send({ rows: categories });
    } catch (error) {
      console.log(error);
      next(error);
    }
  });

export default categoryRouter