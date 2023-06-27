import React, {useEffect, useState} from 'react'
import './App.css'
import {HashRouter, Navigate, Route, Routes} from 'react-router-dom'
import CssBaseline from '@mui/material/CssBaseline'
import {currenciesAPI} from './api/currenciesAPI'
import {Navbar} from './components/Navbar'
import {CurrencyType} from './types/types'
import {Preloader} from './components/common/Preloader'
import {CurrenciesPage} from './components/CurrenciesPage/CurrenciesPage'
import {createTheme, ThemeProvider} from '@mui/material/styles'

export function App() {
    const [fullCurrency, setFullCurrency] = useState<CurrencyType[]>([])
    const [loading, setLoading] = useState(true)

    const theme = createTheme({
        palette: {
            background: {
                default: '#e0e5ea'
            },
        },
    })

    useEffect(() => {
        currenciesAPI.getAllCurrencies().then(data =>
            setFullCurrency(data)
        ).then(() => {
            setLoading(false)
        })
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
                                    <Route path="/" element={<Navigate to={'/currencies'}/>}/>
                                </Routes>
                            </div>
                        </ThemeProvider>
                    </HashRouter>
                )}
        </div>
    )
}