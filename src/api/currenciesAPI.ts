import axios from 'axios'
import {  CurrencyRateChartType, RateType} from '../types/types'

const url = 'https://api.nbrb.by/exrates/'
export const instance = axios.create({
    baseURL: url,
})

export const currenciesAPI = {
    async getAllCurrencies() {
        return fetch(`${url}currencies`)
            .then(response => response.json())
    },
    async getAllCurrenciesRateDaily() {
        return instance.get<RateType[]>('rates?periodicity=0').then(res => res.data)
    },
    async getAllCurrenciesRateMonth() {
        return instance.get<RateType[]>('rates?periodicity=1').then(res => res.data)
    },
    async getRatesCurrency(Cur_ID: number) {
        return instance.get<RateType>(`rates/${Cur_ID}`).then(res => res.data)
    },
    async getRateCurrencyDynamics(ID: number, from: string, to: string) {
        return instance.get<CurrencyRateChartType[]>(`rates/Dynamics/${ID}?startDate=${from}&endDate=${to}`).then(response => {
            const data = response.data
            data.forEach((item) => {
                item.Date = item.Date.split('T')[0]
            })
            return data
        })
    }
}