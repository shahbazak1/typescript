const rot13 = require('rot-13')
const express = require('express')
const app = express()


app.use(express.json())

const encoder = (req,res,next)=>{
    const input = Object.values(req.body)
    const encodedInput = input.map((item)=>{
        return rot13(item)
    })
    res.send(encodedInput)
    next();
    res.end()
}


app.post('/task', encoder)





app.listen(3000, ()=>{
    console.log('Server Running..!')
})