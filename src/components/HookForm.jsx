import { useState } from "react";
import { useForm } from "react-hook-form";

import Success from "./Success";

import "../stylesheets/form.css";

export default function HookForm() {
  const values = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    sex: "",
    tShirtSize: "",
    trouserSize: "",
    shoeSize: "",
    givenConsent: false,
  };

  const registerOptions = {
    firstName: {
      required: "Questo campo è obbligatorio",
    },
    lastName: {
      required: "Questo campo è obbligatorio",
    },
    phoneNumber: {
      required: "Questo campo è obbligatorio",
      valueAsNumber: true,
      validate: (value) => !isNaN(value) || "Inserisci un numero valido",
    },
    sex: {
      required: "Seleziona un'opzione",
    },
    tShirtSize: {
      required: "Seleziona un'opzione",
    },
    trouserSize: {
      required: "Seleziona un'opzione",
    },
    shoeSize: {
      required: "Seleziona un'opzione",
    },
    givenConsent: {
      required: "Devi permetterci di utilizzare i tuoi dati",
    },
  };

  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: values,
  });

  const submitData = (formData) => {
    console.log(formData);
  };

  const [isSubmitted, setIsSubmitted] = useState(false);
  return (
    <main className="main">
      <div className="form-container">
        <section className="form-header">
          <h1 className="form-title">Titolo</h1>
          <p className="form-subtitle">Testo per inserimento taglie</p>
        </section>

        <form className="post-form" onSubmit={handleSubmit(submitData)}>
          <article className="data-section has-bottom-border-shadow">
            <h2 className="data-section__title has-bottom-border-shadow">
              Inserisci qui i tuoi dettagli
            </h2>
            <div className="form-input">
              <label htmlFor="firstname">Nome</label>
              <input
                type="text"
                id="firstname"
                name="firstName"
                disabled={isSubmitted}
                {...register("firstName", registerOptions.firstName)}
              />
              <div className="form-danger">
                {errors?.firstName && errors.firstName.message}
              </div>
            </div>
            <div className="form-input">
              <label htmlFor="lastname">Cognome</label>
              <input
                type="text"
                id="lastname"
                name="lastName"
                disabled={isSubmitted}
                {...register("lastName", registerOptions.lastName)}
              />
              <div className="form-danger">
                {errors?.lastName && errors.lastName.message}
              </div>
            </div>
            <div className="form-input">
              <label htmlFor="phone">Numero di telefono</label>
              <input
                type="input"
                id="phone"
                name="phoneNumber"
                disabled={isSubmitted}
                {...register("phoneNumber", registerOptions.phoneNumber)}
              />

              <div className="form-danger">
                {errors?.phoneNumber && errors.phoneNumber.message}
              </div>
            </div>
            <div className="form-dropdown dropdown-white">
              <label htmlFor="sex">Sesso</label>
              <select
                className="form-dropdown has-inner-box-shadow"
                id="sesso"
                name="sesso"
                disabled={isSubmitted}
                {...register("sex", registerOptions.sex)}
              >
                <option value="">Seleziona un'opzione</option>
                <option value="m">M</option>
                <option value="f">F</option>
              </select>
              <div className="form-danger">
                {errors?.sex && errors.sex.message}
              </div>
            </div>
          </article>
          <article className="sizes-section has-bottom-border">
            <h1 className="sizes-section__title has-bottom-border-shadow">
              E inserisci qui le tue taglie!
            </h1>
            <div className="form-dropdown">
              <label htmlFor="tshirt">Maglietta</label>
              <select
                className="has-top-box-shadow"
                id="maglietta"
                name="tShirtSize"
                disabled={isSubmitted}
                {...register("tShirtSize", registerOptions.tShirtSize)}
              >
                <option value="">Seleziona un'opzione</option>
                <option value="xxs">XXS</option>
                <option value="xs">XS</option>
                <option value="s">S</option>
                <option value="m">M</option>
                <option value="l">L</option>
                <option value="xl">XL</option>
                <option value="xxl">XXL</option>
              </select>
              <div className="form-danger">
                {errors?.tShirtSize && errors.tShirtSize.message}
              </div>
            </div>
            <div className="form-dropdown">
              <label htmlFor="pantaloni">Pantaloni</label>
              <select
                className="has-top-box-shadow"
                id="pantaloni"
                name="trouserSize"
                disabled={isSubmitted}
                {...register("trouserSize", registerOptions.trouserSize)}
              >
                <option value="">Seleziona un'opzione</option>
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
              <div className="form-danger">
                {errors?.trouserSize && errors.trouserSize.message}
              </div>
            </div>
            <div className="form-dropdown">
              <label htmlFor="scarpe">Scarpe</label>
              <select
                className="has-top-box-shadow"
                id="scarpe"
                name="shoeSize"
                disabled={isSubmitted}
                {...register("shoeSize", registerOptions.shoeSize)}
              >
                <option value="">Seleziona un'opzione</option>
                <option value="36">36</option>
                <option value="37">37</option>
                <option value="38">38</option>
                <option value="40">40</option>
                <option value="42">42</option>
                <option value="44">44</option>
                <option value="46">46</option>
              </select>
              <div className="form-danger">
                {errors?.shoeSize && errors.shoeSize.message}
              </div>
            </div>
          </article>
          <label htmlFor="consent">
            Do il consenso al trattamento dei dati
          </label>
          <input
            id="consent"
            type="checkbox"
            name="givenConsent"
            disabled={isSubmitted}
            {...register("givenConsent", registerOptions.givenConsent)}
          />
          <div className="form-danger">
            {errors?.givenConsent && errors.givenConsent.message}
          </div>
          <button
            type="submit"
            disabled={isSubmitted}
            className=" form-button has-top-border-shadow"
          >
            Invia
          </button>
        </form>
      </div>
    </main>
  );
}
