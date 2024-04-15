import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar/Navbar";
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "WeBlog",
  description: "WeBlog",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}  >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystemdisableTransitionOnChange>
          <div className="grid  lg:grid-cols-12 lg:borderlg:gap-4  ">
            <div className="lg:col-span-12">
              <Navbar/>
            </div>
            <div className="lg:col-span-12 ">
              {children}
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
