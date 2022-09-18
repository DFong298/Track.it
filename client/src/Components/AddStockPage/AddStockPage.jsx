import React from 'react';
import './AddStockPage.css';
import Sidebar from '../Sidebar/Sidebar';
import { useState } from 'react';
import { Link } from "react-router-dom"
import Axios from 'axios';
import Toast from 'react-bootstrap/Toast';

const AddStockPage = () => {
    const [ticker, setTicker] = useState("");
    const [name, setName] = useState(""); //retrieved by an api
    const [numShares, setNumShares] = useState("");
    const [priceBought, setPriceBought] = useState("");
    const [currentPrice, setCurrentPrice] = useState(""); //retrieved by an api
    const [dayChange, setDayChange] = useState(""); //retrieved by an api
    const [totalChange, setTotalChange] = useState(""); //calculated by app
    const [totalValue, setTotalValue] = useState("");

    const getData = () => {
        Axios.post('http://localhost:3001/getData', {
            ticker: ticker
          }).then( (response) => {
            setName(response.data.quoteResponse.result[0].shortName)
            setCurrentPrice(response.data.quoteResponse.result[0].regularMarketPrice);
            setDayChange(response.data.quoteResponse.result[0].regularMarketChangePercent);
            setTotalChange((response.data.quoteResponse.result[0].regularMarketPrice - priceBought)/priceBought);
            setTotalValue(currentPrice * numShares)
            console.log("its coming")
            console.log(currentPrice, dayChange, totalChange)
          });
    }

    const sendData = () => {
        Axios.post('http://localhost:3001/sendData', {
            ticker: ticker,
            name: name,
            numShares: numShares,
            priceBought : priceBought,
            currentPrice: currentPrice,
            dayChange: dayChange,
            totalChange: totalChange,
            totalValue: totalValue
        }).then((response) => {
            if (response.data.affectedRows == 1){
                console.log("1 row successfully added")
            }
        })
    }

return(
    <div className='add-stock-page'>
        <Sidebar/>
            <div className='stock-form'>
                <form>
                    <label>
                        Ticker
                        <input
                        type='text'
                        value={ticker}
                        onChange={(e) => setTicker(e.target.value)}
                        />
                    </label>
                    <label>
                        Number of Shares
                        <input
                        type='text'
                        value={numShares}
                        onChange={(e) => setNumShares(e.target.value)}
                        />
                    </label>
                    <label>
                        Price Bought
                        <input
                        type='text'
                        value={priceBought}
                        onChange={(e) => setPriceBought(e.target.value)}
                        />
                    </label>
                    <label>
                        Day's Change (%)
                        <input
                        disabled='true'
                        type='text'
                        value={dayChange}
                        onChange={(e) => setPriceBought(e.target.value)}
                        />
                    </label>
                    <label>
                        Current Price:
                        <input
                        disabled='true'
                        type='text'
                        value={currentPrice}
                        onChange={(e) => setPriceBought(e.target.value)}
                        />
                    </label>
                    <label>
                        Total Current Value:
                        <input
                        disabled='true'
                        type='text'
                        value={totalValue}
                        onChange={(e) => setPriceBought(e.target.value)}
                        />
                    </label>
                    <button onClick={() => getData()}>log it</button>
                    <Link to='/portfolios' style={{ textDecoration: 'none' }}>
                        <button onClick={() => sendData()}>Add Stock</button>
                    </Link>
                </form>

            </div>
        </div>
    )
}

export default AddStockPage