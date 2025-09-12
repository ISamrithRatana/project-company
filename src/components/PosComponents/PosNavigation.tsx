import Link from "next/link";

export default function POSPage() {
    return (
        <header className="bg-gray-800 text-white w-full text-center p-4 rounded ">
            <nav className="flex justify-between ml-3 mr-3 items-center">
            <h1 className="text-3xl font-bold">Welcome to Our Coffee Shop</h1>
                <ul className="flex space-x-7">
                <li><Link href="/" className="hover:text-yellow-300">Home</Link></li>
                <li><Link href="/" className="hover:text-yellow-300">Menu</Link></li>
                <li><Link href="/" className="hover:text-yellow-300">Contact</Link></li>
                <li><Link href="/" className="hover:text-yellow-300">Hashboard</Link></li>
                </ul>
                <Link href="/" className="hover:text-red-400">Close</Link>
            </nav>
        </header>
    );
}