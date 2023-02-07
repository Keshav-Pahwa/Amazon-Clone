import Image from "next/image";
import {
	MenuIcon,
	SearchIcon,
	ShoppingCartIcon,
} from "@heroicons/react/outline";

function Header() {
	return (
		<header>
			{/* Top Nav */}
			<div className="flex items-center bg-amazon_blue px-1 py-2 flex-grow">
				<div className="mt-2 flex items-center flex-grow sm:flex-grow-0">
					<Image
						onClick={() => router.push("/")}
						src="https://links.papareact.com/f90"
						width={150}
						height={40}
						objectFit="contain"
						className="cursor-pointer"
					/>
				</div>

				{/* Search */}
				<div className="hidden sm:flex items-center h-10 rounded-md flex-grow cursor-pointer bg-yellow-400 hover:bg-yellow-500">
					<input
						type="text"
						className="p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none px-4"
					/>
					<SearchIcon className="h-12 p-4" />
				</div>
			</div>
			{/* Bottom Nav */}
			<div></div>
		</header>
	);
}

export default Header;
