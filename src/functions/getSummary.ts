import * as cheerio from 'cheerio'
import { Summary } from '../classes/Summary'

export async function getSummary(user:string) {
    // create request
    const url = `https://realmeye.com/player/${user}`
    const req = await fetch(url)
    const html = await req.text()
    
    // load html and find trows
    const $ = cheerio.load(html)
    const tbody = $('.summary').find('tbody')
    const trows = tbody.find('tr')

    // create player summary
    const summary = new Summary()
    summary.accountName = $('.entity-name').text()
    trows.each((index, element) => {
        // exalts
        if (index === 2) {
            $(element).find('td').each((i, e) => {
                if (i === 1) summary.exalts = $(e).text()
            })
        }

        // fame
        if (index === 3) {
            $(element).find('td').each((i, e) => {
                if (i === 1) summary.fame = $(e).text()
            })
        }

        // account fame
        if (index === 5) {
            $(element).find('td').each((i, e) => {
                if (i === 1) summary.accountFame = ($(e).text().split(' '))[0]
            })
        }

        // guild
        if (index === 6) {
            $(element).find('td').each((i, e) => {
                if (i === 1) summary.guild = $(e).text().trim()
            })
        }
        
    })

    return summary

}