import React, {useEffect, useState} from 'react'
import {Preloader} from './common/Preloader'
import {CurrencyType, RateType} from '../types/types'
import Box from '@mui/material/Box'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import {currenciesAPI} from '../api/currenciesAPI'
import {CurrencyRateChart} from './CurrencyRateChart'

type CurrencyProps = {
    currency: CurrencyType[] | null;
}
type RowType = Record<keyof CurrencyType, string>;
type RowRateType = Record<keyof RateType, string>;

export function CurrenciesPage({currency}: CurrencyProps) {
    const [loading, setLoading] = useState(true)
    const [keyOneEl, setKeyOneEl] = useState<CurrencyType | {}>({})

    useEffect(() => {
        if (currency) {
            setKeyOneEl(currency[0])
        }
    }, [currency])

    useEffect(() => {
        if (keyOneEl) {
            setLoading(false)
        }
    }, [keyOneEl])

    function Row(props: { row: CurrencyType }) {
        const {row} = props
        const [open, setOpen] = React.useState(false)
        const [rateCurrency, setRateCurrency] = React.useState<RateType | null>(null)

        const fetchData = async (Cur_Code: string) => {
            const data = await currenciesAPI.getRateCurrency(Cur_Code)
            setRateCurrency(data)
        }

        const handleClick = () => {
            setOpen(!open)
            if (!open) {
                fetchData(row.Cur_Code)
            }
        }

        if (loading) {
            return <Preloader/>
        }

        return (
            <React.Fragment>
                <TableRow sx={{'& > *': {borderBottom: 'unset'}}}>
                    <TableCell>
                        <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() => handleClick()}
                        >
                            {open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                        </IconButton>
                    </TableCell>
                    {Object.keys(row).length > 0 &&
                        Object.keys(row).map((el, index) => (
                            <TableCell component="th" scope="row" key={`${el}${index}`}
                                       align="right">{row[el as keyof RowType]}</TableCell>
                        ))}
                </TableRow>
                <TableRow>
                    <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={8}>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <Box sx={{margin: 1}}>
                                <Typography variant="h6" gutterBottom component="div">
                                    More information
                                </Typography>
                                <Table size="small" aria-label="purchases">
                                    <TableHead>
                                        <TableRow>
                                            {rateCurrency &&
                                                Object.keys(rateCurrency).map((el) => (
                                                    <TableCell key={el}>
                                                        {el}
                                                    </TableCell>
                                                ))}

                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>

                                            {rateCurrency &&
                                                Object.keys(rateCurrency).map((el) => (
                                                    <TableCell scope="row"
                                                               key={el}>  {rateCurrency[el as keyof RowRateType]}  </TableCell>
                                                ))}

                                        </TableRow>
                                    </TableBody>
                                </Table>
                                <CurrencyRateChart id={row.Cur_ID}/>
                            </Box>
                        </Collapse>
                    </TableCell>
                </TableRow>
            </React.Fragment>
        )
    }

    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell/>
                        {Object.keys(keyOneEl).length > 0 &&
                            Object.keys(keyOneEl).map((el) => (
                                <TableCell align="right" key={el}>
                                    {el}
                                </TableCell>
                            ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {currency != null && currency.map((elem) => (
                        <Row key={elem.Cur_ID} row={elem}/>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}