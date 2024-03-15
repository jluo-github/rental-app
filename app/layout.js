import { Inter } from "next/font/google";
import "@/assets/styles/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthProvider from "@/components/AuthProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Property Management System",
  description: "Property management system for real estate companies",
};

export default function RootLayout({ children }) {
  return (
    <AuthProvider>
      <html lang='en'>
        <body className='flex flex-col min-h-screen bg-violet-100'>
          <Navbar />
          <main>{children}</main>
          <Footer className='mt-auto' />
          <ToastContainer />
        </body>
      </html>
    </AuthProvider>
  );
}
