import express from 'express'
import UserModel from '../users/model.js'
import sequelize from '../db/index.js'

const userRouter = express.Router()

userRouter.get('/', async (req,res,next) => {
    try {
    
        
        const users = await UserModel.findAll()
       

        res.send(users)
    } catch (error) {
        console.log(error)
        next(error)
        
    }
} )

userRouter.get("/:id", async (req, res, next) => {
    try {
     
      const user= await UserModel.findByPk(req.params.id);
      res.send(user);
    } catch (error) {
      console.log(error);
      next(error);
    }
  });


userRouter.post("/", async (req, res, next) => {
    try {
      const user = await UserModel.create(req.body);
  
      res.send(user);
    } catch (error) {
      console.log(error);
      next(error);
    }
  });

  userRouter.put("/:id", async (req, res, next) => {
    try {
      const user = await UserModel.update(req.body, {
        where: {
          id: req.params.id,
        },
        returning: true,
      });
      res.send(user);
    } catch (error) {
      console.log(error);
      next(error);
    }
  });



  userRouter.delete("/:id", async (req, res, next) => {
    try {
      const users = await UserModel.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.send({ rows: users });
    } catch (error) {
      console.log(error);
      next(error);
    }
  });

  export default userRouter
