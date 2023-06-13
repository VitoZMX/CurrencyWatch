export type CurrencyType = {
    Cur_ID: number
    Cur_ParentID: number
    Cur_Code: string
    Cur_Abbreviation: string
    Cur_Name: string
    Cur_Name_Bel: string
    Cur_Name_Eng: string
    Cur_QuotName: string
    Cur_QuotName_Bel: string
    Cur_QuotName_Eng: string
    Cur_NameMulti: string
    Cur_Name_BelMulti: string
    Cur_Name_EngMulti: string
    Cur_Scale: number
    Cur_Periodicity: number
    Cur_DateStart: string
    Cur_DateEnd: string
}

export type RateType = {
    Cur_ID: number
    Date: string
    Cur_Abbreviation: string
    Cur_Scale: number
    Cur_Name: string
    Cur_OfficialRate: number
}

export type CurrencyRateChartType = {
    Cur_ID: number
    Date: string
    Cur_OfficialRate: number
}