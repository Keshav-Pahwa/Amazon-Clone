import Head from "next/head";
import { useState, useEffect } from "react";
import Header from "../components/Header";
import Banner from "../components/Banner";
import ProductFeed from "../components/ProductFeed";
import LoadingSign from "../components/LoadingSign";

export default function Home({products}) {
	const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulating a delay of 2 seconds for demonstration purposes
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);
	return (
		<div>
		{isLoading ? (
			<LoadingSign />
        ) : (
			<div>
			<Head>
				<title>Amazon 2.0</title>
			</Head>
			
			{/* Header */}
			<Header />

			<main className='max-w-screen-2xl mx-auto'>

			{/* Banner */}
			<Banner />

			{/* Product Feed */}
			<ProductFeed products = {products}/>
			</main>
			</div>
        )}
      
			
		</div>
	);
}

export async function  getServerSideProps(context) {
	// const session = await getSession(context);
	const products = await fetch("https://fakestoreapi.com/products").then(
		(res) => res.json()
	);

	return {
		props: {
			products, 
			// session, 
		},
	}
}


// https://fakestoreapi.com/products