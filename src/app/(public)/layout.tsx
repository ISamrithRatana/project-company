import Navigation from "@/components/NavigationComponents/AppNavigation";
import { DialogProvider } from "@/components/DialogProvider/DialogProvider";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <DialogProvider>
      <Navigation />
      {children}
    </DialogProvider>
  );
}
