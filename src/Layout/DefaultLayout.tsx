import { Outlet } from "react-router-dom";

import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { Session } from "@supabase/supabase-js";

export default function DefaultLayout({
  session,
}: {
  session: Session | null;
}) {
  return (
    <>
      <Header session={session} />
      <Outlet /> {/*? rencdtr matczhed  child routes */}
      <Footer />
    </>
  );
}
