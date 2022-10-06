import "react-toastify/dist/ReactToastify.css";
import "../styles/globals.css";
import { BaseLayout } from "@components/ui/layout";
import { ToastContainer } from "react-toastify";

function MyApp({ Component, pageProps }) {
  return (
    <BaseLayout>
      <ToastContainer />
      <Component {...pageProps} />
    </BaseLayout>
  );
}

export default MyApp;
