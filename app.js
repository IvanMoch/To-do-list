import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { userRouter } from "./Routes/userRoutes.js";
import { teamRouter } from "./Routes/teamRoutes.js";
import cookieParser from "cookie-parser";
import { taskRouter } from "./Routes/taskRoutes.js";
import jwt from "jsonwebtoken"
import { SECRET_KEY } from "./config.js";

const app = express()
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

app.use(express.static(path.join(__dirname, '/public')))
app.use(cookieParser())
app.set('view engine', 'ejs')

app.use(express.json())

app.get('/', (req, res) => {
    res.render('index')
})

//showing the main page view
app.get('/main', (req, res) => {
    const token = req.cookies.AccessToken

        if(!token){ return res.status(400).send('not authorized')}
        try {
            const data = jwt.verify(token, SECRET_KEY)
            res.render('main', data)
        } catch (e) {
            console.log(`Error: ${e}`)
            res.status(400).send('<h1>User not found</h1>')
        }
})

//Showing the create task view

app.get('/createTask', async (req, res) => {
    const token = req.cookies.AccessToken

    if (!token) { return res.status(400).send('not authorized') }
    
    try {
        const data = jwt.verify(token, SECRET_KEY)
        res.render('createTask', data)
    } catch (error) {
        
    }
})

app.use('/user', userRouter)

app.use('/team', teamRouter)

app.use('/task', taskRouter)

app.listen(3000, (req, res) => {
    console.log(`Server listening on: http://localhost:3000/`)
})