import { ChevronDown, ChevronUp, Menu, X } from "lucide-react";
import { useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Header = ({ bgColor = "", text = "", border = "" }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openServiceMenu, setOpenServiceMenu] = useState(false);
  const location = useLocation();

  const headerRef = useRef(null);
  const sidebarRef = useRef(null);
  const overlayRef = useRef(null);

  /* ================= HEADER ENTRY ANIMATION ================= */
  useGSAP(
    () => {
      gsap.from(".animate-item", {
        y: -40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        clearProps: "all",
      });
    },
    { scope: headerRef }
  );

  /* ================= MOBILE SIDEBAR ANIMATION ================= */
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
      onComplete: () => {
        setIsMobileMenuOpen(false);
        setOpenServiceMenu(false);
      },
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
      className={`fixed top-0 left-0 w-full h-[12vh] z-50 flex items-center
        transition-colors duration-300 px-3 lg:px-14
        ${bgColor || "bg-orange-100"} ${text}`}
    >
      <nav className="container mx-auto flex justify-between items-center">
        {/* LOGO */}
        <Link
          to="/"
          className="animate-item text-3xl italic font-bold font-montserrat"
        >
          Tmt
        </Link>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`animate-item font-montserrat transition
                ${
                  location.pathname === item.path
                    ? "text-amber-500 font-semibold"
                    : text || "text-[#161000]"
                }
                hover:text-amber-300`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* DESKTOP CONTACT */}
        <div
          className={`animate-item hidden md:block border rounded-full px-9 py-3
            ${border || "border-[#B58718]"} ${text || "text-[#B58718]"}
            hover:text-black transition`}
        >
          <Link to="/contact-us">Contact Us</Link>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden animate-item"
          onClick={openSidebar}
        >
          <Menu size={28} className="text-black" />
        </button>
      </nav>

      {/* ================= MOBILE SIDEBAR ================= */}
      {isMobileMenuOpen && (
        <div
          ref={overlayRef}
          className="fixed inset-0 bg-black/40 z-50 flex"
        >
          {/* SIDEBAR */}
          <div
            ref={sidebarRef}
            className="relative w-72 bg-white h-full shadow-xl p-6"
          >
            {/* ❌ CANCEL ICON (FIXED & CLEAR) */}
            <button
              onClick={closeSidebar}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition"
            >
              <X size={26} className="text-black" />
            </button>

            {/* LINKS */}
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

              {/* CONTACT */}
              <Link
                to="/contact-us"
                onClick={closeSidebar}
                className="inline-block mt-6 text-[#B58718] border border-[#B58718]
                  rounded-full px-6 py-2 hover:text-black"
              >
                Contact Us
              </Link>
            </div>
          </div>

          {/* OVERLAY CLICK */}
          <div className="flex-1" onClick={closeSidebar}></div>
        </div>
      )}
    </header>
  );
};

export default Header;
