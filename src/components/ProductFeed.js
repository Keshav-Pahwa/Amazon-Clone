import Product from "./Product";

function ProductFeed({ products }) {
	return (
		<div className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-52 mx-auto bg-gray-100">
			{products
			.slice(0,4)
			.map(
				({
					id,
					title,
					price,
					description,
					category,
					image,
				}) => (
					// <div className = "hover:scale-105 transition-transform">yarn run dev
					<Product
						key={id}
						id={id}
						title={title}
						price={price}
						description={description}
						category={category}
						image={image}
						// className = "hover:scale-105 transition-transform"
					/>
					// </div>
				)
			)}

			<img className="md:col-span-full" src='https://links.papareact.com/dyz'
				alt='' />

			<div className='md:col-span-2'>
				{products
					.slice(4, 5)
					.map(({ id, title, price, description, category, image }) => (
						<Product
							key={id}
							id={id}
							title={title}
							price={price}
							description={description}
							category={category}
							image={image}
						/>
					))}
			</div>
			{products
				.slice(5, products.length)
				.map(({ id, title, price, description, category, image }) => (
					<Product
						key={id}
						id={id}
						title={title}
						price={price}
						description={description}
						category={category}
						image={image}
					/>
				))}
		</div>
	);
}

export default ProductFeed;
