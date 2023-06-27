import * as React from 'react'
import {useState} from 'react'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import {Container} from '@material-ui/core'
import {CurrencyProps, CurrencyType, DataCurrencyToSlidePageType, Order} from '../../types/types'
import {EnhancedTableHead} from './EnhancedTableHead/EnhancedTableHead'
import {PageSlide} from '../PageSlide'

function descendingComparator<T extends Record<Key, number | string>, Key extends keyof any>(a: T, b: T, orderBy: Key,) {
    if (b[orderBy] < a[orderBy]) {
        return -1
    }
    if (b[orderBy] > a[orderBy]) {
        return 1
    }
    return 0
}

function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key,
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy)
}

function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number])
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0])
        if (order !== 0) {
            return order
        }
        return a[1] - b[1]
    })
    return stabilizedThis.map((el) => el[0]) as T[]
}

export function CurrenciesPage({currency}: CurrencyProps) {
    const [showPageSlideData, setShowPageSlideData] = useState(false)
    const [order, setOrder] = useState<Order>('asc')
    const [orderBy, setOrderBy] = useState<keyof CurrencyType>('Cur_Name')
    const [selected, setSelected] = useState<readonly string[]>([])
    const [page, setPage] = useState(0)
    const [dense, setDense] = useState(false)
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const [dataCurrency, setDataCurrency] = useState<DataCurrencyToSlidePageType | null>(null)

    const handleRequestSort = (property: keyof CurrencyType) => {
        const isAsc = orderBy === property && order === 'asc'
        setOrder(isAsc ? 'desc' : 'asc')
        setOrderBy(property)
    }

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage)
    }

    const isOpenSlidePage = () => {
        setShowPageSlideData(!showPageSlideData)
    }

    const handleClick = (code: string, id: number, name: string, start: string, end: string) => {
        setDataCurrency({
            Cur_ID: id,
            Cur_Code: code,
            Cur_Name: name,
            Cur_DateStart: start,
            Cur_DateEnd: end
        })
        if (dataCurrency) {
            isOpenSlidePage()
        }
    }

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }

    const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDense(event.target.checked)
    }

    const isSelected = (name: string) => selected.indexOf(name) !== -1

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - currency.length) : 0

    const visibleRows = React.useMemo(
        () => stableSort(currency, getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
        [currency, order, orderBy, page, rowsPerPage],
    )

    return (
        <Container>
            {!showPageSlideData && dataCurrency &&
                <PageSlide title={`Информация о валюте: `} data={dataCurrency} isOpen={isOpenSlidePage}/>}
            <Box sx={{width: '100%'}}>
                <Paper sx={{width: '100%', mb: 2}}>
                    <TableContainer>
                        <Table
                            sx={{minWidth: 750}}
                            aria-labelledby="tableTitle"
                            size={dense ? 'small' : 'medium'}
                        >
                            <EnhancedTableHead
                                numSelected={selected.length}
                                order={order}
                                orderBy={orderBy}
                                onRequestSort={handleRequestSort}
                                rowCount={currency.length}
                            />
                            <TableBody>
                                {visibleRows.map((row, index) => {
                                    const isItemSelected = isSelected(row.Cur_Name)
                                    const labelId = `enhanced-table-checkbox-${index}`
                                    const dateEnd = new Date(row.Cur_DateEnd).toISOString().split('T')[0]
                                    const dateStart = new Date(row.Cur_DateStart).toISOString().split('T')[0]

                                    return (
                                        <TableRow
                                            hover
                                            onClick={() => handleClick(row.Cur_Code, row.Cur_ID, row.Cur_Name, dateStart, dateEnd)}
                                            role="button"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={`${row.Cur_Name}${row.Cur_ID}`}
                                            sx={{cursor: 'pointer'}}
                                        >
                                            <TableCell
                                                component="th"
                                                id={labelId}
                                                scope="row"
                                            >
                                                {row.Cur_Name}
                                            </TableCell>
                                            <TableCell align="right">{row.Cur_Code}</TableCell>
                                            <TableCell align="right">{row.Cur_ID}</TableCell>
                                            <TableCell align="right">{row.Cur_QuotName}</TableCell>
                                            <TableCell align="right">{dateEnd}</TableCell>
                                        </TableRow>
                                    )
                                })}
                                {emptyRows > 0 && (
                                    <TableRow
                                        style={{
                                            height: (dense ? 33 : 53) * emptyRows,
                                        }}
                                    >
                                        <TableCell colSpan={6}/>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25, 35, 50, currency.length]}
                        component="div"
                        count={currency.length}
                        rowsPerPage={rowsPerPage}
                        labelRowsPerPage="Число строк:"
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
                <FormControlLabel control={<Switch checked={dense} onChange={handleChangeDense}/>} label="Compact"/>
            </Box>
        </Container>
    )
}