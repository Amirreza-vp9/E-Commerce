import "../styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Hydrate } from "@tanstack/react-query";
import store from "../redux/store";
import { Provider } from "react-redux";
import AdminLayout from "../components/layouts/adminLayout";
import DashboardLayout from "../components/layouts/dashboardLayout";
import { useRouter } from "next/router";
import Layout from "../components/layouts/layout";

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  const getLayout: any = Component.getLayout || ((page: any) => page);
  const router = useRouter();

  const pathAdminCondition = router.pathname.includes("adminPanel");
  const pathDashboardCondition = router.pathname.includes("dashboard");

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Provider store={store}>
          {pathAdminCondition === true ? (
            <>
              {getLayout(
                <AdminLayout>
                  <Component {...pageProps} />
                </AdminLayout>
              )}
            </>
          ) : (
            ""
          )}
          {pathDashboardCondition === true ? (
            <>
              {getLayout(
                <DashboardLayout>
                  <Component {...pageProps} />
                </DashboardLayout>
              )}
            </>
          ) : (
            ""
          )}
          {pathAdminCondition === false && pathDashboardCondition === false ? (
            <>
              {getLayout(
                <Layout>
                  <Component {...pageProps} />
                </Layout>
              )}
            </>
          ) : (
            ""
          )}
        </Provider>
      </Hydrate>
    </QueryClientProvider>
  );
}
