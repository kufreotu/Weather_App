//create express module
const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
const ejs = require('ejs');
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
require('dotenv').config(); //import the dotenv config file

app.use(express.static('public'));
app.set("view engine", "ejs"); 
app.use('/public', express.static('public'));

app.get("/", (req, res)=>{
    const sendData = {location: "Location", country: "Country", temp: "Temp", desc: "Description", feel: "feel-like", humidity: "Humidity", speed: "Speed"};
    res.render("index", {sendData: sendData});
})

app.post('/', async(req, res)=>{
   let location = await req.body.city;
   const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.APIKEY}&units=metrics`
   const response = await fetch(url);
   const weatherData = await response.json();
   const temp = Math.floor(weatherData.main.temp);
   const desc = weatherData.weather[0].description;
   const icon = weatherData.weather[0].icon;
   const sendData = {};
   sendData.temp = temp
   sendData.desc = desc;
   sendData.location = location;
   sendData.feel = weatherData.main.feels_like;
   sendData.humidity = weatherData.main.humidity;
   sendData.speed = weatherData.wind.speed;
   sendData.country = weatherData.sys.country;
   res.render('index',{sendData:sendData});
   /*const imageUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`; 
   res.write(`<h1>The current weather in ${location} is ${disc}</h1>`);
   res.write(`<h1>The current weather is ${temp} degree celsius.</h1>`);
   res.write(`<img src="${imageUrl}">`);*/


})
app.listen (1616, () => console.log("server is running.."))