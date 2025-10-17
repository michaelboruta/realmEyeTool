import * as cheerio from 'cheerio'
import { Summary } from '../classes/Summary'

export async function getSummary(user:string) {
    
    // create request
    const url = `https://realmeye.com/player/${user}`
    const req = await fetch(url)
    const html = await req.text()
    
    // load html, if player not found return undefined, otherwise parse data
    const $ = cheerio.load(html)
    const playerNotFound = $('.player-not-found').html()
    if (playerNotFound) return undefined
    const tbody = $('.summary').find('tbody')
    const trows = tbody.find('tr')

    const summary = new Summary()
    summary.accountName = $('.entity-name').text()

    // summary
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

    //description
    const description = $('.description-line')
    description.each((i,e) => {
        summary.description.push($(e).text())
    })

    return summary

}