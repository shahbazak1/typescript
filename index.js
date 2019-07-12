const rot13 = require('rot-13')
const path = require('path');
const express = require('express')
const hbs = require('hbs');
const redis = require('redis')
const redisClient = redis.createClient(6379,"127.0.0.1")

redisClient.on('error', (error)=>{
    console.log('Error while creating the socket connection to redis, Error: ', error)
})
redisClient.on('connect', () => {
    console.log('Connected to Redis Server..!');
});

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

//  let redisData = []
let returnValue = "";
console.log('returnValue globally: ',returnValue)
//Redis Implementation Middleware
const cacheEncoder = (req,res,next)=>{
    const input = Object.values(req.body)
    const encodedInput = input.map((item)=>{
        return rot13(item)
    })

    console.log('encodedInput: ',encodedInput)

    // const redisData = redisClient.lrange('redisData', 0, -1, function(error, reply) {
    //     console.log(reply)
    // });
    // console.log('This is redisData: ',redisData)
    

    // function checkRedis(callback) {    
    //     redisClient.lrange('redisData', 0,-1, function(err, result) {
    //         // If you need to process the result before "returning" it, do that here
    //         // Pass the result on to your callback
    //         callback(err, result)
    //     });
    // }

    // checkRedis(function(err, result) {
    //     // Use result here
    //     console.log('This is redisData from checkRedis 1st time', result)
    //     redisData =  result
    //     console.log('redisData from checkRedis: ',redisData)
    // });

    // function compareArrays (arr1, arr2) {
    //     let state = false
    //     console.log('in comp',arr1,arr2)
    //     for(let i=0;i<arr1.length;i++){
    //         if(arr1[i] == arr2[i]){
    //             state = true
    //         } else {
    //             state = false
    //         }
    //     }
    //     return state
    // }

    // console.log(compareArrays(encodedInput,redisData))

   
    const responseArray = encodedInput.map((inputItem)=>{
        
        redisClient.exists(inputItem, function(err, reply) {
        
            if (reply === 1) {

                console.log('Data already exists in Redis..!')

                 redisClient.get(inputItem, function(err, reply) {
                    returnValue = reply
                    console.log('returnValue that is set to reply from redis: ', returnValue)
                })

            } else {
                console.log('Data does not exist in Redis..!')

                 redisClient.set(inputItem,inputItem, function(error, reply) {
                        console.log('Redis updated with data: ', reply)
                        returnValue = inputItem
                        console.log('returnValue that is set to inputItem from HTTP request: ', returnValue)
                });
                redisClient.expire(inputItem,60)

            }

        })
        console.log('returnValue before function return: ', returnValue)
        return returnValue
    })



    // encodedInput.forEach((inputItem)=>{

    //     redisClient.exists(inputItem, function(err, reply) {
        
    //         if (reply === 1) {
    //             // console.log('Data is already in redis..!')
    //             // const arrayToJSON = Object.assign({}, (redisClient.get(item, function(err, reply) {})))
    //             // const stringJSON = JSON.stringify(arrayToJSON)
    //             // console.log('Sending back data from Redis..!')
    //             // res.json(stringJSON)
    //             // next();
    //             // res.end()

    //             console.log('Data already exists in Redis..!')
    //             sendingArray.push((redisClient.get(inputItem, function(err, reply) {})))
                

    //         } else {
    //             // const setRedis = encodedInput.forEach((encodedValue)=>{
    
    //             //     redisClient.set(encodedValue,encodedValue, function(error, reply) {
        
    //             //     });  //Testing
    //             // })
    //             // console.log('Redis updated with data..!')
            
    //             // const arrayToJSON = Object.assign({}, encodedInput)
    //             // const stringJSON = JSON.stringify(arrayToJSON)
    //             // res.json(stringJSON)
    //             // next();
    //             // res.end()

    //             console.log('Data does not exist in Redis..!')
    //             redisClient.set(inputItem,inputItem, function(error, reply) {
    //                     console.log('Redis updated with data: ', reply)
    //             });
    //             sendingArray.push(inputItem)

    //         }
    //     });
        

    // })

    console.log('Finalised responseArray: ',responseArray)
    const arrayToJSON = Object.assign({}, responseArray)
    console.log('Finalised arrayToJSON: ',arrayToJSON)
    const stringJSON = JSON.stringify(arrayToJSON)
    console.log('Finalised stringJSON HTTP response: ',stringJSON)
    res.json(stringJSON)
    next();
    res.end()

}


app.get('',(req,res)=>{
    res.render('index')
})

app.post('/encode', cacheEncoder)
app.post('/decode', decoder)


app.listen(3000, ()=>{
    console.log('Server Running..!')
})

