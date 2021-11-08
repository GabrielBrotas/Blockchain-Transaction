import coinbase from 'coinbase';

const client = new coinbase.Client({
    'apiKey': 'DkNtHnwPf7FIxw2W', 
    'apiSecret': '2HHYUm7M3QZZKgCPaqC1GzaUjEbOe8Uv',
    strictSSL: false,

});

const oAuthClient = new coinbase.Client({'accessToken': '50d617d66c644abdbcbd309ba0c76e0bcfa05297f3413f28e19d051cd7e647a2'});

export default function handler(req, res) {

    // client.getAccounts({}, (err, accounts) => {
    //     accounts.forEach( (acct) => {
    //       console.log(`ID = ${acct.id} ; my bal: ${acct.balance.amount} for ${acct.name}`);
    //     });
    // });

    client.getAccount('f4b0e5be-af66-5d23-9af8-e6ae1c6e760a', (err, account) => {
        // account.requestMoney({
        //     'to': 'email@example.com',
        //     'amount': '1',
        //     'currency': 'BTC'
        // }, (err, tx) => {
        //   console.log({err, tx});
        // });
        // ----------

        // client.getBuyPrice({'currencyPair': 'ETH-USD'}, function(err, obj) {
        //     console.log(JSON.stringify(obj, null, 2));
        //   });
        // "data": {
        //     "base": "ETH",
        //     "currency": "USD",
        //     "amount": "4235.58"
        //   }

        // ----------
        account.buy({
            currency: 'BTC',
            amount: {
                amount: '1.00000000',
                currency: 'BTC'
            },
            payment_method: "61ccfddd-13b3-5d0d-981b-785333ce0950"

        }, (err, tx) => {
            console.log({err, tx})
        })
    });

    res.status(200).send('ok');
}
  

// ID = f4b0e5be-af66-5d23-9af8-e6ae1c6e760a ; my bal: 0.00000000 for GRT Wallet
// ID = 52628db7-fb97-5421-aebf-dcff9adc9824 ; my bal: 0.00000000 for TRAC Wallet
// ID = 7779b506-0af3-5697-8cdd-68fce7cd1743 ; my bal: 0.00000000 for CGLD Wallet
// ID = 827019c3-7e1b-5930-86f7-4f27ea9fc7c0 ; my bal: 0.000000 for XTZ Wallet
// ID = 455f88dd-32e1-5456-aa3c-d1d1fdf4b258 ; my bal: 0.00000000 for FIL Wallet
// ID = fc683f67-1cd5-5db3-9a1d-6c8f7fb22269 ; my bal: 0.00000000 for LRC Wallet
// ID = c8dfb785-9fa5-5668-970b-4e46db7b92c1 ; my bal: 0.000000000 for RLC Wallet
// ID = a2926297-f6c3-597e-b878-d26057735297 ; my bal: 0.00000000 for YFI Wallet
// ID = 2112beed-7504-516d-83ae-eb79aca9567e ; my bal: 0.00000000 for COMP Wallet
// ID = d533ca50-e16a-558c-9d1a-ff6812927905 ; my bal: 0.00000000 for KRL Wallet
// ID = 1476e936-b3a8-51a5-8e08-69d740bcb39c ; my bal: 0.0000 for EOS Wallet
// ID = 9bcb80f2-6d69-5a9b-9553-5f0fc174292d ; my bal: 0.00000000 for RARI Wallet
// ID = cfdf29dc-3ed7-59f9-99af-f7dd70b20831 ; my bal: 0.00000000 for QNT Wallet
// ID = f121613b-a581-5d49-9e80-289687cfe779 ; my bal: 0.00000000 for TRB Wallet
// ID = c98a8b87-3b42-5ea7-b70f-a242ceab6da6 ; my bal: 0.00000000 for YFII Wallet
// ID = f71a76de-f105-5a50-8ed2-573676a405fe ; my bal: 0.00000000 for BTRST Wallet
// ID = 1ed0288c-f5f8-5c7a-a25d-21d844aa33c9 ; my bal: 0.00000000 for RGT Wallet
// ID = 57892c21-bee2-5868-a265-299404fe6693 ; my bal: 0.0000000000 for DOT Wallet
// ID = 121a88d1-118d-5296-a9a3-dc5c4bc9c22b ; my bal: 0.00000000 for MIR Wallet
// ID = 526a768c-05dd-51f2-85ea-acc04281ce60 ; my bal: 0.00000000 for LINK Wallet
// ID = 08db917c-67c1-5181-8dc2-8575abcb61c3 ; my bal: 0.00000000 for BAND Wallet
// ID = 65b1ddea-9445-51cb-a5d9-8c7a9c43cd7d ; my bal: 0.00000000 for PAX Wallet
// ID = deefeb0f-5de5-53f5-bf28-425b693ea4e9 ; my bal: 0.00000000 for REPV2 Wallet
// ID = 6dfc0cc9-9f1d-5970-9397-4eab0df42d2b ; my bal: 0.00000000 for AGLD Wallet