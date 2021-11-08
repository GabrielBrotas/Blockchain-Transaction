import '../styles/globals.css'
import { ChainId, DAppProvider } from '@usedapp/core'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <DAppProvider config={{
        // if we use ganache we need to pass the id 5777,...
        supportedChains: [ChainId.Rinkeby, ChainId.Kovan],
      }}>
        <Component {...pageProps} />
      </DAppProvider>
    </>
  ) 
}

export default MyApp
