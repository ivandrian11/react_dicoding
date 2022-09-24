import React from "react";
import { Route, Routes } from "react-router-dom";
import { getUserLogged, putAccessToken } from "./utils/network-data";
import HomePage from "./pages/HomePage";
import AddPage from "./pages/AddPage";
import ArchivePage from "./pages/ArchivePage";
import DetailPage from "./pages/DetailPage";
import ErrorPage from "./pages/ErrorPage";
import Navigation from "./components/Navigation";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import LocaleContext from "./contexts/LocaleContext";

function App() {
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [theme, setTheme] = React.useState(localStorage.getItem("theme") || "light");
  const [locale, setLocale] = React.useState(localStorage.getItem("locale") || "id");

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === "light" ? "dark" : "light";
      localStorage.setItem("theme", newTheme);
      return newTheme;
    });
  };

  const toggleLocale = () => {
    setLocale((prevLocale) => {
      const newLocale = prevLocale === "id" ? "en" : "id";
      localStorage.setItem("locale", newLocale);
      return newLocale;
    });
  };

  const localeContextValue = React.useMemo(() => {
    return {
      locale,
      toggleLocale,
    };
  }, [locale]);

  React.useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  React.useEffect(() => {
    getUserLogged().then(({ data }) => {
      setUser(data);
      setLoading(false);
    });
  }, []);

  const onLoginSuccess = async ({ accessToken }) => {
    putAccessToken(accessToken);
    const { data } = await getUserLogged();

    setUser(data);
  };

  const onLogout = () => {
    setUser(null);
    putAccessToken("");
  };

  if (loading) {
    return null;
  }

  return (
    <LocaleContext.Provider value={localeContextValue}>
      <div className="app-container">
        {user === null ? <Navigation theme={theme} toggleTheme={toggleTheme} /> : <Navigation theme={theme} toggleTheme={toggleTheme} logout={onLogout} />}
        <main>
          {user === null ? (
            <Routes>
              <Route path="/*" element={<LoginPage loginSuccess={onLoginSuccess} />} />
              <Route path="/register" element={<RegisterPage />} />
            </Routes>
          ) : (
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/archive" element={<ArchivePage />} />
              <Route path="/add" element={<AddPage />} />
              <Route path="/notes/:id" element={<DetailPage />} />
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          )}
        </main>
      </div>
    </LocaleContext.Provider>
  );
}

export default App;
