import React, {useEffect, useState} from 'react'
import './App.css'
import {HashRouter, Route, Routes} from 'react-router-dom'
import CssBaseline from '@mui/material/CssBaseline'
import {currenciesAPI} from './api/currenciesAPI'
import {Navbar} from './components/Navbar'
import {CurrencyType} from './types/types'
import {CurrenciesPage} from './components/CurrenciesPage'
import {Preloader} from './components/common/Preloader'

export function App() {
    const [fullCurrency, setFullCurrency] = useState<CurrencyType[] | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            const data = await currenciesAPI.getAllCurrencies()
            setFullCurrency(data)
        }
        fetchData()
        setLoading(false)
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