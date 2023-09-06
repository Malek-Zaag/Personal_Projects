const { response } = require("express")
const noteModel = require("../schemas/note")


module.exports.getAllNotes = async (req, res) => {
    noteModel.find()
        .then((response) => {
            console.log(response)
            res.send(response)
        })
        .catch((err) => {
            console.log(err)
            res.send(err)
        })
}



module.exports.addNote = async (req, res) => {
    const note = req.body
    note.date = new Date()
    noteModel.create(note)
        .then((response) => {
            console.log(response)
            res.send(response)
        })
        .catch((err) => {
            console.log(err)
            res.send(err)
        })
}


module.exports.updateNote = async (req, res) => {
    const note = req.body
    const title = note.title
    noteModel.findOneAndUpdate({ title }, note)
        .then((response) => {
            console.log(response)
            res.send(response)
        })
        .catch((err) => {
            console.log(err)
            res.send(err)
        })
}


module.exports.deleteNote = async (req, res) => {
    const title = req.body.body
    noteModel.findOneAndDelete({ title })
        .then((response) => {
            console.log(response)
            res.send("note was deleted successfully")
        })
        .catch((err) => {
            console.log(err)
            res.send(err)
        })

}