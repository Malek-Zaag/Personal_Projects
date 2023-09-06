const mongoose = require("mongoose")


require("dotenv").config()
mongoose.set("strictQuery", false)

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
        console.log(`Server listening on ${process.env.PORT}`);
    })
    .catch((err) => { console.log(err) })
