import React, {useEffect, useState} from 'react'
import './App.css'
import {HashRouter, Route, Routes} from 'react-router-dom'
import CssBaseline from '@mui/material/CssBaseline'
import {currenciesAPI} from './api/currenciesAPI'
import {Navbar} from './components/Navbar'
import {CurrencyType} from './types/types'
import {Preloader} from './components/common/Preloader'
import {CurrenciesPage} from './components/CurrenciesPage/CurrenciesPage'

export function App() {
    const [fullCurrency, setFullCurrency] = useState<CurrencyType[]>([])
    const [loading, setLoading] = useState(true)

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
                        <CssBaseline/>
                        <div>
                            <Navbar/>
                            <Routes>
                                <Route path="/*" element={<CurrenciesPage currency={fullCurrency}/>}/>
                            </Routes>
                        </div>
                    </HashRouter>
                )}
        </div>
    )
}