import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Discover from "../components/Discover";
import { useUserContext } from "../context/userContext";
import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles

function HomePage() {
  const { logOutUser, user } = useUserContext();
  const router = useRouter();
  useEffect(() => {
    AOS.init();
  }, []);
  useEffect(() => {
    if (user === null) {
      router.push("/");
    } else {
      router.push("/home");
    }
  }, [user]);

  return (
    <>
      <Head>
        <title>Tunibest</title>
        <link
          rel="stylesheet"
          type="text/css"
          charset="UTF-8"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />
      </Head>
      <div className=" ">
        <Discover />
      </div>
    </>
  );
}

export default HomePage;
