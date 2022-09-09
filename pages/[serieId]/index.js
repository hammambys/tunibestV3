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
import Header from "../../components/Header";
import Banner from "../../components/Banner";
import DusraFooter from "../../components/DusraFooter";
import Card from "../../components/Card";
import EpisodeCard from "../../components/EpisodeCard";

export default function SeriePage() {
  const router = useRouter();
  const { id } = router.query;
  const [serie, setSerie] = useState([]);
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, "series"),
      where("title", "==", "choufli-hal")
    );
    onSnapshot(q, (querySnapshot) => {
      setSerie(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
    const episodesRef = collection(
      db,
      "series",
      "1",
      "seasons",
      "1",
      "episodes"
    );
    onSnapshot(episodesRef, (querySnapshot) => {
      setEpisodes(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);

  console.log(episodes);
  console.log(serie);

  /*useEffect(() => {
    setEpisodes(serie[0].seasons[0].episodes);
  }, []);*/
  return (
    <div className=" bg-black overflow-x-hidden">
      <Header />

      {serie.map((serie) => (
        <EpisodeCard key={serie.id} data={serie.data} />
      ))}
      <DusraFooter />
    </div>
  );
}
