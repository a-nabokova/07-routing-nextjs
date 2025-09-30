
import "./globals.css";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import TanStackProvider from "../components/TanStackProvider/TanStackProvider";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body >
        <TanStackProvider> 
        <Header />
         
          {children}
           <div id="modal-root" />
          <Footer />
          </TanStackProvider>
      </body>
    </html>
  );
}