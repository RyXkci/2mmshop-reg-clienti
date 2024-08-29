import { useState } from "react";

import '../stylesheets/form.css'

export default function DataForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    sex: "",

    tshirtSize: "",
    trouserSize: "",
    shoeSize: "",
  });

  const updateFormData = (evt) => {
    setFormData((prevData) => {
      return {
        ...prevData,
        [evt.target.name]: evt.target.value,
      };
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const newClient = {
      name: `${formData.firstName} ${formData.lastName}`,
      number: formData.phoneNumber,
      sex: formData.sex,
      sizes: {
        tShirt: formData.tshirtSize,
        trousers: formData.trouserSize,
        shoes: formData.shoeSize
      },
    };
    console.log(newClient)
    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "Application/JSON",
      },
      body: JSON.stringify(newClient),
    }).then(response => response.json())
  };

  return (
    <main className="main">
      <div className="form-container">
      <h1 className="form-title">Titolo</h1>
      <p className="form-subtitle">Testo per inserimento taglie</p>
      <form className="post-form" onSubmit={handleSubmit}>
        <div className="data-section has-bottom-border-shadow">
          <h1 className="data-section__title has-bottom-border-shadow">Inserisci qui tuoi dettagli</h1>
          <div className="form-input"></div>
          <div className="form-input">
            <label htmlFor="firstname">Nome</label>
            <input
            className="has-inner-box-shadow"
              type="text"
              id="firstname"
              placeholder="Il tuo nome"
              value={formData.firstName}
              name="firstName"
              onChange={updateFormData}
            />
          </div>
          <div className="form-input">
            <label htmlFor="lastname">Cognome</label>
            <input
            className="has-inner-box-shadow"
              type="text"
              id="lastname"
              placeholder="Il tuo cognome"
              value={formData.lastName}
              name="lastName"
              onChange={updateFormData}
            />
          </div>
          <div className="form-input">
            <label htmlFor="phonenumber">Numero di telefono</label>
            <input
            className="has-top-box-shadow"
              type="text"
              id="phonenumber"
              placeholder="Il tuo numero di telefono"
              value={formData.phoneNumber}
              name="phoneNumber"
              onChange={updateFormData}
            />
          </div>
          <div className="form-dropdown dropdown-white">
            <label htmlFor="sex">Sesso</label>
            <select
            className="form-dropdown has-inner-box-shadow"
              name="sex"
              id="sex"
              value={formData.sex}
              onChange={updateFormData}
            >
              <option value="">Scegli un'opzione</option>
              <option value="m">m</option>
              <option value="f">f</option>
            </select>
          </div>
        </div>
        <div className="sizes-section has-bottom-border-shadow">
          <h1 className="sizes-section__title has-bottom-border-shadow">E inserisci qui le tue taglie!</h1>
          <div className="form-dropdown">
            <label htmlFor="tshirt">Maglietta:</label>
            <select
            className="has-top-box-shadow"
              name="tshirtSize"
              id="tshirt"
              value={formData.tshirtSize}
              onChange={updateFormData}
            >
              <option value="">Scegli un'opzione</option>
              <option value="xxs">XXS</option>
              <option value="xs">XS</option>
              <option value="s">S</option>
              <option value="m">M</option>
              <option value="l">L</option>
              <option value="xl">XL</option>
              <option value="xxl">XXL</option>
            </select>
          </div>
          <div className="form-dropdown">
            <label htmlFor="trousers">Pantaloni:</label>
            <select
            className="has-top-box-shadow"
              name="trouserSize"
              id="trousers"
              value={formData.trouserSize}
              onChange={updateFormData}
            >
              <option value="">Scegli un'opzione</option>
              <option value="38">38</option>
              <option value="40">40</option>
              <option value="42">42</option>
              <option value="44">44</option>
              <option value="46">46</option>
              <option value="48">48</option>
              <option value="50">50</option>
              <option value="52">52</option>
              <option value="54">54</option>
              <option value="56">56</option>
              <option value="58">58</option>
            </select>
          </div>
          <div className="form-dropdown">
            <label htmlFor="shoes">Scarpe:</label>
            <select
            className="has-top-box-shadow"
              name="shoeSize"
              id="shoes"
              value={formData.shoeSize}
              onChange={updateFormData}
            >
              <option value="">Scegli un'opzione</option>
              <option value="36">36</option>
              <option value="37">37</option>
              <option value="38">38</option>
              <option value="40">40</option>
              <option value="42">42</option>
              <option value="44">44</option>
              <option value="46">46</option>
            </select>
          </div>
        </div>
        <button className=" form-button has-top-border-shadow" onClick={handleSubmit}>Invia</button>
      </form>
      </div>
    </main>
  );
}
