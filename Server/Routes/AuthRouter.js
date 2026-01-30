import express from 'express'
import { Login, Logout, Register } from '../Controller/AuuthCon.js'
import { body } from 'express-validator';
import { Protected } from '../Middleware/authMiddleware.js';


const Router = express.Router()

Router.post('/register',[
    body('name').notEmpty().withMessage('Name is required'),
    body('email').notEmpty().withMessage('Valid email required'),
    body('password').notEmpty().withMessage('Password min 6 char')
],Register)

Router.post("/login",Login);

Router.get("/me", Protected, (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
});

Router.get("/logout",Protected,Logout)



export default Router