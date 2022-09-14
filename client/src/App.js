import React from 'react';
import './App.css';
import {useState} from 'react';
import { HashRouter, Routes, Route } from "react-router-dom"
import Sidebar from './Components/Sidebar/Sidebar.jsx'
import HomePage from './Components/Homepage/Homepage';
import PortfolioDisplay from './Components/PortfolioDisplay/PortfolioDisplay'
import AddStockPage from './Components/AddStockPage/AddStockPage';
import Axios from 'axios';


function App() {

  const [pName, setpName] = useState("");

  const createPortfolio = () => {
    Axios.post('http://localhost:3001/createPortfolio', {
      pName: pName
    }).then(() => {
      console.log("success");
    });
  }

  

  return (
    <div className="App">
      <HashRouter basename='/'>
        <Routes>
          <Route exact path='/' element={<HomePage/>}/>
          <Route path='/portfolios' element={<PortfolioDisplay/>} />
          <Route path='/addstock' element={<AddStockPage/>}/>
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
