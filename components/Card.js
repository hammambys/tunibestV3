import React, { useState } from "react";
import { BASE_IMG_URL, BASE_IMG_URL_500w } from "../common/requests";
import { FiInfo } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";
import { BsPlayFill } from "react-icons/bs";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";

import { useUserContext } from "../context/userContext";

export default function Card({ data }) {
  const router = useRouter();
  const [isHover, setIsHover] = useState(false);
  if (!data) {
    return <div> Loading </div>;
  }

  return (
    <>
      <div
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        className="relative flex justify-center text-white cursor-pointer"
      >
        <Link href={`/${data.title}`}>
          <Image
            src={`${BASE_IMG_URL}${data.img_id}`}
            alt={data.title}
            className=" rounded-lg"
            width={350}
            height={200}
            priority={true}
          />
        </Link>
      </div>
    </>
  );
}
