import React, {useEffect, useState} from 'react';
import './PortfolioDisplay.css'
import Sidebar from '../Sidebar/Sidebar';
import Axios from 'axios';
import { Link } from "react-router-dom"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const PortfolioDisplay = () => {

    const [data, setData] = useState([])

    const retrievePortfolio = async () => {
        await Axios.get('http://localhost:3001/retrievePortfolio', {
        }).then((response) => {
            setData(response.data);
        });
    }

    useEffect(() => {
        retrievePortfolio();
    }, [])

    useEffect(() => {
        console.log(data)
    }, [data]) 

    return(
        <div className='portfolios-page'>
            <Sidebar/>
            <div className='table_headers'></div>
            <Link to='/addstock' style={{textDecoration: 'none'}}>
                <button className='add-stock-button'> + Add Stock</button>
            </Link>
            <TableContainer classname="data-table" component={Paper} style={{backgroundColor: '#FFFDD0', width: '65%', position: 'relative', left: '19%', borderColor: '#8F3F3F'}} sx={{border: 3, borderRadius: '16px'}}>
                <Table style={{ width: 1200, margin: 'auto' }} sx={{ minWidth: '400px' }}>
                    <TableHead>
                    <TableRow>
                        <TableCell align="center" style={{color: '#8F3F3F', fontSize: "20px", fontWeight: "700"}}>Ticker</TableCell>
                        <TableCell align="center" style={{color: '#8F3F3F', fontSize: "20px", fontWeight: "700"}}>Company Name</TableCell>
                        <TableCell align="center" style={{color: '#8F3F3F', fontSize: "20px", fontWeight: "700"}}>Number of Shares</TableCell>
                        <TableCell align="center" style={{color: '#8F3F3F', fontSize: "20px", fontWeight: "700"}}>Price Bought</TableCell>
                        <TableCell align="center" style={{color: '#8F3F3F', fontSize: "20px", fontWeight: "700"}}>Current Price</TableCell>
                        <TableCell align="center" style={{color: '#8F3F3F', fontSize: "20px", fontWeight: "700"}}>Day's Change &#40;%&#41;</TableCell>
                        <TableCell align="center" style={{color: '#8F3F3F', fontSize: "20px", fontWeight: "700"}}>Total Change &#40;%&#41;</TableCell>
                        <TableCell align="center" style={{color: '#8F3F3F', fontSize: "20px", fontWeight: "700"}}>Total Value</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {data.map((item) => (
                        <TableRow>
                            <TableCell align='center' width='12%' >{item.ticker}</TableCell>
                            <TableCell align="center" width='12%'>{item.stockname}</TableCell>
                            <TableCell align="center" width='12%'>{item.numshares}</TableCell>
                            <TableCell align="center" width='12%'>{item.pricebought}</TableCell>
                            <TableCell align="center" width='12%'>{item.currentprice}</TableCell>
                            <TableCell align="center" width='12%'>{item.daychange} %</TableCell>
                            <TableCell align="center" width='12%'>{item.totalchange} %</TableCell>
                            <TableCell align="center" width='12%'>{item.totalvalue}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default PortfolioDisplay
