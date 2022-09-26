import { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  Timestamp,
  query,
  onSnapshot,
} from "firebase/firestore";

function AddSerie({ onClose, open }) {
  const [title, setTitle] = useState("");

  const [length, setLength] = useState(0);
  const [img_id, setImg_id] = useState("");

  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);

  /* function to get all tasks from firestore in realtime */
  useEffect(() => {
    const catRef = query(collection(db, "categories"));
    onSnapshot(catRef, (snapshot) => {
      setCategories(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);
  /* function to add new task to firestore */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "series"), {
        title: title,
        length: length,
        category: category,
        img_id: img_id,
        created: Timestamp.now(),
      });
      alert("success");
    } catch (err) {
      alert(err);
    }
  };

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="p-5" name="AddSerie">
      <div className="mb-5">
        <label className="block" for="title">
          Title
        </label>
        <input
          className="text-black"
          id="title"
          placeholder="Title"
          type="text"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div className="mb-5">
        <label className="block" for="length">
          length
        </label>
        <input
          className="text-black"
          id="length"
          placeholder="length"
          type="number"
          value={length}
          onChange={({ target }) => setLength(parseInt(target.value))}
        />
      </div>
      <div className="mb-5">
        <label className="block  " for="category">
          Category
        </label>
        <select value={category} onChange={handleChange} className="text-black">
          {categories.map((category) => (
            <option key={category.id} value={category.data.name}>
              {category.data.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-5">
        <label className="block" for="img_id">
          img_id
        </label>
        <input
          className="text-black"
          id="img_id"
          placeholder="img_id"
          type="text"
          value={img_id}
          onChange={({ target }) => setImg_id(target.value)}
        />
      </div>

      <button className="bg-red-500 text-black p-3" type="submit">
        Create
      </button>
    </form>
  );
}

export default AddSerie;
