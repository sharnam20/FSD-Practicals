const express = require('express')

const app = express()
const port = 4000

app.set('views',__dirname+'/views')
app.set('view engine','ejs')
app.use(express.static('public'))

app.get('/', (req,res)=> {
    res.render('home', {name: "Sharnam Shah"})
})

app.get('/homedashboard', (req,res)=> {
    res.render('homedashboard', {name: "Sharnam"})
})

app.listen(port, ()=> {
    console.log(`App5 Running on Port ${port}`)
})