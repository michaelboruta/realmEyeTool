#!/usr/local/bin/ts-node-dev index.ts
import http from 'http'
import { getSummary } from './functions/getSummary'
import { getExaltations } from './functions/getExaltations'

// TODO handle player not found
const server = http.createServer(async (req, res) => {
    const reqUrlObj = req.url?.split('=')
    if (!reqUrlObj) { res.end('error. invalid req url'); return }
    
    const reqUrl = reqUrlObj[0]
    const user = reqUrlObj[1]

    if (!user || !reqUrl) { res.end('error. cant find route or username'); return }

    switch(reqUrl) {
        case '/summary': {
            const summary = await getSummary(user)
            res.end(JSON.stringify(summary))
        }
        case '/exaltations': {
            const exaltations = await getExaltations(user)
            res.end(JSON.stringify(exaltations))
        }
    }
})

server.listen(42069, '10.0.0.157')