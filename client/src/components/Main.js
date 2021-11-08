import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useEthers, useTokenBalance, useEtherBalance } from "@usedapp/core"
import helperConfig from '../utils/helper-config.json'
import networkMapping from "../chain-info/deployments/map.json"
import { constants } from 'ethers'
import brownieConfig from "../brownie-config.json"
import { formatUnits } from "@ethersproject/units"
import { useTransferToken } from '../hooks/useTransferToken'
import { utils } from '@usedapp/core/node_modules/ethers'
import api from '../services/api'
import qs from 'query-string'
import crypto from 'crypto'

export const Main = () => {
    const router = useRouter()

    const [amount, setAmount] = useState(0)
    const { chainId, account } = useEthers()
    
    const networkName = chainId ? helperConfig[chainId] : "dev"
    
    // console.log(chainId, networkName) // 4 ,'rinkeby'
    
    const transferAddress = chainId ? networkMapping[String(chainId)]["Transfer"] : constants.AddressZero
    
    // const wethTokenAddress = chainId ? brownieConfig["networks"][networkName]["weth_token"] : constants.AddressZero
    
    // const supportedTokens = [
    //     {
    //         address: wethTokenAddress,
    //         name: "WETH"
    //     }
    // ]
    // console.log(wethTokenAddress)
    // const tokenBalance = useTokenBalance(wethTokenAddress, account)
    // const formatedTokenBalance = tokenBalance ? parseFloat(formatUnits(tokenBalance, 18)) : 0
    const etherBalance = useEtherBalance(account)

    // const { handleSendEth } = useTransferToken(wethTokenAddress)
    const { handleSendEth } = useTransferToken()

    const submit = () => {
        handleSendEth(
            '0xA10f23bFf599AE4ce7e73d39A4b4BCFf118b7A3f',
            utils.parseEther(amount).toString()
        )
    }

    // const loginWithCoinbase = async () => {
    //     const base = `https://www.coinbase.com/oauth/authorize?`

    //     const queryParams = {
    //       redirect_uri: 'http://localhost:3000',
    //       client_id: 'd31c49abd15e7fb0ba1d1a1f72e1a95850519751c59c270cd9ef63edc02566ff',
    //       client_secret: '36c241e26c0a39d08ed66a314ddd972efda6fdb233043a246958ee7e35466d51',
    //       response_type: 'code',
    //       scope: 'wallet:user:read,wallet:accounts:read,wallet:buys:create,wallet:deposits:read',
    //       state: crypto.randomBytes(20).toString('hex'),
    //     }
    //     const endpoint = base + qs.stringify(queryParams)
        
    //     router.push(endpoint)
    //     // fetch(endpoint)
    // }

    // const getToken = (code, state) => {
    //     const base = `https://api.coinbase.com/oauth/token?`
    //     const queryParams = {
    //         redirect_uri: 'http://localhost:3000',
    //         client_id: 'd31c49abd15e7fb0ba1d1a1f72e1a95850519751c59c270cd9ef63edc02566ff',
    //         client_secret: '36c241e26c0a39d08ed66a314ddd972efda6fdb233043a246958ee7e35466d51',
    //         grant_type: 'authorization_code',
    //         code: code,
    //     }

    //     const endpoint = base + qs.stringify(queryParams)
        
    //     console.log('heer')
    //     fetch(endpoint, {method: 'POST', headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer bb00ebe5cc0b84b7c50599723ee138fa8b4212b7cc276d449d809fb3c6370fcc'}}).then(res=>{
    //         console.log(res)
    //     })
    //     // router.push(endpoint)
    // }

    const getCoinbaseUser = async () => {
        const temporaryToken = 'd16564d9302460c5f8a00077a050b99bce841fed241a70ba1b85eebd266ac487'
        const response = await fetch(
            'https://api.coinbase.com/v2/user', 
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${temporaryToken}`,
                    "CB-VERSION": "2021-10-31"
                }
            }
        ).then(res => res.json())
        .catch(err => {
            console.log(err)
        })

        fetch(
            'https://api.coinbase.com/v2/payment-methods', 
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${temporaryToken}`,
                    "CB-VERSION": "2021-10-31"
                }
            }
        )
            .then(async res => console.log(await res.json()))
            .catch(err => {
                console.log(err)
            })
        console.log(response)
    }
    // useEffect(() => {
    //     // if(router.query?.code && router.query?.state) {
    //     //     getToken(router.query?.code, router.query?.state)
    //     // }
    //     getCoinbaseUser()
    // }, [router.query])
    

    const handleAction = () => {
        api.get('/accounts')
    }

    const handleActionEcommerce = async () => {
        const res = await api.get('/ecommerce')
        window.open(res.data.url, '', `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,
        width=0,height=0,left=-1000,top=-1000`)
    }
    return (
        <div>
            {/* {supportedTokens.map(token => (
                <p key={token.name}>{token.name}</p>
            ))} */}
            <div>
                <input onChange={e => setAmount(e.target.value)} />
                <button onClick={submit}>Transfer</button>
            </div>

            {/* <button onClick={handleAction}>action</button> */}
            <button onClick={handleActionEcommerce}>action ecommerce</button>
            {/* <button onClick={loginWithCoinbase}>Log with coinbase</button> */}
        </div>

    )
}