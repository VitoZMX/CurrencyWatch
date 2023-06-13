import axios from 'axios'
import {CurrencyRateChartType, CurrencyType, RateType} from '../types/types'

export const instance = axios.create({
    baseURL: 'https://api.nbrb.by/exrates/',
})

export const currenciesAPI = {
    async getAllCurrencies() {
        return instance.get<CurrencyType[]>('currencies').then(res => res.data)
    },
    async getRateCurrency(Cur_Code: string) {
        return instance.get<RateType>(`rates/${Cur_Code}?parammode=1`).then(res => res.data)
    },
    async getRateCurrencyDynamics(ID: number) {
        return instance.get<CurrencyRateChartType[]>(`rates/Dynamics/${ID}?startDate=2021-07-01&endDate=2023-12-06`).then(res => res.data)
    }
}