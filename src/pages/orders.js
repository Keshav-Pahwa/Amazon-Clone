import { getSession, useSession } from 'next-auth/react'
import * as admin from 'firebase-admin'
import Header from '../components/Header'
import moment from 'moment'
import Order from '../components/Order'
import serviceAccount from '../../permissions.json'

const Orders = ({ orders, session }) => {
	return (
		<div>
			<Header />

			<main className='max-w-screen-lg mx-auto p-10'>
				<h1 className='text-3xl border-b-2 mb-2 pb-1 border-yellow-400'>
					Your Orders
				</h1>

				{session ? (
					<h2>{orders?.length} Orders</h2>
				) : (
					<h2>Please Sign In to See Your Orders!</h2>
				)}

				<div className='mt-5 space-y-4'>
					{orders?.map(
						({ id, amount, amountShipping, items, timestamp, images }) => (
							<Order
								key={id}
								id={id}
								amount={amount}
								amountShipping={amountShipping}
								items={items}
								timestamp={timestamp}
								images={images}
							/>
						)
					)}
				</div>
			</main>
		</div>
	)
}

export default Orders

export async function getServerSideProps(context) {
	const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

    // Get the user users logged in credentials
	const session = await getSession(context)

	if (!session) {
		return {
			props: {},
		}
	}

	const app = !admin.apps.length
		? admin.initializeApp({
				credential: admin.credential.cert(serviceAccount),
		  })
		: admin.app()

    // Firebase db
	const stripeOrders = await app
		.firestore()
		.collection('users')
		.doc(session.user.email)
		.collection('orders')
		.orderBy('timestamp', 'desc')
		.get()

    // Stripe orders
	const orders = await Promise.all(
		stripeOrders.docs.map(async (order) => ({
			id: order.id,
			amount: order.data().amount,
			amountShipping: order.data().amount_shipping,
			images: order.data().images,
			timestamp: moment(order.data().timestamp.toDate()).unix(),
			items: await stripe.checkout.sessions.listLineItems(order.id, {
				limit: 100,
			}),
		}))
	)

	return {
		props: { orders, session },
	}
}