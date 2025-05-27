import { db } from "./firebaseConfig";
import { addDoc, collection, getDocs } from "firebase/firestore";

async function fetchBlogPosts() {
  const documentRef = collection(db, "noticias");
  const snapshot = await getDocs(documentRef);
  const postsData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  postsData.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
  return postsData;
}

async function uploadBlogPost({
  Titulo,
  Fecha,
  Resumen,
  imagenDestacada,
  Parrafo,
}) {
  try {
    const docRef = await addDoc(collection(db, "noticias"), {
      Titulo,
      Fecha,
      Resumen,
      imagenDestacada,
      Parrafo,
    });
    console.log("Blog post created with ID:", docRef.id);
  } catch (e) {
    console.error("Error uploading blog post:", e);
  }
}

export { fetchBlogPosts, uploadBlogPost };
