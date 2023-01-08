import * as React from "react";
import MiniDrawer from "../Drawer";
import { useRouter } from "next/router";

const Layout = ({ children }: any) => {
  const router = useRouter();
  const pathLoginCondition = router.pathname.includes("Login");
  const pathSignupCondition = router.pathname.includes("Signup");
  return (
    <>
      {pathSignupCondition === false && pathLoginCondition === false ? (
        <MiniDrawer main={children} />
      ) : (
        <div>{children}</div>
      )}
    </>
  );
};

export default Layout;
