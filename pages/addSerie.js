import { useState } from "react";
import { db } from "./firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

function AddSerie({ onClose, open }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);

  /* function to get all tasks from firestore in realtime */
  useEffect(() => {
    const taskColRef = query(collection(db, "categories"));
    onSnapshot(taskColRef, (snapshot) => {
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
      await addDoc(collection(db, "serie"), {
        title: title,
        category: category,
        img_id: img_id,
        created: Timestamp.now(),
      });
      onClose();
    } catch (err) {
      alert(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="AddSerie" name="AddSerie">
      <div className="mb-4 md:mr-2 md:mb-0">
        <label className="" for="title">
          Title
        </label>
        <input
          className=""
          id="title"
          placeholder="Title"
          type="text"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div className="p-2">
        <label
          class="block mb-2 text-sm font-bold text-gray-700"
          for="category"
        >
          Category
        </label>
        <select value={category} onChange={handleChange}>
          {categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <button type="submit">Done</button>
    </form>
  );
}

export default AddSerie;
