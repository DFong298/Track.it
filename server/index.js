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
    let sqlQuery = 'SELECT * FROM portfolio';
    db.query(sqlQuery, function(err, result, fields) {
        if (err) {
            console.log(err);
        } else{
            res.send(result);
        }
    })
})




app.get('/updatePortfolio', (req, res) => {
    let sqlQuery ='SELECT ticker, numshares, pricebought, currentprice FROM track_it.portfolio';
    let totalValue = 0;
    let originalValue = 0;
    let totalChange = 0;
    console.log(totalValue, originalValue, totalChange)
    db.query(sqlQuery, async function(err, result) {
        if (err) {
            console.log(err)
        } else {
            for (let i = 0; i < result.length; i++){
                let options = {
                    method: 'GET',
                    url: `https://yfapi.net/v6/finance/quote?region=US&lang=en&symbols=${result[i].ticker}`,
                    params: {},
                    headers: {
                        'x-api-key': 'Z0vg8MtmfgC9Cp5J7wCJ70DHAf7hBQB2f6KwgDje'
                    }
                };
                let response = await Axios.request(options)
                totalValue += (response.data.quoteResponse.result[0].regularMarketPrice * result[i].numshares)
                console.log(totalValue)
                originalValue += (result[i].pricebought * result[i].numshares)
                console.log(originalValue)
                let updateQuery =`UPDATE track_it.portfolio SET daychange = "${parseFloat(response.data.quoteResponse.result[0].regularMarketChange).toFixed(2)}", 
                        currentprice = "${response.data.quoteResponse.result[0].regularMarketPrice}",
                        totalchange = "${((response.data.quoteResponse.result[0].regularMarketPrice - result[i].pricebought) / result[i].pricebought).toFixed(2) * 100}",
                        totalvalue = "${result[i].numshares * response.data.quoteResponse.result[0].regularMarketPrice}"
                        WHERE ticker = "${result[i].ticker}"`;
                db.query(updateQuery, function(err, output) {
                    if (err) console.log(err)
                    else console.log("Successfully updated for ticker: " + result[i].ticker)
                })
            }
            totalChange = (100*((totalValue - originalValue)/originalValue)).toFixed(2)
            console.log(totalChange)
            res.send([totalChange, totalValue])
        }
    })
    
})


app.post('/getData', (req, res) => {
    let ticker = req.body.ticker

    let options = {
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
    let totalChange = parseFloat(req.body.totalChange).toFixed(2)
    let totalValue = parseFloat(req.body.totalValue).toFixed(2)

    let sqlQuery = 'INSERT INTO track_it.portfolio (ticker, stockname, numshares, pricebought, currentprice, daychange, totalchange, totalvalue) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
    let values = [ticker, stockname, numShares, priceBought, currentPrice, dayChange, totalChange, totalValue]

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

    let sqlQuery = `CREATE TABLE ${pName} (id INT AUTO_INCREMENT PRIMARY KEY, ticker letCHAR(255), priceBought FLOAT(6,2), currentPrice FLOAT(6,2), dayChange FLOAT(6, 2), totalChange FLOAT(6,2))`;
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