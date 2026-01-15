import { Menu, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const location = useLocation();

  const headerRef = useRef(null);
  const sidebarRef = useRef(null);
  const overlayRef = useRef(null);

  /* ================= SCROLL EFFECT ================= */
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ================= HEADER ENTRY ANIMATION ================= */
  useGSAP(
    () => {
      gsap.from(".animate-item", {
        y: -40,
        opacity: 0,
        duration: 0.45,
        stagger: 0.1,
        ease: "power2.out",
        clearProps: "all",
      });
    },
    { scope: headerRef }
  );

  /* ================= MOBILE SIDEBAR ================= */
  const openSidebar = () => {
    setIsMobileMenuOpen(true);

    requestAnimationFrame(() => {
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3 }
      );

      gsap.fromTo(
        sidebarRef.current,
        { x: "100%" },
        { x: "0%", duration: 0.45, ease: "power3.out" }
      );
    });
  };

  const closeSidebar = () => {
    gsap.to(sidebarRef.current, {
      x: "100%",
      duration: 0.35,
      ease: "power3.in",
    });

    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.25,
      onComplete: () => setIsMobileMenuOpen(false),
    });
  };

  /* ================= NAV DATA ================= */
  const navItems = [
    { name: "About Us", path: "/about" },
    { name: "Our Services", path: "/our-services" },
    { name: "Careers", path: "/careers" },
    { name: "Blogs", path: "/blogs" },
  ];

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 w-full h-[10vh] lg:h-[12vh] z-50 
      flex items-center transition-all duration-500
      ${isScrolled
        ? "bg-slate-500/10 backdrop-blur-md border-white/20 shadow-sm"
        : "bg-transparent"
      }`}
    >
      {/* ================= CENTERED WRAPPER ================= */}
      <nav
        className="mx-auto flex w-full items-center justify-between px-4 lg:px-0"
        style={{ maxWidth: "87vw" }}
      >
        {/* LOGO */}
        <Link
          to="/"
          className="animate-item text-3xl italic font-bold font-montserrat"
        >
          LOGO
        </Link>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`animate-item transition font-montserrat
                ${
                  location.pathname === item.path
                    ? "text-amber-500 font-semibold"
                    : "text-[#161000]"
                }
                hover:text-amber-300`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* DESKTOP CONTACT */}
        <div className="hidden md:block animate-item">
          <Link
            to="/contact-us"
            className="border border-gray-600 text-black
            rounded-full px-7 py-2 hover:text-black transition"
          >
            Contact Us
          </Link>
        </div>

        {/* MOBILE MENU */}
        <button className="md:hidden animate-item" onClick={openSidebar}>
          <Menu size={28} className="text-black" />
        </button>
      </nav>

      {/* ================= MOBILE SIDEBAR ================= */}
      {isMobileMenuOpen && (
        <div
          ref={overlayRef}
          className="fixed inset-0 bg-black/40 z-50 flex"
        >
          <div
            ref={sidebarRef}
            className="relative w-72 bg-white h-full shadow-xl p-6"
          >
            <button
              onClick={closeSidebar}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100"
            >
              <X size={26} />
            </button>

            <div className="mt-14 space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={closeSidebar}
                  className={`block text-[17px]
                    ${
                      location.pathname === item.path
                        ? "text-amber-500 font-semibold"
                        : "text-black"
                    }`}
                >
                  {item.name}
                </Link>
              ))}

              <Link
                to="/contact-us"
                onClick={closeSidebar}
                className="inline-block mt-6 border border-[#B58718]
                text-[#B58718] rounded-full px-6 py-2 hover:text-black"
              >
                Contact Us
              </Link>
            </div>
          </div>

          <div className="flex-1" onClick={closeSidebar}></div>
        </div>
      )}
    </header>
  );
};

export default Header;
