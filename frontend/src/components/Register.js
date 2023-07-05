import { useState } from "react";
import { Link } from "react-router-dom";

function Register({ handelRegister }) {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formValue;
    handelRegister(email, password);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="form">
        <h2 className="form__name">Регистрация</h2>
        <input
          value={formValue.email}
          className="form__input"
          placeholder="Email"
          name="email"
          onChange={handleChange}
        />
        <input
          value={formValue.password}
          type="password"
          className="form__input"
          placeholder="Пароль"
          name="password"
          onChange={handleChange}
        />
        <button onSubmit={handleSubmit} className="form__button" type="submit">
          Зарегистрироваться
        </button>
      </form>
      <div className="form__signin">
        <p>Уже зарегистрированы?</p>
        <Link to="/sign-in" className="form__login-link">
          Войти
        </Link>
      </div>
    </>
  );
}

export default Register;
