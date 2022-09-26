import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase";

export default function () {
  const [series, setSeries] = useState([]);
  useEffect(() => {
    const seriesRef = query(collection(db, "series"));
    onSnapshot(seriesRef, (snapshot) => {
      setSeries(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, [series]);

  const onDelete = (id) => {
    if (confirm("sure?") == true) {
      const docRef = doc(db, "series", `${id}`);
      deleteDoc(docRef)
        .then(() => {
          alert("Serie has been deleted successfully.");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  if (!series[0]) {
    return <div>Loading</div>;
  }
  console.log(series[0]);
  return (
    <form>
      <h1 className="text-center mb-10">All Series</h1>
      <ul>
        {series.map((serie) => (
          <div className="flex">
            <li>{serie.data.title}</li>
            <button
              className="bg-red-500 p-3 m-3"
              onClick={() => onDelete(serie.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </ul>
    </form>
  );
}
