import "../styles/globals.css";
import { BaseLayout } from "@components/ui/layout";

function MyApp({ Component, pageProps }) {
  return (
    <BaseLayout>
      <Component {...pageProps} />
    </BaseLayout>
  );
}

export default MyApp;
