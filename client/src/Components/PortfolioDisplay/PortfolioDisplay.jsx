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
    const [totalChange, setTotalChange] = useState("")
    const [totalValue, setTotalValue] = useState("")
    const [isUpdated, setIsUpdated] = useState(false)

    const retrievePortfolio = async () => {
        await Axios.get('http://localhost:3001/retrievePortfolio', {
        }).then((response) => {
            setData(response.data);
        });
    }

    const updatePortfolio = async () => {
        await Axios.get('http://localhost:3001/updatePortfolio', {
        }).then((response) => {
            setTotalChange(response.data.totalChange)
            setTotalValue(response.data.totalValue)
            console.log(response.data)
            setIsUpdated(true)
        });
    }

    useEffect(() => {
        updatePortfolio();
    }, [])

    useEffect(() => {
        retrievePortfolio();
    }, [isUpdated])

    useEffect(() => {
        console.log(data)
    }, [data]) 

    return(
        <div className='portfolios-page'>
            <Sidebar/>
            <TableContainer classname="data-table" component={Paper} style={{backgroundColor: 'white', 
                                                                            width: '65%', 
                                                                            maxHeight: '70%', 
                                                                            position: 'relative', 
                                                                            left: '18.5%', 
                                                                            top: '12%',
                                                                            borderColor: '#8F3F3F'}} 
                                                                            sx={{border: 3, borderRadius: '16px'}}>
                <Table style={{ width: 1200, margin: 'auto' }} sx={{ minWidth: '400px' }}>
                    <TableHead>
                    <TableRow>
                        <TableCell align="center" style={{color: '#8F3F3F', fontSize: "20px", fontWeight: "700"}}>Ticker</TableCell>
                        <TableCell align="center" style={{color: '#8F3F3F', fontSize: "20px", fontWeight: "700"}}>Company Name</TableCell>
                        <TableCell align="center" style={{color: '#8F3F3F', fontSize: "20px", fontWeight: "700"}}>Number of Shares</TableCell>
                        <TableCell align="center" style={{color: '#8F3F3F', fontSize: "20px", fontWeight: "700"}}>Price Bought &#40;$&#41;</TableCell>
                        <TableCell align="center" style={{color: '#8F3F3F', fontSize: "20px", fontWeight: "700"}}>Current Price &#40;$&#41;</TableCell>
                        <TableCell align="center" style={{color: '#8F3F3F', fontSize: "20px", fontWeight: "700"}}>Day's Change &#40;%&#41;</TableCell>
                        <TableCell align="center" style={{color: '#8F3F3F', fontSize: "20px", fontWeight: "700"}}>Total Change &#40;%&#41;</TableCell>
                        <TableCell align="center" style={{color: '#8F3F3F', fontSize: "20px", fontWeight: "700"}}>Total Value &#40;$&#41;</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {data.map((item) => (
                        <TableRow>
                            <TableCell align='center' width='12%'>{item.ticker}</TableCell>
                            <TableCell align="center" width='12%'>{item.stockname}</TableCell>
                            <TableCell align="center" width='12%'>{item.numshares}</TableCell>
                            <TableCell align="center" width='12%'>${item.pricebought}</TableCell>
                            <TableCell align="center" width='12%'>${item.currentprice}</TableCell>
                            <TableCell align="center" width='12%'>{item.daychange} %</TableCell>
                            <TableCell align="center" width='12%'>{item.totalchange} %</TableCell>
                            <TableCell align="center" width='12%'>${item.totalvalue}</TableCell>
                        </TableRow>
                    ))}
                    <TableRow>
                        <TableCell align="left" width='12%'>
                            <Link to='/addstock' style={{textDecoration: 'none'}}>
                                <button className='add-stock-button'> + Add Stock</button>
                            </Link>
                        </TableCell>
                        <TableCell align="center" width='12%'></TableCell>
                        <TableCell align="center" width='12%'></TableCell>
                        <TableCell align="center" width='12%'></TableCell>
                        <TableCell align="center" width='12%'></TableCell>
                        <TableCell align="center" width='12%'></TableCell>
                        {/*<TableCell align="center" width='12%'>${totalChange} %</TableCell>*/}
                        {/*<TableCell align='center' width='12%'>${totalValue} $</TableCell>*/}
                    </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default PortfolioDisplay
