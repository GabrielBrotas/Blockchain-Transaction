import coinbase from 'coinbase-commerce-node';

export default async function handler(req, res) {
    const Client = coinbase.Client;
    const Checkout = coinbase.resources.Checkout;
    const Charge = coinbase.resources.Charge;

    Client.init('665b8f3b-4dfd-4b31-af27-84a0f3a8a85a');
    

    // Try to create checkout via Checkout resource create method
    // Checkout.create({
    //     'description': 'Mastering the Transition to the Information Age',
    //     'local_price': {
    //         'amount': '1.00',
    //         'currency': 'USD'
    //     },
    //     'name': 'test item 15 edited',
    //     'pricing_type': 'fixed_price',
    //     'requested_info': ['email']
    // }, function (error, response) {
    //     console.log('Created checkout via create method');
    //     console.log(JSON.stringify(response, null, 2));
    //     console.log(error);

    //     if (response && response.id) {
    //         // Try to update created checkout
    //         Checkout.updateById(response.id, {'name': 'new name'}, function (error, response) {t
    //             console.log('Updated checkout with id ' + response.id);
    //             console.log(error);
    //             console.log(response);
    //         });
    //     }
    // });

    // ----------------
    // retrieve checkout
    // Checkout.retrieve(
    //     '6788b820-5530-4c75-a515-d440e3a8b7b0', 
    //     function (error, response) {
    //         console.log(error);
    //         console.log({response});
    //     })

    // Charge checkout
    const url = await new Promise(resolve => {
        Charge.create({
            description: "Testing pay the checkout",
            local_price: {
                amount: "2.00",
                currency: "USD"
            },
            pricing_type: 'fixed_price',
            name: 'test name',
            metadata: {
                name: "is me"
            }
        }, (error, response) => {
            console.log(error, response)
            if(!!response) {
                resolve(response.hosted_url)
            }
        })
    })


    res.status(200).json({url});
}