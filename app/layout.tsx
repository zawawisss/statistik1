import "./globals.css";
import { NavbarComponent } from "../components/NavbarComponent";
import { FooterComponent } from "../components/FooterComponent";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>PC IPNU-IPPNU Ponorogo</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="min-h-screen bg-background flex flex-col">
        <NavbarComponent />
        <main className="container mx-auto px-4 py-8 flex-grow">{children}</main>
        <FooterComponent />
      </body>
    </html>
  );
}
