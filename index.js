// create coonection 
//server

const {error} = require('console');
const exp = require('constants');
const { create } = require('domain');
let express = require('express'),
path = require('path'),
mongoose = require('mongoose')
cors = require ('cors'),
bodyparser = require('body-parser'),
mongoDb = require('./database/db');
const path = require('path')

mongoose.Promise - global.Promise
// mongoose.connect(mongoDb.db, {
mongoose.connect( process.env.MONGODB_URI.db, {
    useNewUrlParser : true,
    useUnifiedTopology : true,
    

}).then(()=>{

        console.log("Database connected successfully")
},
error=>{
        console.log("Database Error:" +error)
})

//routes

const bookRoute = require("./node-backend/routes/book.routes")
const app = express()
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({
        extended:false
}))
app.use(cors())

//path

// app.use(express.static(path.join(__dirname,'dist/Bookstore')))

app.use(express.static(('./dist/Bookstore')))


//api route
app.use('/api',bookRoute)

//port
const port = process.env.port || 8000
app.listen(port,()=>{
        console.log("listening port is  on:" +port)
})

//404 error
app.use((req,res,next)=>{
        next(createError(404))
})

//base route
app.get('/',(req,res)=>{
        res.send("Invalid endpoint")
})
app.get("*",(req,res)=>{
        res.sendFile(path.join(__dirname,'dist/Bookstore/index.html'))
})
app.use(function(err,req,res,next){
        console.log(err.message)
        if(!err.statusCode) err.statusCode = 500
        res.status(err.statusCode).send(err.message)
})