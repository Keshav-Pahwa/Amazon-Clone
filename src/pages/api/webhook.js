import { buffer } from 'micro';
import * as admin from 'firebase-admin'


// secure a connection to firebase from the backend
const serviceAccount = require('../../../permissions.json');
const app = !admin.apps.length ? admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
}): admin.app();

console.log("Hello again")
//establish connection tp Stripe
const stripe = require ('stripe')(process.env.STRIPE_SECRET_KEY);

const endpointSecret = process.env.STRIPE_SIGNING_SECRET;

const fulfillOrder = async (session) => {
    console.log('Fulfilling order', session)

    return app.firestore()
    .collection("users")
    .doc(session.metadata.email)
    .collection("orders")
    .doc(session.id)
    .set({
        amount: session.amount_total / 100,
        amount_shipping: session.total_details.amount_shipping / 100,
        images: JSON.parse(session.metadata.images),
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
    })
    .then (() => {
        console.log(`SUCCESS: Order ${session.id} has been added to th DB`);
    })
    .catch(console.log);
}

export default async (req,res) => {
    if (req.method === 'POST'){
      const requestBuffer = await buffer(req);
      const payload = requestBuffer.toString();
      const sig = req.headers["stripe-signature"];

      let event;

      //verify that the event posted came from stripe
      try{
          event= stripe.webhooks.constructEvent(payload, sig, endpointSecret);
      }catch(err){
          console.log('ERROR', err.message)
          return res.status(400).send(`Webhook error: ${err.message}`);
      }

      //handle the checkout.session.completed event
      if(event.type === 'checkout.session.completed'){
          const session = event.data.object;

          //fullfill he orders
      return fulfillOrder(session)
      .then(() =>{
        return res.status(200);
      } )
      .catch((err) =>{ 
        return  res.status(400).send(`Webhook Error:${err.message}`);
        })
      }
    }

    
}

export const config={
    api:{
        bodyParser: false,
        externalResolver: true,
    }
}
