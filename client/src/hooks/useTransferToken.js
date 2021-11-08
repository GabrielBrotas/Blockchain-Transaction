import { useEthers, useContractFunction } from '@usedapp/core'
import Transfer from '../chain-info/contracts/Transfer.json'
import networkMapping from '../chain-info/deployments/map.json'
import { constants, utils } from 'ethers'
import { Contract } from '@ethersproject/contracts'
 
export const useTransferToken = () => {

    const { chainId, error } = useEthers()
    const { abi } = Transfer 

    const transferAddress = chainId ? networkMapping[String(chainId)]["Transfer"][0] : constants.AddressZero
    
    const transferInterface = new utils.Interface(abi)

    const transferContract = new Contract(transferAddress, transferInterface)

    const { send, state } = useContractFunction(transferContract, 'transferEther', {
        transactionName: "Sent eth",
    })

    // approve
    const handleSendEth = (_to, amountInWei) => {
        send(_to, {value: amountInWei}).then((res) => {
            console.log({res})
        }).catch(err => console.log({err}))
    }

    return {
        handleSendEth
    }
}