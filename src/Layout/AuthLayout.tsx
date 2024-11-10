import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <>
      <Outlet /> {/* This will render the matched child routes */}
    </>
  );
}
