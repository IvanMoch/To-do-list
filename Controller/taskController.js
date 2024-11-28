import { SECRET_KEY } from "../config.js"
import { mongoModel } from "../Model/mongoModel.js"

export class TaskController{

    static createTask = async (req, res) => {
        const { tittle, description, workTeam, dueDate } = req.body
        
        try {

            if (!Date.parse(dueDate)) {
                return res.status(400).json({error : 'Invalid date format'})
            }
            const savedTask = await mongoModel.createTask({ tittle, description, workTeam, dueDate: new Date(dueDate) })
            res.status(200).json(savedTask)
        } catch (error) {
            res.status(400).json({message: 'Error while saving'})
        }
    }

    static getTaskInf = async (req, res) => {
        const { id } = req.params
        
        if (id) {
            const taskInf = await mongoModel.getTaskInf({ id: id })
            return res.status(200).json(taskInf)
        }

        return res.status(400).json({message: 'Error while getting the task inf'})
    }

    static getTasksByTeamId = async(req, res) => {
        const {teamId} = req.params


        const tasks = await mongoModel.getTasksByTeamId({ teamId })
        
        if (tasks) {
            return res.status(200).json(tasks)
        }

        return res.status(400).json({message: 'Error while getting the task information'})
    }

    static deleteTask = async (req, res) => {
        const { id } = req.params
        
        const deletedTask = await mongoModel.deleteTask({ id })
        
        if (deletedTask) {
            return res.status(200).json(deletedTask)
        }

        return res.status(400).json({error: 'Error while deleting the task'})
    }

    static createTaskView = async (req, res) => {
        const token = req.cookies.AccessToken

        try {
            const data = jwt.verify(token, SECRET_KEY)
            res.render('createTask', data)
        } catch (error) {
            console.log(error)
        }
    }
}