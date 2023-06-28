import React, {useEffect, useState} from 'react'
import './App.css'
import {HashRouter, Navigate, Route, Routes} from 'react-router-dom'
import CssBaseline from '@mui/material/CssBaseline'
import {currenciesAPI} from './api/currenciesAPI'
import {Navbar} from './components/Navbar'
import {CurrencyType, RateType} from './types/types'
import {Preloader} from './components/common/Preloader'
import {CurrenciesPage} from './components/CurrenciesPage/CurrenciesPage'
import {createTheme, ThemeProvider} from '@mui/material/styles'
import {RatePage} from './components/RatePage'

export function App() {
    const [fullCurrency, setFullCurrency] = useState<CurrencyType[]>([])
    const [rateDay, setRateDay] = useState<RateType[]>([])
    const [rateMoth, setRateMoth] = useState<RateType[]>([])
    const [loading, setLoading] = useState(true)

    const colorsTheme: string[] = ['#8884d8', '#eff0ee', '#7fc2db', '#248ab8', '#01314b']

    const theme = createTheme({
        palette: {
            primary: {
                main: '#248ab8',
            },
            background: {
                default: '#e0e5ea',
            }
        },
        components: {
            MuiAppBar: {
                styleOverrides: {
                    root: {
                        backgroundColor: '#01314b', // замените на ваш желаемый цвет фона AppBar
                    },
                },
            },
        },
    })

    useEffect(() => {
        currenciesAPI.getAllCurrencies().then(data =>
            setFullCurrency(data)
        ).then(() =>
            currenciesAPI.getAllCurrenciesRateDaily().then(data =>
                setRateDay(data))
        ).then(() =>
            currenciesAPI.getAllCurrenciesRateMonth().then(data =>
                setRateMoth(data))
        ).then(() => setLoading(false))
    }, [])

    return (
        <div>
            {loading ?
                (
                    <Preloader/>
                )
                :
                (
                    <HashRouter>
                        <ThemeProvider theme={theme}>
                            <CssBaseline/>
                            <div>
                                <Navbar/>
                                <Routes>
                                    <Route path="/currencies" element={<CurrenciesPage currency={fullCurrency}/>}/>
                                    <Route path="/day" element={<RatePage dataRate={rateDay}/>}/>
                                    <Route path="/month" element={<RatePage dataRate={rateMoth}/>}/>
                                    <Route path="/*" element={<Navigate to={'/currencies'}/>}/>
                                </Routes>
                            </div>
                        </ThemeProvider>
                    </HashRouter>
                )}
        </div>
    )
}