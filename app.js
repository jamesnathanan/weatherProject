const express = require("express")
const https = require("https")
const bodyParser = require("body-parser")

const app = express()
app.use(bodyParser.urlencoded({extended: true}))

const apiKey = "98aaf1debbf8806d60944a1dc9ffe751"

app.get("/", (req, res) => {
    res.sendFile(__dirname + '/index.html')
    
})

app.post("/", (req, res) => {
    console.log('Post Received')
    console.log(req.body.cityName)

    const query = req.body.cityName
    const unit = 'metric'
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+apiKey+"&units="+unit
    const units = unit === 'metric' ? 'Celsius' : 'Kelvins'
    https.get(url, (response) => {
        console.log(response.statusCode)

        response.on("data", (data) => {
            const weatherData = JSON.parse(data)
            const cityName = weatherData.name
            const temp = weatherData.main.temp
            const des = weatherData.weather[0].description
            console.log(cityName)
            console.log(temp)
            console.log(des)
            const icon = weatherData.weather[0].icon
            const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png"
            res.write("<h1>The weather in " + cityName + " today</h1>")
            res.write(`<h2>The Temperature is ${temp} Degree ${units} and has ${des}</h2>`)
            res.write("<img src=" + imageURL + ">")
            res.send()
            //res.send("Hi")
        })
    })
   // res.send("<h3>Server is up and running...</h3>")
})

app.listen( 3000, () => {
    console.log('Server is running on port 3000')
})


