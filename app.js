const express = require('express')

const app = express()
const port = 4000

app.use('/', (req, res)=>{
    res.send('Hello World!!! This is Sharnam Here!!!')
})

app.listen(port, () => {
    console.log(`App Running on Port ${port}`)
})