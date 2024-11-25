import mongoose from "mongoose";
import { User } from "../Schemas/user.js";
import { Team } from "../Schemas/team.js";
import { Task } from "../Schemas/task.js";
import bcrypt from "bcryptjs"


const database = mongoose.connection
const PORT = 27017
const DB_NAME = 'toDoList'

mongoose.connect(`mongodb://127.0.0.1:27017/${DB_NAME}`)

database.on('open', () => {
    console.log(`Database listening on: mongodb://127.0.0.1:27017/${DB_NAME}`)
})

database.on('error', (error) => {
    console.log('mongoDB error: ', error)
})

export class mongoModel {

    //method to insert a new user
    
    static async insertUser({ username, password }) {
        try {
            const newUser = new User({
                username: username,
                password : password
            })
            const savedUser = newUser.save()
            return savedUser
        } catch (error) {
            console.error(error)
        }
    }

    //Method to get the user information

    static async getUser({ username }) {
        
        try {
            const result = User.findOne({ username: username })
            return result
        } catch(error) {
            console.error(error)
        }
    }

    //method to create a new team

    static async insertTeam({ title, description, members }) {
        try {
            const newTeam = new Team({
            title: title,
            description: description,
            members: members
            })
            const savedTeam = await newTeam.save()
            return savedTeam
        } catch (error) {
            console.log('Mongo error: ', error)
        }
    }

    // Method to get the team description

    static async getTeamInf(teamId) {
        
        try {
            const teamInf = await Team.findById(teamId).populate('members')
            return teamInf
        } catch (error) {
            console.log(error)
        }
    }

    //log user

    static async logUser({ username, password }) {
        const user = await User.findOne({ username: username })
        

        if (user) {
            
            const checkedPassword = await bcrypt.compare(password, user.password)
            if (checkedPassword) {
                return user
            }

        } else {
            return false
        }
    }


    // Method to create a new task

    static async createTask({ tittle, description, workTeam, dueDate }) {
        
        try {
            const newTeam = await new Task({
                tittle: tittle,
                description: description,
                workTeam: workTeam,
                dueDate: dueDate
            }) 
            const savedTask = await newTeam.save()
            return savedTask
        } catch (e) {
            console.log('Mongo error: ', e)
        }
    }

    //Method to get task info

    static async getTaskInf({ id }) {
        
        try {
            const taskInf = await Task.findById(id).populate({
                path: 'workTeam',
                populate: {
                    path: 'members',
                    model:'User'
                }
            })
            return taskInf
        } catch (error) {
            console.log('Mongo error: ', error)
        }
        
    }


    static async getTeamsByUserId({ userId }) {
        
        try {
        const workTeams = await Team.find({ members: userId })
        return workTeams
        } catch (error) {
            console.log(error)
        }
    }

    static async getTasksByTeamId({ teamId }) {

        try {
            const tasks = await Task.find({ workTeam: teamId })
            return tasks
        } catch (error) {
            console.log(error)
        }
    }
}