import React, { Suspense } from "react";
import { ErrorComponent, Head } from "blitz";
import Layout from "app/layouts/Layout";
import "styles/tailwind.css";

export default function MyApp({ Component, pageProps }) {
  return (
    <Suspense fallback={<ErrorComponent statusCode={500}>Error</ErrorComponent>}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Suspense>
  );
}
