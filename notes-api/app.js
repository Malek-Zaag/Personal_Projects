const express = require("express")
const app = express()
const cors = require("cors")
const bp = require("body-parser")
const controller = require("./api/controller")


require("dotenv").config()
require("./config/config")
require("./schemas/note")


app.use(cors())
app.use(bp.json())

app.get("/", (req, res) => {
    res.json("The backend server is working !")
})

app.get("/notes", controller.getAllNotes)

app.post("/addNote", controller.addNote)

app.put("/updateNote", controller.updateNote)

app.delete("/deleteNote", controller.deleteNote)

app.listen(process.env.PORT || 3000, () => {
    console.log("hello server")
})

module.exports = app;