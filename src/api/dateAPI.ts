export async function getCurrentDate(): Promise<string> {
    const response = await fetch('https://www.googleapis.com/oauth2/v1/certs')
    const json = await response.json()
    const timestamp = json['certs'][0]['time']
    const date = new Date(timestamp * 1000)
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`
}