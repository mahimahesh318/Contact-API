import express from 'express'
import { register } from '../Controllers/userController.js';
import { login } from '../Controllers/userController.js';

const router = express.Router();

//user register
//@api description : user register 
//@api method : post
//@api endPoint : /api/user/register
router.post('/register',register);

//user login
//@api description : user login
//@api method : post
//@api endPoint : /api/user/login
router.post('/login',login);


export default router;