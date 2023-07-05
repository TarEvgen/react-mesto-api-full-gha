import { Route, Routes, Link } from "react-router-dom";

function Header({ userEmail, onClick }) {
  return (
    <header className="header">
      <div className="header__logo"></div>
      <Routes>
        <Route
          path="/sign-up"
          element={
            <Link className="header__link" to="/sign-in">
              Войти
            </Link>
          }
        />
        <Route
          path="/sign-in"
          element={
            <Link className="header__link" to="/sign-up">
              Регистрация
            </Link>
          }
        />
        <Route
          path="/"
          element={
            <>
              <p className="header__link header__link_login">{userEmail}</p>
              <Link
                className="header__link header__link_out"
                to="/sign-in"
                onClick={onClick}
              >
                Выйти
              </Link>
            </>
          }
        />
      </Routes>
    </header>
  );
}

export default Header;
