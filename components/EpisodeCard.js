import React, { useState } from "react";
import { BASE_IMG_URL } from "../common/requests";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { useUserContext } from "../context/userContext";

export default function EpisodeCard({ data }) {
  const [isHover, setIsHover] = useState(false);
  if (!data) {
    return <div> Loading </div>;
  }
  return (
    <>
      <Link href={`/${data.title}/${data.episode_title}`}>
        <div
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          className="relative flex justify-center text-white"
        >
          <p>{data.title} </p>
          <Image
            src={`${BASE_IMG_URL}${data.img_id}`}
            alt={data.title}
            className=" rounded-lg"
            width={350}
            height={200}
            priority={true}
          />
        </div>
      </Link>
    </>
  );
}
