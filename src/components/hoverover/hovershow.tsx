"use client";

export default function HoverShow({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <div className="group relative">
            {children}
            <div className="absolute inset-0 bg-gray-200 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
        </div>
    );
}
