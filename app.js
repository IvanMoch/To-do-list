import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { userRouter } from "./Routes/userRoutes.js";
import { teamRouter } from "./Routes/teamRoutes.js";
import cookieParser from "cookie-parser";
import { taskRouter } from "./Routes/taskRoutes.js";

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

app.use('/user', userRouter)

app.use('/team', teamRouter)

app.use('/task', taskRouter)

app.listen(3000, (req, res) => {
    console.log(`Server listening on: http://localhost:3000/`)
})