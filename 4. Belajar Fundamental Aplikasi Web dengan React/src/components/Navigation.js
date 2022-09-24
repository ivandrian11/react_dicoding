import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FiHome, FiArchive, FiMoon, FiSun, FiLogOut } from "react-icons/fi";
import LocaleContext from "../contexts/LocaleContext";

function Navigation({ theme, toggleTheme, logout }) {
  const { locale, toggleLocale } = React.useContext(LocaleContext);

  return (
    <header>
      <h1 className="navigation">
        <Link to="/">
          <FiHome />
        </Link>
      </h1>
      <button className="navigation toggle-theme" type="button" onClick={toggleLocale}>
        {locale === "id" ? "en" : "id"}
      </button>
      <button className="navigation toggle-theme" type="button" onClick={toggleTheme}>
        {theme === "light" ? <FiMoon /> : <FiSun />}
      </button>
      {logout && (
        <>
          <nav className="navigation">
            <Link to="/archive">
              <FiArchive />
            </Link>
          </nav>
          <button className="navigation toggle-theme" type="button" onClick={logout}>
            <FiLogOut />
          </button>
        </>
      )}
    </header>
  );
}

Navigation.propTypes = {
  theme: PropTypes.string.isRequired,
  toggleTheme: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
};

export default Navigation;
