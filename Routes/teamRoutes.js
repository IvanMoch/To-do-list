import { Router } from "express";
import { teamController } from "../Controller/teamController.js";


export const teamRouter = new Router()

teamRouter.post('/register', teamController.insertTeam)
teamRouter.get('/id/:id', teamController.getTeamInf)
teamRouter.get('/filterByUser/:userId', teamController.getTeamByUserId)
