import Head from "next/head";
import { useUserContext } from "../context/userContext";

import Welcome from "../components/home/Welcome";
import { useRouter } from "next/router";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles
import DusraFooter from "../components/Footer";

export default function Home() {
  const { user } = useUserContext();
  const router = useRouter();
  useEffect(() => {
    AOS.init();
    if (user != null) {
      router.push("/home");
    }
  });
  return (
    <div className=" bg-black">
      <Head>
        <title>Tunibest</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Welcome />
      <DusraFooter />
    </div>
  );
}
