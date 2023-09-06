const express = require("express");
const route = require("./Routes/AuthRoute")
const PORT = process.env.PORT || 4000;
var cors = require("cors");
const mongoose = require("mongoose");
require('dotenv').config()
const cookieParser = require("cookie-parser");
const stripe = require('stripe')('sk_test_51KpXPOKT7i3YsQqYd2BhaPnqtIUDzGiXKnAYacqR38Xj3QYH6oTQogroMoTlpImUS2QIUNFoGph49MDEPxD50NXQ001M26sSS3'); // Add your Secret Key Here




const app = express()
const corsOptions = {
    origin: true,
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200,
}


//middleware
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

//db
const dbURI = "mongodb+srv://admin:admin@cluster0.gkmmv.mongodb.net/Sama3ni?retryWrites=true&w=majority"
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => { app.listen(PORT); console.log(process.env.SERVER_URL); console.log(`Server listening on ${PORT}`); })
    .catch((err) => { console.log(err) })



//routes
app.use(route)


//integration with stripe
app.post('/create-checkout-session', async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: req.body.items.map(item => {
                return {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: item.name
                        },
                        unit_amount: item.price * 100
                    },
                    quantity: 1
                }
            }),
            success_url: `${process.env.SERVER_URL}/shop`,
            cancel_url: `${process.env.SERVER_URL}/cart`,
        })
        res.json({ url: session.url })
    } catch (e) {
        res.status(500).json({ error: e.message })
    }
});

