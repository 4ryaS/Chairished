const { STRIPE_PKEY, STRIPE_SKEY } = process.env;

const stripe = require('stripe')(STRIPE_SKEY);

const renderBuyPage = async (res, req) => {

    try {
        res.render('buy', {
            key: STRIPE_PKEY,
            amount: 100
        });
    }
    catch {
        console.log(error.message);
    }

};
