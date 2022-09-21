import { collection, onSnapshot, query, where } from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase";

export default function Watch() {
  const [episode, setEpisode] = useState([]);
  const router = useRouter();
  const { serieTitle, ep_num } = router.query;
  //const [previous, setPrevious] = useState(ep_num ? 0 : null);

  useEffect(() => {
    const q = query(
      collection(db, "episodes"),
      where("serie_name", "==", `${serieTitle}`),
      where("number", "==", parseInt(`${ep_num}`))
    );
    onSnapshot(q, (querySnapshot) => {
      setEpisode(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, [serieTitle, ep_num]);
  if (!episode[0]) {
    return <div> Loading </div>;
  }
  /*const epNum = episode[0].data.number;
  if (epNum != 1) {
    setPrevious(epNum - 1);
  } else {
    setPrevious(0);
  }*/

  return (
    <div>
      <div className="text-center">Watch</div>
      <div className="flex">
        {episode[0].data.previous != 0 && (
          <button
            onClick={() =>
              router.push(`/${serieTitle}/${episode[0].data.previous}`)
            }
          >
            Previous
          </button>
        )}{" "}
        <div>
          <iframe
            width="420"
            height="315"
            src={`https://www.youtube.com/embed/${episode[0].data.video_id}`}
          ></iframe>
        </div>
        {episode[0].data.next != 0 && (
          <button
            onClick={() =>
              router.push(`/${serieTitle}/${episode[0].data.next}`)
            }
          >
            Next
          </button>
        )}{" "}
      </div>
    </div>
  );
}
