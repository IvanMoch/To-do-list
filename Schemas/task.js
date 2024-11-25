import mongoose, { Schema, model } from "mongoose";


const taskSchema = new Schema({
    tittle: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    workTeam    : {
        type: mongoose.Schema.ObjectId,
        ref: 'Team'
    },
    dueDate: {
        type: Date,
        require: true
    }

})

export const Task = model('Task', taskSchema)