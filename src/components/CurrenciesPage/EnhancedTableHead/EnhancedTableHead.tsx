import * as React from 'react'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableSortLabel from '@mui/material/TableSortLabel'
import Box from '@mui/material/Box'
import {visuallyHidden} from '@mui/utils'
import {EnhancedTableProps, HeadCellType} from '../../../types/types'

const headCells: readonly HeadCellType[] = [
    {
        id: 'name',
        numeric: false,
        disablePadding: false,
        label: 'Наименование иностранной валюты',
    },
    {
        id: 'code',
        numeric: true,
        disablePadding: false,
        label: 'Код валюты',
    },
    {
        id: 'ID',
        numeric: true,
        disablePadding: false,
        label: 'ID валюты',
    },
    {
        id: 'row3',
        numeric: true,
        disablePadding: false,
        label: 'Количество единиц и буквенный код валюты',
    },
    {
        id: 'row5',
        numeric: true,
        disablePadding: false,
        label: 'Дата исключения валюты из перечня валют',
    },
]

export function EnhancedTableHead(props: EnhancedTableProps) {
    const {onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort} = props

    const createSortHandler =
        (property: string) => (event: React.MouseEvent<unknown>) => {
            onRequestSort(event, property)
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