import React, { useEffect, useState } from "react";
import Image from "next/image";
import Nav from "/components/nav";
import Footer from "/components/footer";
import HorarioLocal from "/components/horarioLocal";
import flecha from "/public/iconos/flecha.png";
import style from "/styles/Local.module.css";

export default function Local() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [modalMessage, setModalMessage] = useState(null); // State for modal messages

  useEffect(() => {
    const fetchUser = async () => {
      const token = sessionStorage.getItem("token");
      if (token) {
        try {
          const res = await fetch(
            "https://tattoomax-backend-48q8.onrender.com/users"
          );
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          const users = await res.json();
          const foundUser = users.find((user) => user._id === token);
          setUser(foundUser);
        } catch (error) {
          console.error("Error fetching user:", error);
          // Handle error, e.g., display an error message
          setModalMessage("Error loading user data. Please try again later.");
        }
      }
      setIsLoading(false);
    };

    fetchUser();
  }, []); // Empty dependency array ensures this runs only once on mount

  const handleConsultaSubmit = async (event) => {
    event.preventDefault(); // Prevent form from refreshing the page

    if (!user) {
      setModalMessage("Para poder hacer una consulta debes estar logueado.");
      return;
    }

    const formData = new FormData(event.target); // Use FormData for easier data handling

    try {
      const res = await fetch(
        "https://tattoomax-backend-48q8.onrender.com/consultas/add",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(Object.fromEntries(formData)), // Convert FormData to JSON
        }
      );

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      setModalMessage(
        "Tu consulta se ha realizado correctamente. Espera a ser contactado por email o teléfono."
      );
      event.target.reset(); // Clear the form
    } catch (error) {
      console.error("Error submitting consulta:", error);
      setModalMessage(
        "Error submitting your consulta. Please try again later."
      );
    }
  };

  const closeModal = () => setModalMessage(null);

  return (
    <div className={style.body}>
      <Nav />
      {isLoading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
        </div>
      ) : (
        <>
          <div className={style.aboutUs}>
            {" "}
            {/* More descriptive class name */}
            <p>
              TattooMax es un estudio fundado en 1994 en Jerez (Cádiz).
              TattooMax es un espacio abierto al arte, al buen gusto y a la
              interpretación de ideas. Además de nuestro equipo fijo,
              disfrutamos de una variedad de tatuadores de estilos bien
              diferenciados que periódicamente vienen a deleitarnos con su
              trabajo. Situado en una de las avenidas principales de Jerez,
              disponemos de un local de más de cien metros cuadrados donde prima
              la comodidad de nuestros clientes y tatuadores, y donde nuestro
              lema es:
              <br /> <b>&lt;&lt;La calidad antes que la cantidad&gt;&gt;</b>
              <br /> Seáis todos bienvenidos.
            </p>
          </div>

          <div className={style.horariosContainer}>
            <h2 className={style.h2}>Horarios</h2>
            <div className={style.horariosTable}>
              <HorarioLocal />
            </div>
          </div>

          <div className={style.locationContainer}>
            {" "}
            {/* More descriptive class name */}
            <h1 className={style.h1}>Localización</h1>
            <div className={style.mapContainer}>
              {" "}
              {/* More descriptive class name */}
              <iframe
                className={style.map}
                src="https://maps.google.com/maps?q=Avenida%20Amsterdam,%20C.%20Estocolmo,%2011405%20Jerez%20de%20la%20Frontera,%20C%C3%A1diz&t=&z=13&ie=UTF8&iwloc=&output=embed"
                title="Mapa de localización" // Add title for accessibility
              />
            </div>
            <div className={style.consultaContainer}>
              {" "}
              {/* More descriptive class name */}
              <h3 className={style.h3}>Pide tu cita o haz tu consulta!</h3>
              <form className={style.form} onSubmit={handleConsultaSubmit}>
                {" "}
                {/* Use a form element */}
                <input
                  type="text"
                  id="nombre"
                  name="name"
                  className={style.input}
                  placeholder="Nombre"
                  required
                />
                <br />
                <br />
                <input
                  type="tel"
                  id="tel"
                  name="telefono"
                  className={style.input}
                  placeholder="Teléfono"
                  required
                />
                <br />
                <br />
                <input
                  type="email"
                  id="email"
                  name="email"
                  className={style.input}
                  placeholder="Email"
                  required
                />
                <br />
                <br />
                <textarea
                  id="consulta"
                  name="consulta"
                  rows="3"
                  className={style.textarea}
                  placeholder="Escribe aquí tu consulta"
                  required
                />
                <br />
                <br />
                <button type="submit" className={style.button}>
                  Enviar
                </button>
              </form>
            </div>
          </div>
        </>
      )}

      {modalMessage && (
        <div className={style.modalContainer}>
          <div className={style.modalContent}>
            <p>{modalMessage}</p>
            <button onClick={closeModal}>Cerrar</button>{" "}
            {/* Add a close button */}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
