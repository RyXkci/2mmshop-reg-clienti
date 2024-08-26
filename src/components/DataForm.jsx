import { useState } from "react";

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
      <form className="post-form" onSubmit={handleSubmit}>
        <div className="data-section">
          <div className="form-input"></div>
          <div className="form-input">
            <label htmlFor="firstname">Nome</label>
            <input
              type="text"
              id="firstname"
              placeholder="nome"
              value={formData.firstName}
              name="firstName"
              onChange={updateFormData}
            />
          </div>
          <div className="form-input">
            <label htmlFor="lastname">Cognome</label>
            <input
              type="text"
              id="lastname"
              placeholder="cognome"
              value={formData.lastName}
              name="lastName"
              onChange={updateFormData}
            />
          </div>
          <div className="form-input">
            <label htmlFor="phonenumber">Numero di telefono</label>
            <input
              type="text"
              id="phonenumber"
              placeholder="numero di telefono"
              value={formData.phoneNumber}
              name="phoneNumber"
              onChange={updateFormData}
            />
          </div>
          <div className="form-dropdown">
            <label htmlFor="sex">Sesso</label>
            <select
              name="sex"
              id="sex"
              value={formData.sex}
              onChange={updateFormData}
            >
              <option value=""></option>
              <option value="m">m</option>
              <option value="f">f</option>
            </select>
          </div>
        </div>
        <div className="sizes-section">
          <div className="form-dropdown">
            <label htmlFor="tshirt">Maglietta:</label>
            <select
              name="tshirtSize"
              id="tshirt"
              value={formData.tshirtSize}
              onChange={updateFormData}
            >
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
              name="trouserSize"
              id="trousers"
              value={formData.trouserSize}
              onChange={updateFormData}
            >
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
              name="shoeSize"
              id="shoes"
              value={formData.shoeSize}
              onChange={updateFormData}
            >
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
        <button onClick={handleSubmit}>Submit</button>
      </form>
    </main>
  );
}
