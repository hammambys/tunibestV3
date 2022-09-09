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
  const { isModal, setIsModal } = useUserContext();
  const { ModalData, setModalData } = useUserContext();
  const router = useRouter();
  const [isHover, setIsHover] = useState(false);
  const [imageError, setImageError] = useState(false);
  const fallBackSrc =
    "https://res.cloudinary.com/dewctbby3/image/upload/v1647663227/7dc497e2-4975-11ec-a9ce-066b49664af6_cm_1440w_dugogx.jpg";

  const src = `${BASE_IMG_URL}${data.backdrop_path}`;
  if (!data) {
    return <div> Loading </div>;
  }
  // id: ModalData.id,
  // title: ModalData.title,
  // backdrop_path: ModalData.backdrop_path,
  // release_date: ModalData.release_date,
  // vote_average: ModalData.vote_average,
  // overview: ModalData.overview,
  //`users/${user.uid}/watchlist`
  return (
    <>
      <div
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        className="relative flex justify-center text-white"
      >
        <Link href={`/${data.id}`}>
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
