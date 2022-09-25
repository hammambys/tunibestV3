import Head from "next/head";
import DusraFooter from "./Footer";
import Header from "./Header";

export default function Layout({ children }) {
  return (
    <>
      <Head></Head>

      <div className="text-white bg-black">
        <Header />
        <div className="h-60"></div>
        <div className="ml-5 md:ml-20 h-screen">{children}</div>
        <DusraFooter />
      </div>
    </>
  );
}
