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

const decoder = (req,res,next)=>{
    const input = Object.values(req.body)
    const decodedInput = input.map((item)=>{
        return rot13(item)
    })
    res.send(decodedInput)
    next();
    res.end()
}


app.post('/encode', encoder)
app.post('/decode', decoder)




app.listen(3000, ()=>{
    console.log('Server Running..!')
})