import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import Login from "/components/login";
import style from "/styles/Nav.module.css";
import logo from "/public/logo.png";

const Nav = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setShowMenu(false);
  }, [router.pathname]);

  return (
    <nav className={`${style.container} ${isScrolled ? style.scrolled : ""}`}>
      <div className={style.logoContainer}>
        <Link href="/" aria-label="Ir a inicio">
          <Image
            className={style.image}
            alt="TattooMax logo"
            src={logo}
            height={80}
            width={180}
            priority
          />
        </Link>
      </div>
      <div className={style.navWrapper}>
        {" "}
        {/* New wrapper for nav items */}
        <div className={style.login}>
          <Login />
        </div>
        <button
          className={style.menuButton}
          onClick={() => setShowMenu(!showMenu)}
          aria-expanded={showMenu}
          aria-label="Toggle navigation menu"
        >
          <span
            className={`${style.hamburger} ${showMenu ? style.active : ""}`}
          >
            <span></span>
            <span></span>
            <span></span>
          </span>
          MENU
        </button>
        <div className={`${style.nav} ${showMenu ? style.show : ""}`}>
          <NavItem
            href="/"
            text="INICIO"
            active={router.pathname === "/"}
            onClick={() => setShowMenu(false)}
          />
          <NavItem
            href="/local"
            text="LOCAL"
            active={router.pathname === "/local"}
            onClick={() => setShowMenu(false)}
          />
          <NavItem
            href="/artistas"
            text="ARTISTAS"
            active={router.pathname === "/artistas"}
            onClick={() => setShowMenu(false)}
          />
          <NavItem
            href="/blog"
            text="INFORMACIÓN"
            active={router.pathname === "/blog"}
            onClick={() => setShowMenu(false)}
          />
        </div>
      </div>
    </nav>
  );
};

const NavItem = ({ href, text, active, onClick }) => {
  return (
    <div className={`${style.navItem} ${active ? style.active : ""}`}>
      <Link
        href={href}
        aria-current={active ? "page" : undefined}
        onClick={onClick}
      >
        {text}
      </Link>
    </div>
  );
};

export default Nav;
