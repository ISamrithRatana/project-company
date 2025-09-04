export default function POSPage() {
    return (
        <header className="bg-gray-800 text-white w-full text-center p-4 rounded ">
            <nav className="flex justify-between ml-3 mr-3 items-center">
            <h1 className="text-3xl font-bold">Welcome to Our Coffee Shop</h1>
                <ul className="flex space-x-7">
                <li><a href="/" className="hover:text-yellow-300">Home</a></li>
                <li><a href="/" className="hover:text-yellow-300">Menu</a></li>
                <li><a href="/" className="hover:text-yellow-300">Contact</a></li>
                <li><a href="/" className="hover:text-yellow-300">Hashboard</a></li>
                </ul>
                <a href="/" className="hover:text-red-400">Close</a>
            </nav>
        </header>
    );
}