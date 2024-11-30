import { mongoModel } from "../Model/mongoModel.js";

export class teamController{

    static insertTeam = async (req, res) => {
        
        const teamInf = req.body

        const savedUser = await mongoModel.insertTeam(teamInf)

        if (savedUser) {
            res.json(savedUser)
        } else {
            res.json({error: 'Error while saving the team'})
        }
    }

    static getTeamInf = async (req, res) => {
        const {id} = req.params

        const teamInf = await mongoModel.getTeamInf(id)

        if (teamInf) {
            res.json(teamInf)
        } else {
            res.json({error: 'Error while getting the team information'})
        }
    }

    static getTeamByUserId = async(req, res) => {
    
        const { userId } = req.params
        
        const workTeams = await mongoModel.getTeamsByUserId({ userId })
        
        if (workTeams.length === 0) {
            return res.status(400).json({error: 'Error while checking the dataBase'})
        }

            return res.status(200).json(workTeams)
    }

}