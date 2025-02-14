import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import Artista from "../../components/artista";
import Nav from "../../components/nav";
import Footer from "../../components/footer";


function PaginaArtista() {
    const router = useRouter();
    const [artista, setArtista] = useState(null);
  
    useEffect(() => {
      const obtenerIdArtista = async () => {
        if (router.query.artist) {
          try {
            const data = await fetch('https://tattoomax-backend-48q8.onrender.com/artists').then(res => res.json());
            setArtista(data.find(artist => artist.name.replace(/\s+/g, '') === router.query.artist));
          } catch (error) {
            console.error("Error al obtener el ID del artista:", error);
          }
        }
        else{
          console.error("ERROR")
        }
      };
  
      obtenerIdArtista();
    }, [router.query.artist]);
  
    if (!artista) {
      return <div>Cargando...</div>;
    }

    return(
        <div>
            <div>
                <div>
                    <Nav/>
                </div>
                <div>
                    <Artista name={artista.name} id={artista._id} />
                </div>
                <div>
                    <Footer/>
                </div>
            </div>
        </div>
    )
}


export default PaginaArtista;