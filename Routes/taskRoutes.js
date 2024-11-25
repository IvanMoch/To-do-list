import { Router } from "express";
import { TaskController } from "../Controller/taskController.js";

export const taskRouter = new Router()

taskRouter.post('/create', TaskController.createTask)
taskRouter.get('/:id', TaskController.getTaskInf)
taskRouter.get('/team/:teamId', TaskController.getTasksByTeamId)