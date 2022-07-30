import Stripe from 'stripe';

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY) ;

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
        const params = {
            submit_type: 'pay',
            mode: 'payment',
            payment_method_types: ['card'],
            billing_address_collection: 'auto',
            shipping_options: [
                {shipping_rate: 'shr_1LPtsRBeTd2p1bHQqmA0NCQc'},
                {shipping_rate: 'shr_1LPtu0BeTd2p1bHQFo5sUu1m'}
            ],

            line_items: req.body.map((item) => {
              const img = item.image[0].asset._ref;
              const newImage = img
                .replace('image-', 'https://cdn.sanity.io/images/fhsjxofj/production/')
                .replace('-webp', '.webp') //replace only if it exists
                .replace('-png', '.png') //replace only if it exists
                .replace('-jgp', '.jpg') //replace only if it exists
                .replace('-jpeg', '.jpeg'); //replace only if it exists

              return {
                price_data: {
                  currency: 'brl',
                  product_data: {
                    name: item.name,
                    images: [newImage]
                  },
                  unity_amount: item.price * 100, //because the unit amount has to be in cents
                },
                ajustable_quantity: {
                  enabled: true,
                  minimum: 1,
                },
                quantity: item.quantity,
              }
            }),
            success_url: `${req.headers.origin}/?success`,
            cancel_url: `${req.headers.origin}/?canceled`,
          }
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create(params);

      res.redirect(200).json(session);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}

// import Stripe from 'Stripe';
 
// const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

// export default async function handler(req, res){
//     if(req.method === 'POST'){
//         try {
            
//         } catch (error) {
//             res.status(500).json({ statusCode: 500, message: error.message})
//         }
//     }
// }