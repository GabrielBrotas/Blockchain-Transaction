import { useEthers } from "@usedapp/core"

export const Header = () => {
    const { account, activateBrowserWallet, deactivate } = useEthers()

    const isConnected = !!account
    console.log({account})
    return <div>
        {isConnected 
            ? <button onClick={deactivate}>Desativar</button> 
            : <button onClick={() => activateBrowserWallet()}>Ativar</button>}
    </div>
}