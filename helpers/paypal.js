const paypal = require('@paypal/checkout-server-sdk');

const environment = new paypal.core.SandboxEnvironment('AfKSoGmI9jjqSEvtOPifp57x9XAyp27ZgIdJj1tBV8HfNNYFkUuqw5hBMagyzRXXP6NW4LKgsUDObV0D', 'EPFjLYpvyp1ZwYnPJe-tRxiPBKWzvf_XkScRj6VC_LfSY_YN_6If7q7DmMeSNleNWrcsBKKaulq70hJf');
const client = new paypal.core.PayPalHttpClient(environment);

module.exports = {client, paypal};


// const paypal = require('paypal-rest-sdk')

// paypal.configure({
//     mode:'sandbox',
//     client_id:"AfKSoGmI9jjqSEvtOPifp57x9XAyp27ZgIdJj1tBV8HfNNYFkUuqw5hBMagyzRXXP6NW4LKgsUDObV0D",
//     client_secret:"EPFjLYpvyp1ZwYnPJe-tRxiPBKWzvf_XkScRj6VC_LfSY_YN_6If7q7DmMeSNleNWrcsBKKaulq70hJf"
// })

// module.exports = paypal;