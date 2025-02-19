import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Slide } from "react-slideshow-image";
import dynamic from "next/dynamic";
import style from "/styles/Home.module.css";
import "react-slideshow-image/dist/styles.css";

// Dynamic imports with suspense for better loading experience
const Nav = dynamic(() => import("/components/nav"), {
  ssr: true,
  suspense: true,
});
const Footer = dynamic(() => import("/components/footer"), {
  ssr: true,
  suspense: true,
});

// Image optimization: use optimized image formats (e.g., WebP) if possible
import imgLocal1 from "/public/slider/local1.png?w=700&q=75"; // Example using query parameters for optimization
import imgTatu1 from "/public/slider/tatu1.png?w=700&q=75";
import imgLocal2 from "/public/slider/local2.png?w=700&q=75";
import imgTatu2 from "/public/slider/tatu2.png?w=700&q=75";
import imgLocal3 from "/public/slider/local3.png?w=700&q=75";
import imgTatu3 from "/public/slider/tatu3.png?w=700&q=75";
import oferta from "/public/ofertas/OFERTA.png?w=400&q=75";
import oferta1 from "/public/ofertas/oferta1.png?w=400&q=75";
import oferta2 from "/public/ofertas/oferta2.png?w=400&q=75";
import oferta3 from "/public/ofertas/oferta3.png?w=400&q=75";

export default function Home() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const slideImages = [
    { url: imgLocal1, caption: "Nuestro local" },
    { url: imgTatu1, caption: "Tatuajes artísticos" },
    { url: imgLocal2, caption: "Instalaciones" },
    { url: imgTatu2, caption: "Diseños únicos" },
    { url: imgLocal3, caption: "Ambiente acogedor" },
    { url: imgTatu3, caption: "Trabajo profesional" },
  ];

  const imagenesOferta = [
    { frente: oferta, detras: oferta1, title: "Oferta especial 1" },
    { frente: oferta, detras: oferta2, title: "Oferta especial 2" },
    { frente: oferta, detras: oferta3, title: "Oferta especial 3" },
  ];

  const handleHover = (index) => {
    setHoveredIndex(index);
  };

  const slideProperties = {
    duration: 5000,
    transitionDuration: 500,
    infinite: true,
    indicators: true,
    arrows: true,
    autoplay: true, // Add autoplay for better UX
  };

  return (
    <div className={style.pageContainer}>
      <Nav /> {/* Suspense handled internally by dynamic import */}
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }} // Simplified animate
        transition={{ duration: 0.5 }}
        className={style.mainContent}
      >
        <motion.div
          className={style.cabeceraContainer}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className={style.cabecerah1}>
            BIENVENIDOS A LA WEB DEL ESTUDIO TATTOOMAX
          </h1>
          <h3 className={style.cabecerah3}>DONDE LA TINTA ES LO MAX...</h3>
        </motion.div>

        <section className={style.gallerySection}>
          <div className={style.sliderContainer}>
            <Slide {...slideProperties}>
              {slideImages.map((slideImage, index) => (
                <div key={index} className={style.slideItem}>
                  <Image
                    src={slideImage.url}
                    alt={slideImage.caption}
                    width={700}
                    height={400}
                    priority={index < 2}
                    className={style.slideImage}
                  />
                  <div className={style.slideCaption}>{slideImage.caption}</div>
                </div>
              ))}
            </Slide>
          </div>
        </section>

        <section className={style.ofertaContainer}>
          {imagenesOferta.map((imagen, index) => (
            <motion.div
              key={index}
              className={`${style.oferta} ${
                hoveredIndex === index ? style.voltear : ""
              }`}
              onMouseEnter={() => handleHover(index)}
              onMouseLeave={() => handleHover(null)}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className={style.carta}>
                <div
                  className={`${style.cara} ${
                    hoveredIndex === index ? style.caraVisible : ""
                  }`}
                >
                  <Image
                    src={imagen.frente}
                    alt={`${imagen.title} - frontal`}
                    width={400}
                    height={400}
                    loading="lazy"
                  />
                </div>
                <div
                  className={`${style.caraDetras} ${
                    hoveredIndex !== null && hoveredIndex !== index
                      ? style.caraVisible
                      : ""
                  }`}
                >
                  <Image
                    src={imagen.detras}
                    alt={`${imagen.title} - detalle`}
                    width={400}
                    height={400}
                    loading="lazy"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </section>

        <motion.section
          className={style.informacion}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h3>
            Visita los distintos sitios de esta página para ver toda la
            información acerca de nuestro estudio
          </h3>
          <div className={style.linkContainer}>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Link href="/blog" className={style.link}>
                Información y recomendaciones sobre tatuajes
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Link href="/local" className={style.link}>
                Horario y ubicación de nuestro local
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Link href="/artistas" className={style.link}>
                Conoce a nuestros artistas y sus trabajos
              </Link>
            </motion.div>
          </div>
        </motion.section>
      </motion.main>
      <Footer />
    </div>
  );
}
