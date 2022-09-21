import { UserContextProvider } from "../context/userContext";
import { store } from "../features/store";
import "../styles/globals.css";
import { Provider } from "react-redux";
import Layout from "../components/layout";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <UserContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UserContextProvider>
    </Provider>
  );
}

export default MyApp;
