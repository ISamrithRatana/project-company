import Navigation from "@/components/NavigationComponents/app-nav";

// This is the layout for the News and Posts page
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
      <main>
        <div className="container mx-auto p-6 md:p-12">
            <Navigation />
          {children}
        </div>
      </main>
  );
}
