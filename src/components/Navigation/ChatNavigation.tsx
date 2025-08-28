import Link from "next/link";

export default function Navigation() {
    return (
        // The main sidebar container. It's fixed, has a collapsed width by default,
        // and expands to a wider width on hover. The 'group' class is used
        // for targeting child elements on hover.
        <aside className="group w-16 hover:w-64 bg-gray-800 text-gray-300 p-4 fixed h-screen top-0 overflow-none hidden md:block transition-all duration-300">
            <nav className="space-y-4">
                {/* The navigation title, visible only on hover for the expanded state. */}
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Navigation
                </h3>
                {/* List of navigation links. The text for each link is also hidden until hover. */}
                <ul className="space-y-2">
                    <li>
                        <Link href="#" className="flex items-center p-2 rounded-lg hover:bg-gray-700 hover:text-white transition-colors duration-300">
                            {/* Placeholder for an icon, if you decide to add one. */}
                            <span className="w-8 h-8 rounded-full bg-gray-700"></span>
                            <span className="ml-3 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">Dashboard</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="#" className="flex items-center p-2 rounded-lg hover:bg-gray-700 hover:text-white transition-colors duration-300">
                            <span className="w-8 h-8 rounded-full bg-gray-700"></span>
                            <span className="ml-3 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">Analytics</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="#" className="flex items-center p-2 rounded-lg hover:bg-gray-700 hover:text-white transition-colors duration-300">
                            <span className="w-8 h-8 rounded-full bg-gray-700"></span>
                            <span className="ml-3 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">Settings</span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </aside>
    );
};
