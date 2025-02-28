import { mongoModel } from "../Model/mongoModel.js"
import jwt from "jsonwebtoken"
import { SECRET_KEY } from "../config.js"
import bcryptjs from 'bcryptjs'

export class UserController {
    static getUserInf = async (req, res) => {
        const { username } = req.params

        const userInf = await mongoModel.getUser({ username })
        
        if (userInf) {
            return res.status(200).json(userInf)
        }

        return res.status(400).json({Message : 'User does not exist'})
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
        const token = jwt.sign({id: user._id,username: user.username},SECRET_KEY,{expiresIn:'1h'})
        
        if (user) {
            res.cookie('AccessToken', token , { httpOnly: true }).status(200).json(user)
        } else {
            res.status(400).json({message : 'Invalid data'})
        }
    }

    static logout = async (req, res) => {
    res.clearCookie('AccessToken').render('index')
    }
    
    static searchUser = async (req, res) => {
        
        const { word } = req.params
        try {
            const users = await mongoModel.getAllUsers()
            const result = users.filter((element) => {
                return (element.username.toLowerCase()).includes(word.toLowerCase())
            })
            return res.status(200).json(result)
        } catch (error) {
            console.log(error)
            return res.status(200).json({error: 'Error while getting the users'})
        }
    }

    static verifyUser = async (req, res) => {

    }

    static modifyUser = async (req, res) => {
        
    }
}