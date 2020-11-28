import React, { Suspense } from "react";
import Layout from "app/layouts/Layout";
import "styles/tailwind.css";

export default function MyApp({ Component, pageProps }) {
  return (
    <Suspense fallback={<div>Error</div>}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Suspense>
  );
}
