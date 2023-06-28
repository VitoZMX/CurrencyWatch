import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import {RateType} from '../types/types'
import {Container} from '@material-ui/core'

type RatePagePropsType = {
    dataRate: RateType[]
}

export const RatePage: React.FC<RatePagePropsType> = ({dataRate}) => {
    return (
        <Container style={{marginBottom: '30px'}}>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} size={'small'} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Наименование иностранной валюты</TableCell>
                            <TableCell align="right">Количество единиц иностранной валюты, буквенный код
                                валюты</TableCell>
                            <TableCell align="right">Официальный курс</TableCell>
                            <TableCell align="right">Дата курса</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dataRate.map((row) => {
                            const date = row.Date.split('T')[0]

                            return (
                                <TableRow
                                    hover
                                    key={row.Cur_ID}
                                    sx={{'&:last-child td, &:last-child th': {border: 0}, cursor: 'pointer'}}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.Cur_Name}
                                    </TableCell>
                                    <TableCell align="right">{row.Cur_Scale} {row.Cur_Abbreviation}</TableCell>
                                    <TableCell align="right">{row.Cur_OfficialRate} BYN</TableCell>
                                    <TableCell align="right">{date}</TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    )
}