import * as cheerio from 'cheerio'
import { ClassExaltations } from '../classes/ClassExaltations'

export async function getExaltations(user:string) {
    // create request
    const url = `https://realmeye.com/exaltations-of/${user}`
    const req = await fetch(url)
    const html = await req.text()
    
    // load html and find table
    const $ = cheerio.load(html)
    const table = $('table').last()
    const tbody = table.find('tbody')
    const trows = tbody.find('tr')

    const exaltations:ClassExaltations[] = []
    trows.each((i, e) => {
        const exalts = new ClassExaltations()
        // e is the table row. need to get the td's
        const tds = $(e).find('td')
        tds.each((i, e) => {
            switch (i) {
                // image
                case 0: {
                    break;
                }
                // class name
                case 1: {
                    const className = $(e).text()
                    exalts.class = className
                    break;
                }
                // class num exalts
                case 2: {
                    const numberExalts = $(e).text() 
                    exalts.numExalts = Number(numberExalts)
                    break;
                }
                // hp
                case 3: {
                    const hp = $(e).text()
                    if (hp) {
                        exalts.hp = Number(hp)
                        break;
                    }
                    break
                }
                // mp
                case 4: {
                    const mp = $(e).text()
                    if (mp) {
                        exalts.mp = Number(mp)
                        break;
                    }
                    break
                }
                // att
                case 5: {
                    const att = $(e).text()
                    if (att) {
                        exalts.att = Number(att)
                        break;
                    }
                    break
                }
                // def
                case 6: {
                    const def = $(e).text()
                    if (def) {
                        exalts.def = Number(def)
                        break;
                    }
                    break
                }
                // spd
                case 7: {
                    const spd = $(e).text()
                    if (spd) {
                        exalts.spd = Number(spd)
                        break;
                    }
                    break
                }
                // dex
                case 8: {
                    const dex = $(e).text()
                    if (dex) {
                        exalts.dex = Number(dex)
                        break;
                    }
                    break
                }
                // vit
                case 9: {
                    const vit = $(e).text()
                    if (vit) {
                        exalts.vit = Number(vit)
                        break;
                    }
                    break
                }
                // wis
                case 10: {
                    const wis = $(e).text()
                    if (wis) {
                        exalts.wis = Number(wis)
                        break;
                    }
                    break
                }
            }
            /**
             * 0 - class img
             * 1 - class name
             * 2 - num exalts for class
             * 3 - hp
             * 4 - mp
             * 5 - att
             * 6 - def
             * 7 - spd
             * 8 - dex
             * 9 - vit
             * 10 - wis
             */
            
        })
        exaltations.push(exalts)
    })

    return exaltations
    
}