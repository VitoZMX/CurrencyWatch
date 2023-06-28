import * as React from 'react'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableSortLabel from '@mui/material/TableSortLabel'
import Box from '@mui/material/Box'
import {visuallyHidden} from '@mui/utils'
import {CurrencyType, EnhancedTableProps, HeadCellType} from '../../../types/types'

const headCells: readonly HeadCellType[] = [
    {
        id: 'Cur_Name',
        numeric: false,
        disablePadding: false,
        label: 'Наименование валюты',
    },
    {
        id: 'Cur_Code',
        numeric: true,
        disablePadding: false,
        label: 'Код валюты',
    },
    {
        id: 'Cur_ID',
        numeric: true,
        disablePadding: false,
        label: 'ID валюты',
    },
    {
        id: 'Cur_QuotName',
        numeric: true,
        disablePadding: false,
        label: 'Количество единиц и буквенный код валюты',
    },
    {
        id: 'Cur_DateEnd',
        numeric: true,
        disablePadding: false,
        label: 'Дата исключения валюты из перечня',
    },
]

export function EnhancedTableHead(props: EnhancedTableProps) {
    const {onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort} = props

    const createSortHandler = (property: keyof CurrencyType) => (event: React.MouseEvent<unknown>) => {
        onRequestSort(property)
    }

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    )
}