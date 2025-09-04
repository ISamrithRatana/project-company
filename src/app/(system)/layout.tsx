import POSPage from "@/components/PosComponents/PosNavigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <POSPage />
      {children}
    </div>
  );
}
