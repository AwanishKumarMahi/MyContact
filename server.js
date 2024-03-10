const express = require("express")
const errorHandler = require("./middleware/errorHandler")
const dotenv = require("dotenv").config()

connectDB()
const app = express()

const port = process.env.PORT || 5000 //both string and int is allowed

app.use(express.json())
app.use('/api/contacts',require('./routes/contactRoutes'))
app.use(errorHandler)



app.listen(port, ()=>{
    console.log("Listening to port",port)
})