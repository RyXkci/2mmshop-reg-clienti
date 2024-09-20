import { useState, useEffect } from "react";
import {useNavigate} from 'react-router-dom';

import {useLogin} from "../hooks/useLogin";

export default function Login() {
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
  });

  const {login} = useLogin();
  useEffect(() => {
    const admin = JSON.parse(localStorage.getItem('admin'));
    if (admin) navigate('/admin/tabellaclienti')
  }, [])

  const handleChange = (evt) => {
    setFormData((currData) => {
        return {
            ...currData,
            [evt.target.name]: evt.target.value
        }
    })
  };

  const onSubmit = async(e) => {
    e.preventDefault()

  await login(formData.userName, formData.password);
  navigate('/admin/tabellaclienti');
  }
const navigate = useNavigate();
  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="username">Nome utente</label>
      <input
        type="text"
        id="usernamer"
        name="userName"
        value={formData.userName}
        onChange={handleChange}
      />
      <label htmlFor="password">Password</label>
      <input
        type="text"
        id="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
      />
      
      <button>Login</button>
    </form>
  );
}
