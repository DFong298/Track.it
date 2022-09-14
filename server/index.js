const express = require('express');
const app = express();
const mysql = require('mysql2');
const cors = require('cors');
const Axios = require('axios');
const { response } = require('express');
require('dotenv').config();


app.use(cors())
app.use(express.json());

const db = mysql.createConnection({
    user: process.env.USER,
    host: process.env.HOST,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
})

app.get('/retrievePortfolio', (req, res) => {
    var sqlQuery = 'SELECT * FROM portfolio';
    db.query(sqlQuery, function(err, result, fields) {
        if (err) {
            console.log(err);
        } else{
            res.send(result);
        }
    })
})


app.post('/getData', (req, res) => {
    let ticker = req.body.ticker

    var options = {
        method: 'GET',
        url: `https://yfapi.net/v6/finance/quote?region=US&lang=en&symbols=${ticker}`,
        params: {},
        headers: {
          'x-api-key': process.env.APIKEY
        }
    };
      
    Axios.request(options).then((response) => {
         res.send(response.data);
    }).catch((error) => {
        console.error(error);
    });
    
})

app.post('/sendData', (req, res) => {
    let ticker = req.body.ticker
    let stockname = req.body.name
    let numShares = parseInt(req.body.numShares)
    let priceBought = parseFloat(req.body.priceBought)
    let currentPrice = parseFloat(req.body.currentPrice)
    let dayChange = parseFloat(req.body.dayChange).toFixed(2)
    let totalChange = parseFloat(req.body.totalChange).toFixed(2)*100
    let totalValue = parseFloat(req.body.totalValue).toFixed(2)

    var sqlQuery = 'INSERT INTO track_it.portfolio (ticker, stockname, numshares, pricebought, currentprice, daychange, totalchange, totalvalue) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
    var values = [ticker, stockname, numShares, priceBought, currentPrice, dayChange, totalChange, totalValue]

    db.query(sqlQuery, values, (err, result) => {
        if (err) throw err;
        console.log("Successfully added to portfolio")
        res.send(result)
    })
    

})

/*
app.post('/createPortfolio', (req, res) => {
    let pName = req.body.pName;
    pName = pName.replaceAll(" ", "_");

    var sqlQuery = `CREATE TABLE ${pName} (id INT AUTO_INCREMENT PRIMARY KEY, ticker VARCHAR(255), priceBought FLOAT(6,2), currentPrice FLOAT(6,2), dayChange FLOAT(6, 2), totalChange FLOAT(6,2))`;
    db.query(sqlQuery, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            res.send("Added Portfolio")
        }
     })
})
*/

app.listen(3001, ()=> {
    console.log("Working 3001");
});