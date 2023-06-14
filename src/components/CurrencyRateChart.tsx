import React, {useEffect} from 'react'
import {CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis} from 'recharts'
import {currenciesAPI} from '../api/currenciesAPI'
import {CurrencyRateChartType} from '../types/types'
import {Preloader} from './common/Preloader'

type CurrencyRateChartPropsType = {
    id: number
}

export function CurrencyRateChart({id}: CurrencyRateChartPropsType) {
    const [currencyRateChart, setCurrencyRateChart] = React.useState<CurrencyRateChartType[] | null>(null)

    const fetchData = async (id: number, from: string, to: string) => {
        const data = await currenciesAPI.getRateCurrencyDynamics(id, from, to)

        setCurrencyRateChart(data)
        console.log(data)
    }

    useEffect(() => {
        let x = new Date()
        fetchData(id, new Date('1990-03-11T02:30:00.000').toISOString().split('T')[0], x.toISOString().split('T')[0])
        // fetchData(id, new Date('2000-03-11T02:30:00.000').toISOString().split('T')[0], new Date('2010-03-11T02:30:00.000').toISOString().split('T')[0])
    }, [id])

    return (
        <div>
            {currencyRateChart ? (
                <LineChart
                    width={700}
                    height={300}
                    data={currencyRateChart}
                    margin={{
                        top: 30,
                        right: 30,
                        left: 20,
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
            ) : (<Preloader key={'preloader'}/>)}
        </div>
    )
}