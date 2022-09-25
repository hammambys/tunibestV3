import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function EpisodeCard({ data }) {
  const router = useRouter();
  const { serieTitle } = router.query;
  if (!data) {
    return <div> Loading </div>;
  }
  return (
    <>
      <div className="cursor-pointer relative text-black  m-10">
        <div className="p-5 bg-white">
          <Link href={`/series/${serieTitle}/${data.number}`}>
            <div>{data.number}</div>
          </Link>
        </div>
      </div>
    </>
  );
}
