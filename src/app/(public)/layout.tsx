import Navigation from "@/components/NavigationComponents/app-nav";
import { DialogProvider } from "@/components/dialog-provider/DialogProvider";
import Footer from "@/components/app-footer";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <DialogProvider>
      <Navigation />
      {children}
      <Footer />
    </DialogProvider>
  );
}
