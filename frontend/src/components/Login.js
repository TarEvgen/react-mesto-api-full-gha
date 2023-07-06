import { useState } from 'react';

function Login({ handleLogin }) {
  const [formValue, setFormValue] = useState({
    email: '',
    password: '',
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
    handleLogin(email, password);
  };

  return (
    <form onSubmit={handleSubmit} className='form'>
      <h2 className='form__name'>Вход</h2>
      <input
        value={formValue.email}
        className='form__input'
        placeholder='Email'
        name='email'
        onChange={handleChange}
      />
      <input
        value={formValue.password}
        type='password'
        className='form__input'
        placeholder='Пароль'
        name='password'
        onChange={handleChange}
      />
      <button className='form__button' type='submit' onSubmit={handleSubmit}>
        Войти
      </button>
    </form>
  );
}

export default Login;
