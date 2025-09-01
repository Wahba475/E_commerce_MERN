import express from 'express'
import { LoginUser, RegisterUser, adminLogin } from '../Controllers/UserController.js'
const UserRouter = express.Router()

UserRouter.post('/login', LoginUser)

UserRouter.post('/register', RegisterUser)


UserRouter.post('/admin', adminLogin)
 
export default UserRouter
