import qs from 'query-string'
import crypto from 'crypto'

export default function handler(req, res) {
  console.log(req)
  const base = `https://www.coinbase.com/oauth/authorize?`

  const queryParams = {
    redirect_uri: 'http://localhost:3000',
    client_id: 'd31c49abd15e7fb0ba1d1a1f72e1a95850519751c59c270cd9ef63edc02566ff',
    client_secret: '36c241e26c0a39d08ed66a314ddd972efda6fdb233043a246958ee7e35466d51',
    response_type: 'code',
    scope: 'wallet:user:read,wallet:accounts:read,wallet:buys:create,wallet:deposits:read',
    state: crypto.randomBytes(20).toString('hex'),
  }
  
  const endpoint = base + qs.stringify(queryParams)

  console.log(endpoint)
  res.redirect(endpoint)
}
