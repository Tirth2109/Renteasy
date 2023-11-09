import Navbar from "@/components/navbar/Navbar";
import "./globals.css";
import { Nunito } from "next/font/google";
import ClientOnly from "@/components/ClientOnly";
import RegisterModal from "@/components/modals/RegisterModal";
import ToasterProvider from "./Providers/ToasterProvider";
import LoginModal from "@/components/modals/LoginModal";
import { getCurrentUser } from "./actions/getCurrentUser";
import RentModal from "@/components/modals/RentModal";
import SearchModal from "@/components/modals/SerchModal";
import useGetLocation from "./hooks/getLocation";
import LocationComponent from "@/components/getLoc";


export const metadata = {
  title: "RentEasy",
  description: "RentEasy - Rent with Ease",
};
const font = Nunito({
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  
  return (
    
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider  />
          <SearchModal />
          {/* <LocationComponent /> */}
          <RentModal />
          < LoginModal />
          <RegisterModal />
          <Navbar currentUser = {currentUser}/>
        </ClientOnly>
        <div className="pb-20 pt-28">

        {children}
        </div>
      </body>
    </html>
  );
}
