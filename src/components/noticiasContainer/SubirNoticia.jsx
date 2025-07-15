import React, { useState } from "react";
import { uploadBlogPost } from "../../pages/[lang]/utils/firebaseUtils";
import "./subirNoticia.css";
import imageCompression from "browser-image-compression";

const CLOUD_NAME = "dxad6416z";
const UPLOAD_PRESET = "noticias_unsigned";

const SubirNoticia = () => {
  const [titulo, setTitulo] = useState("");
  const [fecha, setFecha] = useState("");
  const [resumen, setResumen] = useState("");
  const [parrafo, setParrafo] = useState("");
  const [imagen, setImagen] = useState("");

  const [loading, setLoading] = useState(false);

  const subirImagenACloudinary = async (file) => {
    const options = {
      maxSizeMB: 1, // peso máximo deseado (en MB)
      maxWidthOrHeight: 1024, // opcional: reducir resolución
      useWebWorker: true,
    };

    const compressedFile = await imageCompression(file, options);

    const formData = new FormData();
    formData.append("file", compressedFile);
    formData.append("upload_preset", UPLOAD_PRESET);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();
    return data.secure_url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imagenUrl = "";
      if (imagen) {
        imagenUrl = await subirImagenACloudinary(imagen);
      }

      await uploadBlogPost({
        Titulo: titulo,
        Fecha: fecha,
        Resumen: resumen,
        imagenDestacada: imagenUrl,
        Parrafo: parrafo,
      });

      alert("Post subido con éxito");
      setTitulo("");
      setFecha("");
      setResumen("");
      setParrafo("");
      setImagen("");
    } catch (err) {
      console.error("Error al subir el post:", err);
      alert("Error al subir el post");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="formContainer">
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImagen(e.target.files[0])}
      />
      <input
        type="text"
        placeholder="Título"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        required
      />
      <input
        type="date"
        value={fecha}
        onChange={(e) => setFecha(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Resumen"
        value={resumen}
        onChange={(e) => setResumen(e.target.value)}
        required
      />
      <textarea
        placeholder="Cuerpo del post"
        value={parrafo}
        onChange={(e) => setParrafo(e.target.value)}
        required
      />

      <button type="submit" disabled={loading}>
        {loading ? "Subiendo..." : "Publicar"}
      </button>
    </form>
  );
};

export default SubirNoticia;
