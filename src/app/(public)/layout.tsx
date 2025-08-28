import Navigation from "@/components/Navigation/AppNavigation";
import { DialogProvider } from "@/components/dialogProvider/DialogProvider";


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
