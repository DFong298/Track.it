import React from "react";
import "./AddStockPage.css";
import Sidebar from "../Sidebar/Sidebar";
import { useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import RefreshIcon from "@mui/icons-material/Refresh";
import { TextField } from "@mui/material";

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
    console.log("button")
    Axios.post("http://localhost:3001/getData", {
      ticker: ticker,
    }).then((response) => {
      setName(response.data.quoteResponse.result[0].shortName);
      setCurrentPrice(response.data.quoteResponse.result[0].regularMarketPrice);
      setDayChange(
        response.data.quoteResponse.result[0].regularMarketChangePercent.toFixed(2)
      );
      setTotalChange(
        (100 *
          (response.data.quoteResponse.result[0].regularMarketPrice -
            priceBought)) /
          priceBought
      );
      console.log(totalChange)
      setTotalValue((currentPrice * numShares).toFixed(2));
      console.log("its coming");
      console.log(currentPrice, dayChange, totalChange);
    });
  };

  const sendData = () => {
    Axios.post("http://localhost:3001/sendData", {
      ticker: ticker,
      name: name,
      numShares: numShares,
      priceBought: priceBought,
      currentPrice: currentPrice,
      dayChange: dayChange,
      totalChange: totalChange,
      totalValue: totalValue,
    }).then((response) => {
      if (response.data.affectedRows == 1) {
        console.log("1 row successfully added");
      }
    });
  };

  return (
    <div className="add-stock-page">
      <Sidebar />
      <div className="form-box">
        <form className="stock-form">
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginTop: "50px",
              marginBottom: "60px"
            }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                flex: "1",
                marginLeft: "70px",
                height: "100%",
              }}>

              <label>
                <input
                    id="ticker-input"
                    className="input-field"
                    type="text"
                    value={ticker}
                    onChange={(e) => setTicker(e.target.value)}
                  />
                  <div className="input-label">Ticker</div>
                </label>

              <label>
                <input
                  className="input-field"
                  type="text"
                  value={numShares}
                  onChange={(e) => setNumShares(e.target.value)}
                />
                <div className="input-label">Number of Shares</div>
              </label>

              <label>
                <input
                  className="input-field"
                  type="text"
                  value={priceBought}
                  onChange={(e) => setPriceBought(e.target.value)}
                />
                <div className="input-label">Price Brought</div>
              </label>

            </div>
            
            <div
              style={{ display: "flex", flexDirection: "column", flex: "1", marginLeft: "80px",
              height: "100%", }}
            >
              <label>
                <input
                  
                  disabled="true"
                  className="input-field"
                  type="text"
                  value={dayChange}
                  onChange={(e) => setPriceBought(e.target.value)}
                />
                <div className="input-label">Day's Change (%)</div>
              </label>

              <label>
                <input
                  
                  disabled="true"
                  className="input-field"
                  type="text"
                  value={currentPrice}
                  onChange={(e) => setPriceBought(e.target.value)}
                />
                <div className="input-label">Current Price</div>
              </label>

              <label>
                <input
                  
                  disabled="true"
                  className="input-field"
                  type="text"
                  value={totalValue}
                  onChange={(e) => setPriceBought(e.target.value)}
                />
                <div className="input-label">Total Current Value</div>
              </label> 

            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                flex: "1",
                marginLeft: "80px",
                height: "100%",
              }}>
              <label>
                <button
                  onClick={() => getData()}
                  className='refresh-button'>
                  <svg viewBox="0 0 24 24" width='5vw'><path fill="#8F3F3F" d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"></path></svg>
                </button>
              </label>
              <label>
                <Link to="/portfolios" style={{ textDecoration: "none" }}>
                  <button className='submit-button' onClick={() => sendData()}>Add Stock</button>
                </Link>
              </label>
            </div>
          </div>
          
        </form>
      </div>
    </div>
  );
};

export default AddStockPage;
