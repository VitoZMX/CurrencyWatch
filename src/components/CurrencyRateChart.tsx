import React, {useEffect, useState} from 'react'
import {CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis} from 'recharts'
import {currenciesAPI} from '../api/currenciesAPI'
import {CurrencyRateChartType} from '../types/types'
import Typography from '@mui/material/Typography'

type CurrencyRateChartPropsType = {
    id: number
    startDate: string
    endDate: string
}

export function CurrencyRateChart({id, startDate, endDate}: CurrencyRateChartPropsType) {
    const [currencyRateChart, setCurrencyRateChart] = React.useState<CurrencyRateChartType[] | null>(null)
    const [loading, setLoading] = useState(true)

    const fetchData = async (id: number, from: string, to: string) => {
        const data = await currenciesAPI.getRateCurrencyDynamics(id, from, to)

        setCurrencyRateChart(data)
        console.log(data)
    }

    /*useEffect(() => {
        let x = new Date()
        fetchData(id, new Date('1990-03-11T02:30:00.000').toISOString().split('T')[0], x.toISOString().split('T')[0])
        //fetchData(id, new Date('1990-03-11T02:30:00.000').toISOString().split('T')[0], x.toISOString().split('T')[0])
        // fetchData(id, new Date('2000-03-11T02:30:00.000').toISOString().split('T')[0], new Date('2010-03-11T02:30:00.000').toISOString().split('T')[0])
    }, [id])*/

    useEffect(() => {
        currenciesAPI.getRateCurrencyDynamics(id, new Date(startDate).toISOString(), new Date(endDate).toISOString())
            .then(res =>
                setCurrencyRateChart(res)
            ).then(() => setLoading(false))
    }, [id])

    if (loading) {
        return <div>Загрузка...</div>
    }

    return (
        <div>
            {currencyRateChart && currencyRateChart.length > 0 ? (
                <LineChart
                    width={570}
                    height={300}
                    data={currencyRateChart}
                    margin={{
                        top: 30,
                        right: 20,
                        left: 0,
                        bottom: 20
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="Date"/>
                    <YAxis/>
                    <Tooltip/>
                    <Legend/>
                    <Line
                        type="monotone"
                        dataKey="Cur_OfficialRate"
                        stroke="#8884d8"
                        activeDot={{r: 8}}
                    />
                </LineChart>
            ) : (<Typography variant="body1" style={{color: '#ee8c0c'}}>Данных по курсу на этот промежуток времени не
                найдено!</Typography>)}
        </div>
    )
}