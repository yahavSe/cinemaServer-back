var express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')

var usersController = require('./controllers/usersController')

require('./config/cinemaDB.js')

var app = express()
app.use(cors())
app.use(bodyParser.urlencoded({extended:true})).use(bodyParser.json())

app.use('/users',usersController)

app.listen(3001,()=>{
    console.log("the server is up");
})