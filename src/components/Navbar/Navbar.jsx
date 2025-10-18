"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Styles from "./Navbar.module.css";
import logo from "../../../public/logo4.png"; 

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileDropdown, setMobileDropdown] = useState(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
    setMobileDropdown(null);
  };

  const toggleMobileDropdown = (menu) => {
    setMobileDropdown(mobileDropdown === menu ? null : menu);
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`${Styles.overlay} ${isMenuOpen ? Styles.showOverlay : ""}`}
        onClick={closeMenu}
      ></div>

      <header className={Styles.navWrapper}>
        <div className={Styles.container}>
          {/* Left (Mobile Only) */}
          <Link
            href="/contact"
            className={`${Styles.bookCall} ${Styles.mobileBookCall}`}
          >
            Book a Call <span className={Styles.callIcon}><i className="fa-solid fa-phone"></i></span>
          </Link>

          {/* Center Logo */}
          <div className={Styles.brandLogo}>
            <Link href="/">
              <Image src={logo} alt="HKFinance Logo" className={Styles.logoImg} />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className={Styles.desktopNav}>
            <ul>
              <li><Link href="/">Home</Link></li>

              <li
                className={Styles.dropdown}
                onMouseEnter={() => setActiveDropdown("about")}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                About Us <i className="fa-solid fa-chevron-down"></i>

                {activeDropdown === "about" && (
                  <div className={Styles.dropdownContent}>
                    <Link href="/why-choose-us">Why Choose Us</Link>
                    <Link href="/our-story">Our Story</Link>
                    <Link href="/data-security">Data Security</Link>
                  </div>
                )}
              </li>

              <li
                className={Styles.dropdown}
                onMouseEnter={() => setActiveDropdown("resources")}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                Resources <i className="fa-solid fa-chevron-down"></i>

                {activeDropdown === "resources" && (
                  <div className={Styles.dropdownContent}>
                    <Link href="/blogs">Blogs</Link>
                    <Link href="/case-studies">Case Studies</Link>
                    <Link href="/testimonials">Testimonials</Link>
                  </div>
                )}
              </li>

              <li
                className={Styles.dropdown}
                onMouseEnter={() => setActiveDropdown("services")}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                Services <i className="fa-solid fa-chevron-down"></i>

                {activeDropdown === "services" && (
                  <div className={Styles.dropdownContent}>
                    <Link href="/bookkeeping-accounting">Bookkeeping & Accounting</Link>
                    <Link href="/financial-reporting">Financial Reporting & Analysis</Link>
                    <Link href="/audit-compliance">Audit & Compliance</Link>
                    <Link href="/tax-services">Tax Services</Link>
                  </div>
                )}
              </li>

              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </nav>

          {/* Right (Desktop Book Button + Hamburger on Mobile) */}
          <div className={Styles.rightSide}>
            <Link href="/contact" className={Styles.bookCall}>
              Book a Call <span className={Styles.callIcon}><i className="fa-solid fa-phone"></i></span>
            </Link>
            <button className={Styles.hamburgerBtn} onClick={toggleMenu}>
              <i className="fa-solid fa-bars"></i>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`${Styles.mobileMenu} ${isMenuOpen ? Styles.showMenu : ""}`}>
          <button className={Styles.closeBtn} onClick={closeMenu}>
            <i className="fa-solid fa-xmark"></i>
          </button>

          <ul>
            <li><Link href="/" onClick={closeMenu}>Home</Link></li>

            <li>
              <p onClick={() => toggleMobileDropdown("about")}>
                About Us <i className="fa-solid fa-chevron-down"></i>
              </p>
              <ul className={`${Styles.subMenu} ${mobileDropdown === "about" ? Styles.showSub : ""}`}>
                <li><Link href="/why-choose-us" onClick={closeMenu}>Why Choose Us</Link></li>
                <li><Link href="/our-story" onClick={closeMenu}>Our Story</Link></li>
                <li><Link href="/data-security" onClick={closeMenu}>Data Security</Link></li>
              </ul>
            </li>

            <li>
              <p onClick={() => toggleMobileDropdown("resources")}>
                Resources <i className="fa-solid fa-chevron-down"></i>
              </p>
              <ul className={`${Styles.subMenu} ${mobileDropdown === "resources" ? Styles.showSub : ""}`}>
                <li><Link href="/blogs" onClick={closeMenu}>Blogs</Link></li>
                <li><Link href="/case-studies" onClick={closeMenu}>Case Studies</Link></li>
                <li><Link href="/testimonials" onClick={closeMenu}>Testimonials</Link></li>
              </ul>
            </li>

            <li>
              <p onClick={() => toggleMobileDropdown("services")}>
                Services <i className="fa-solid fa-chevron-down"></i>
              </p>
              <ul className={`${Styles.subMenu} ${mobileDropdown === "services" ? Styles.showSub : ""}`}>
                <li><Link href="/bookkeeping-accounting" onClick={closeMenu}>Bookkeeping & Accounting</Link></li>
                <li><Link href="/financial-reporting" onClick={closeMenu}>Financial Reporting & Analysis</Link></li>
                <li><Link href="/audit-compliance" onClick={closeMenu}>Audit & Compliance</Link></li>
                <li><Link href="/tax-services" onClick={closeMenu}>Tax Services</Link></li>
              </ul>
            </li>

            <li><Link href="/contact" onClick={closeMenu}>Contact</Link></li>
          </ul>
        </div>
      </header>
    </>
  );
};

export default Navbar;
