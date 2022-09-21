import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import { useRouter } from "next/router";
import EpisodeCard from "../../components/EpisodeCard";

export default function SeriePage() {
  const [serie, setSerie] = useState([]);
  const [episodes, setEpisodes] = useState([]);
  const router = useRouter();
  const { serieTitle } = router.query;

  useEffect(() => {
    if (!serieTitle) {
      return;
    }
    const q = query(
      collection(db, "series"),
      where("title", "==", `${serieTitle}`)
    );
    onSnapshot(q, (querySnapshot) => {
      setSerie(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
    const episodesRef = collection(db, "episodes");
    onSnapshot(episodesRef, (querySnapshot) => {
      setEpisodes(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, [serieTitle]);

  return (
    <div className="">
      <h1 className="text-center  inset-2/4 mb-10">Episode list</h1>
      <div className="flex p-5">
        {episodes.map((episode) => (
          <EpisodeCard key={episode.id} data={episode.data} />
        ))}
      </div>
    </div>
  );
}
