import React, { useState } from 'react';
import axios from 'axios';

const UploadPiece = () => {
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      setMessage("Veuillez sélectionner une image.");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    try {
      const token = localStorage.getItem("access_token"); // assure-toi que le token y est stocké

      const response = await axios.post(
        "http://localhost:8000/api/upload/", // adapte l’URL à ton backend
        formData,
        {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setMessage(response.data.message || "Image envoyée avec succès !");
    } catch (error) {
      console.error(error);
      setMessage("Erreur lors de l'envoi de l'image.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow rounded">
      <h2 className="text-xl font-semibold mb-4">Uploader une pièce d'identité</h2>

      {preview && (
        <img src={preview} alt="Preview" className="mb-3 h-48 object-cover rounded" />
      )}

      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="block mb-4"
        />
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Envoyer
        </button>
      </form>

      {message && <p className="mt-4 text-center text-sm text-gray-700">{message}</p>}
    </div>
  );
};

export default UploadPiece;
