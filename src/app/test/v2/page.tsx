"use client";
import React from "react";
import Placeholder from "@/components/HomeComponents/Placeholder";

const pageContent: Record<string, React.ReactNode> = {
  null: <Placeholder title="404 - Not Found" text="The page you are looking for does not exist." />,
  home: <Placeholder title="Welcome Home" text="This is the home page." />,
  about: <Placeholder title="About Us" text="Learn more about us on this page." />,
  contact: <Placeholder title="Contact Us" text="Get in touch with us through this page." />,
};

export default function App() {
  const [page, setPage] = React.useState("null");

  return (
    <div >
      <nav className="space-x-4 p-4 bg-gray-200">
        <button onClick={() => setPage("home")}>Home</button>
        <button onClick={() => setPage("about")}>About</button>
        <button onClick={() => setPage("contact")}>Contact</button>
      </nav>
      <main>{pageContent[page]}</main>
    </div>
  );
}
