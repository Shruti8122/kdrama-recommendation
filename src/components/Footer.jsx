import React, { useEffect, useState } from "react";

export default function Footer({ setShowAbout }) {
  const [theme, setTheme] = useState(
    document.documentElement.getAttribute("data-bs-theme") || "light"
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setTheme(document.documentElement.getAttribute("data-bs-theme"));
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-bs-theme"],
    });

    return () => observer.disconnect();
  }, []);

  const isLight = theme === "light";

  return (
    <footer
      className={`pt-4 mt-5 ${isLight ? "bg-dark text-light" : "bg-light text-dark"
        }`}
      style={{ position: "relative" }}
    >
      <div className="container">
        <div className="row">

          <div className="col-md-4 mb-3">
            <h5 className="text-uppercase">K-Drama Suggestion</h5>
            <p className={isLight ? "text-secondary" : "text-muted"}>
              A simple React application built using Bootstrap styling.
            </p>
          </div>

          <div className="col-md-4 mb-3">
            <h5 className="text-uppercase">Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <a
                  href="/"
                  className={`text-decoration-none ${isLight ? "text-light" : "text-dark"
                    }`}
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className={`text-decoration-none ${isLight ? "text-light" : "text-dark"
                    }`}
                  onClick={(e) => {
                    e.preventDefault();
                    setShowAbout(true);
                  }}
                >
                  About
                </a>

              </li>
            </ul>
          </div>

          <div className="col-md-4 mb-3">
            <h5 className="text-uppercase">Contact</h5>
            <p className="mb-1">📍 India</p>
            <p className="mb-1">📧 k-suggestion@example.com</p>
          </div>

        </div>

        <hr className={isLight ? "border-secondary" : "border-dark"} />

        <div className="text-center pb-3">
          <small>
            © {new Date().getFullYear()} K-Drama Suggestion | Educational Project
          </small>
        </div>
      </div>
    </footer>
  );
}
