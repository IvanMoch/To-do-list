import mongoose, { Schema, model, mongo } from "mongoose";

const teamSchema = new Schema({
    title: {
        type: String,
        requiere: true 
    },

    description: {
        type: String,
    },

    members: [{
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }]
})

export const Team = model('Team', teamSchema)