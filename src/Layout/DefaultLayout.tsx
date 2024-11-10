import { Outlet } from "react-router-dom";

import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

export default function DefaultLayout() {
  return (
    <>
      <Header />
      <Outlet /> {/* This will render the matched child routes */}
      <Footer />
    </>
  );
}
