import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import Nav from "/components/nav";
import Footer from "/components/footer";
import ChangeImg from "/components/changeImg";
import EditaDatos from "/components/editaDatos";
import EditaPass from "/components/editaPass";
import style from "/styles/Perfil.module.css";

export default function Perfil() {
  const router = useRouter();
  const [isUser, setIsUser] = useState(false);
  const [user, setUser] = useState([]);
  const [citas, setCitas] = useState([]);
  const [opiniones, setOpiniones] = useState([]);
  // const [artists, setArtists] = useState([]);
  const [isChangeImgOpen, setIsChangeImgOpen] = useState(false);
  const [isEditaDatosOpen, setIsEditaDatosOpen] = useState(false);
  const [isEditaPassOpen, setIsEditaPassOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showCitas, setShowCitas] = useState(false); // Estado para mostrar/ocultar citas
  const [showOpiniones, setShowOpiniones] = useState(false); // Estado para mostrar/ocultar opiniones

  const recibeId = useCallback(() => {
    const userId = sessionStorage.getItem("token");
    fetchUser(userId);
  }, []);

  useEffect(() => {
    fetchCitas();
    fetchOpiniones();
    recibeId();

    const userRole = localStorage.getItem("userRole");
    if (userRole === "user") {
      setIsUser(true);
    } else {
      router.push("/pagError");
    }
  }, [recibeId, router]);

  const fetchUser = async (userId) => {
    const response = await fetch(
      "https://tattoomax-backend-48q8.onrender.com/users"
    );
    const data = await response.json();
    setUser(data.find((usuario) => usuario._id === userId));
    setIsLoading(false);
  };

  const fetchCitas = async () => {
    try {
      const userId = sessionStorage.getItem("token");
      const userResponse = await fetch(
        "https://tattoomax-backend-48q8.onrender.com/users"
      );
      const userData = await userResponse.json();
      const user = userData.find((usuario) => usuario._id === userId);
      const response = await fetch(
        "https://tattoomax-backend-48q8.onrender.com/citas"
      );
      const data = await response.json();
      const userCitas = data.filter((cita) => cita.user === user.username);
      setCitas(userCitas);
    } catch (error) {
      console.error("Error fetching opiniones:", error);
    }
  };

  const fetchOpiniones = async () => {
    try {
      const userId = sessionStorage.getItem("token");
      const userResponse = await fetch(
        "https://tattoomax-backend-48q8.onrender.com/users"
      );
      const userData = await userResponse.json();
      const user = userData.find((usuario) => usuario._id === userId);
      const opinionesResponse = await fetch(
        "https://tattoomax-backend-48q8.onrender.com/opiniones"
      );
      const opinionesData = await opinionesResponse.json();
      const filteredOpiniones = opinionesData.filter(
        (opinion) => opinion.user === user.username
      );
      setOpiniones(filteredOpiniones);
    } catch (error) {
      console.error("Error fetching opiniones:", error);
    }
  };

  const openChangeImg = () => {
    setIsChangeImgOpen(true);
  };

  const openEditaDatos = () => {
    setIsEditaDatosOpen(true);
  };

  const openEditaPass = () => {
    setIsEditaPassOpen(true);
  };

  const closeChangeImg = () => {
    setIsChangeImgOpen(false);
  };

  const closeEditaDatos = () => {
    setIsEditaDatosOpen(false);
  };

  const closeEditaPass = () => {
    setIsEditaPassOpen(false);
  };

  const toggleCitas = () => {
    setShowCitas(!showCitas);
  };

  const toggleOpiniones = () => {
    setShowOpiniones(!showOpiniones);
  };

  if (!isUser) {
    return (
      <div className={style.loadingContainer}>
        <div className={style.loading}></div>
        <p>Cargando...</p>
      </div>
    );
  }

  return (
    <div>
      <div>
        <Nav />
      </div>
      {/* Mostrar un mensaje de carga mientras se cargan los datos */}
      {isLoading && (
        <>
          <div className={style.loadingContainer}>
            <div className={style.loading}></div>
            <p>Cargando...</p>
          </div>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
        </>
      )}
      {/* Mostrar los datos del artista una vez que se han recibido */}
      {!isLoading && (
        <>
          <div className={style.datosUser}>
            <div className={style.user}>
              <div className={style.img}>
                <Image
                  src={user.imagen}
                  alt="userImage"
                  className={style.buttonImg}
                  onClick={openChangeImg}
                  width={150}
                  height={150}
                />
                {isChangeImgOpen && (
                  <ChangeImg user={user} onClose={closeChangeImg} />
                )}
              </div>
              <div className={style.datos}>
                <p>
                  User: <b>{user.username}</b>
                </p>
                <p>
                  Email: <b>{user.email}</b>
                </p>
                <p>
                  Teléfono: <b>{user.telefono}</b>
                </p>
              </div>
            </div>
            <div>
              <button className={style.openModal} onClick={openEditaDatos}>
                Editar información
              </button>
              <button className={style.openModal} onClick={openEditaPass}>
                Editar contraseña
              </button>

              {isEditaDatosOpen && (
                <EditaDatos user={user} onClose={closeEditaDatos} />
              )}
              {isEditaPassOpen && (
                <EditaPass user={user} onClose={closeEditaPass} />
              )}
            </div>
          </div>
          <div className={style.containerOp}>
            <h2>Opiniones realizadas a nuestros artistas</h2>
            <button className={style.showHideButton} onClick={toggleOpiniones}>
              {showOpiniones ? "Ocultar opiniones" : "Mostrar opiniones"}
            </button>{" "}
            {/* Botón para mostrar/ocultar */}
            {showOpiniones && ( // Mostrar solo si showOpiniones es true
              <div className={style.opiniones}>
                {opiniones.length === 0 ? (
                  <div>
                    <h3>
                      No has realizado ninguna opinión a nuestros artistas
                    </h3>
                    <p>
                      Si quieres añadir una opinión, elige un artista{" "}
                      <Link href="/artists">
                        <p style={{ color: "blue" }}>aquí</p>
                      </Link>{" "}
                      y nos pondremos en contacto contigo
                    </p>
                  </div>
                ) : (
                  opiniones.map((opinion, index) => (
                    <div key={index} className={style.opinion}>
                      <div className={style.divOp}>
                        <Image
                          src={opinion.imgArtist}
                          alt="imgArtist"
                          className={style.imgArtistOp}
                          width={30}
                          height={30}
                        />
                        <b className={style.ArtistOp}>{opinion.artist}</b>
                      </div>
                      <div className={style.divOp}>
                        <b className={style.TituloOp}>{opinion.titulo}</b>
                      </div>
                      <div className={style.divOp}>
                        <b className={style.opinionOp}>{opinion.opinion}</b>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          <br />
          <br />

          <div className={style.containerCitas}>
            <h2>Citas</h2>
            <button className={style.showHideButton} onClick={toggleCitas}>
              {showCitas ? "Ocultar citas" : "Mostrar citas"}
            </button>{" "}
            {/* Botón para mostrar/ocultar */}
            {showCitas && ( // Mostrar solo si showCitas es true
              <div className={style.citas}>
                {citas.length === 0 ? (
                  <div>
                    <h3>Aún no tienes ninguna cita con nosotros</h3>
                    <p>
                      Si quieres concretar una cita, rellena el formulario{" "}
                      <Link href="/local">
                        <p style={{ color: "blue" }}>aquí</p>
                      </Link>{" "}
                      y nos pondremos en contacto contigo
                    </p>
                  </div>
                ) : (
                  citas.map((cita, index) => (
                    <div key={index} className={style.cita}>
                      <div className={style.divCita}>
                        <b className={style.ArtistCita}>{cita.artist}</b>
                      </div>
                      <div className={style.divCita}>
                        <b className={style.horarioCita}>{cita.cita}</b>
                      </div>
                      <div className={style.divCita}>
                        <b className={style.descCita}>{cita.descripcion}</b>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </>
      )}
      <div>
        <Footer />
      </div>
    </div>
  );
}
