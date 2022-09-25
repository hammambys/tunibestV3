import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { db } from "../../../firebase";

export default function Watch() {
  const [serie, setSerie] = useState([]);
  const [episode, setEpisode] = useState([]);
  const router = useRouter();
  const { serieTitle, ep_num } = router.query;

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

    const serieRef = query(
      collection(db, "series"),
      where("title", "==", `${serieTitle}`)
    );
    onSnapshot(serieRef, (querySnapshot) => {
      setSerie(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, [serieTitle, ep_num]);
  if (!episode[0] || !serie[0]) {
    return <div> Loading </div>;
  }
  console.log(serie);
  return (
    <div>
      <div className="text-center">Watch</div>
      <div className="flex">
        {episode[0].data.number > 1 && (
          <button
            onClick={() =>
              router.push(`/series/${serieTitle}/${episode[0].data.number - 1}`)
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
        {episode[0].data.number < serie[0].data.length && (
          <button
            onClick={() =>
              router.push(`/series/${serieTitle}/${episode[0].data.number + 1}`)
            }
          >
            Next
          </button>
        )}{" "}
      </div>
    </div>
  );
}
