import { mongoModel } from "../Model/mongoModel.js"
import jwt from "jsonwebtoken"
import { SECRET_KEY } from "../config.js"
import bcryptjs from 'bcryptjs'

export class UserController {
    static getUserInf = async (req, res) => {
        const token = req.cookies.AccessToken

        if(!token){ return res.status(400).send('not authorized')}
        try {
            const data = jwt.verify(token, SECRET_KEY)
            res.render('userPage', data)
        } catch (e) {
            console.log(`Error: ${e}`)
            res.status(400).send('<h1>User not found</h1>')
        }
    }

    static insertUser = async (req, res) => {
        const {username, password} = req.body

        try {
            const hashedPassword = await bcryptjs.hash(password,10)
            const savedUser = await mongoModel.insertUser({username, password: hashedPassword})
            res.json(savedUser)
        } catch (error) {
            res.json({error : error})
        }
    }

    static logUser = async (req, res) => {
        const { username, password } = req.body
        
        const user = await mongoModel.logUser({ username, password })
        const token = jwt.sign({id: user.id,username: user.username, id: user._id},SECRET_KEY,{expiresIn:'1h'})
        
        if (user) {
            res.cookie('AccessToken', token , { httpOnly: true }).status(200).json(user)
        } else {
            res.status(400).json({message : 'Invalid data'})
        }
    }

    static logout = async (req, res) => {
    res.clearCookie('AccessToken').render('index')
   }

    static verifyUser = async (req, res) => {

    }

    static modifyUser = async (req, res) => {
        
    }
}