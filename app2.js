const express = require('express')

const app = express()
const port = 4002


//Whenver use ejs then add these below two lines
app.set('views',__dirname+'/views')
app.set('view engine', 'ejs')


//For API endpoint add below line 
app.use(express.urlencoded())

app.get('/', (req,res) => {
    res.send("Hello PATEL Sharnam!!!")
})

app.get('/homepage', (req,res) => {
    res.render('home', {myname: "Sharnam Shah"})
})

app.get('/marksheet', (req, res) => {
    res.render('marksheet')
})


//API Endpoint 
app.post('/marksheetprocess', (req,res) => {
    var sub1 = req.body.sub1
    var sub2 = req.body.sub2

    var total = parseInt(sub1) + parseInt(sub2)
    res.render('ans', {mysub1: sub1, mysub2: sub2, result: total})
})

app.listen(port, ()=> {
    console.log("App2 Running on Port 4002")
})