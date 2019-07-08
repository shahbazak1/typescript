const rot13 = require('rot-13')
const path = require('path');
const express = require('express')
const hbs = require('hbs');


const app = express()


const publicDirectoryPath = path.join(__dirname, './public');
const viewsPath = path.join(__dirname, './templates/views');
const partialsPath = path.join(__dirname, './templates/partials');


//Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));



app.use(express.json())

const encoder = (req,res,next)=>{
    const input = Object.values(req.body)
    const encodedInput = input.map((item)=>{
        return rot13(item)
    })
    const arrayToJSON = Object.assign({}, encodedInput)
    const stringJSON = JSON.stringify(arrayToJSON)
    res.json(stringJSON)
    next();
    res.end()
}

const decoder = (req,res,next)=>{
    const input = Object.values(req.body)
    const decodedInput = input.map((item)=>{
        return rot13(item)
    })
    const arrayToJSON = Object.assign({}, decodedInput)
    const stringJSON = JSON.stringify(arrayToJSON)
    res.json(stringJSON)
    next();
    res.end()
}


app.get('',(req,res)=>{
    res.render('index')
})

app.post('/encode', encoder)
app.post('/decode', decoder)




app.listen(3000, ()=>{
    console.log('Server Running..!')
})






// app.get('/weather', (req,res)=>{

//     if(!req.query.address){
//         return  res.send({
//              error: 'You must provide an address'
//          })
//      }

//      geocode(req.query.address, (error,{latitude, longitude, location}={})=>{
//         if(error){
//             return res.send({ error })  //Fixed an error for this, return was missing, cannot send res twice in http responses
//         }
        
//      forecast(latitude, longitude, (error, forecastData) => {
//         if(error){
//             return res.send({error})
//         }

//             res.send({
//                 forecast: forecastData,
//                 location,
//                 address: req.query.address
//             })
//          })

//      })


// });