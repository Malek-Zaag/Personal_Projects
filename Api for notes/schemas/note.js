const mongoose = require("mongoose")




const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    date: {
        type: Date,
        required: [true, "please enter a date"]
    },
    state: {
        type: String,
        required: true
    },
    dueDate: {
        type: Date,
        required: true
    }
})


const noteModel = mongoose.model("note", noteSchema)
module.exports = noteModel