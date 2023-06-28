import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Slide from '@mui/material/Slide'
import {TransitionProps} from '@mui/material/transitions'
import Typography from '@mui/material/Typography'
import {CurrencyRateChart} from './CurrencyRateChart'
import {DataCurrencyToSlidePageType} from '../types/types'

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />
})

type PageSlidePropsType = {
    title: string
    data: DataCurrencyToSlidePageType
    isOpen: Function
}

export function PageSlide(props: PageSlidePropsType) {
    const handleClose = () => {
        props.isOpen()
    }

    return (
        <div>
            <Dialog
                open={true}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="slide-page"
            >
                <DialogTitle>{props.title}{props.data.Cur_Name}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="slide-page">
                        {props.data.Cur_Name}
                    </DialogContentText>
                    <Typography variant="body1">ID валюты: {props.data.Cur_ID}</Typography>
                    <Typography variant="body1">Код валюты: {props.data.Cur_Code}</Typography>
                    <Typography variant="body1">Дата начала использования
                        валюты: {props.data.Cur_DateStart}</Typography>
                    <Typography variant="body1">Дата окончания использования
                        валюты: {props.data.Cur_DateEnd}</Typography>
                    <CurrencyRateChart id={props.data.Cur_ID} startDate={props.data.Cur_DateStart}
                                       endDate={props.data.Cur_DateEnd}/>
                </DialogContent>
                <DialogActions style={{display: 'flex', justifyContent: 'space-between'}}>
                    <Button variant="outlined" onClick={() => {
                    }}>Открыть страницу с данными о этой валюте</Button>
                    <Button onClick={handleClose}>OK</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}