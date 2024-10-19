import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import Introduction from "./Introduction";
import Result from "./Result";
import Spinner from "./Spinner";

import { values } from "../utils/formUtils";
import { registerOptions } from "../utils/formUtils";

import "../stylesheets/form.css";
import "../stylesheets/introduction.css";

import { postData } from "../utils/fetches";

import { success, fail } from "../utils/resultText.json";

const apiUrl = import.meta.env.VITE_API_URL;

export default function HookForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [isIntro, setIsIntro] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [resultText, setResultText] = useState(null);
  const [isSuccess, setIsSuccess] = useState(true); // STATE TO DETERMINE RESULT COMPONENT RESET

  useEffect(() => {
    const pingServer = async () => {
      try {
        // ping server to wake up to diminish spin up time in bg
        const response = await fetch(`${apiUrl}/api/ping`);
        if (response.ok) {
          console.log("Pinged");
        } else {
          console.error("Failed to ping the server");
        }
      } catch (error) {
        console.error("Error pinging the server", error);
      }
    };

    pingServer();
  }, []);

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

  const submitData = async (formData) => {
    setIsLoading(true);
    const trimmedPhoneNumber = formData.phoneNumber.replace(/\s+/g, ""); // Remove all spaces from number
    const newClient = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      phoneNumber: `${formData.phonePrefix}${trimmedPhoneNumber}`, //numbers must be saved as single string plus prefix
      sex: formData.sex,
      sizes: {
        tshirtSize: formData.tshirtSize,
        trouserSize: formData.trouserSize,
        shoeSize: formData.shoeSize,
      },
      givenConsent: formData.givenConsent,
    };

    const response = await postData(newClient);
    if (!response.error) {
      setIsLoading(false);
      setIsSuccess(true);
      setIsSubmitted(!isSubmitted);
      setResultText(success); //dynamic result component
    } else {
      setIsLoading(false);
      setIsSuccess(false);
      setIsSubmitted(!isSubmitted);
      setResultText(fail); //dynamic result component
    }
  };

  const clearResult = () => {
    setIsSubmitted(false);
    isSuccess && reset(values); //if result is success, clear form on reset, otherwise keep it
  };

  return (
    <main className="main">
      {isIntro ? (
        <Introduction />
      ) : (
        <>
          <div className="form-container">
            <section className="form-header">
              <div className="form-header-logo">
                <section className="intro-container-circle sm">
                  <h1 className="intro__title">
                    <span className="intro__title-large">2</span>
                    <span className="intro__title-small">mm</span>
                    <span className="intro-title-break">shop</span>
                  </h1>
                  <p className="intro__subtitle">MyStyleBox</p>
                </section>
              </div> { /*WILL BECOME OWN COMPONENT */}
              <div className="form-header-subtitle">
                <p>Il piacere di indossare ciò che vi rende unici</p>
              </div>
              <div className="form-header-description">
              <p>Compila il form e ricevi offerte su misura</p>
              </div>

              {/* <h1 className="form-title">MyStyle<span className="form-title-text-orange">Box</span></h1>
            <p className="form-subtitle">Inserisci le tue taglie per ricevere <span className="form-title-text-orange">promozioni</span> su <span className="form-title-text-orange">misura!</span></p> */}
            </section>

            <form className="post-form" onSubmit={handleSubmit(submitData)}>
              <article className="data-section has-bottom-border-shadow">
                <div className="form-input">
                  <label htmlFor="firstname">Nome</label>
                  <input
                    type="text"
                    id="firstname"
                    name="firstName"
                    disabled={isSubmitted}
                    {...register("firstName", registerOptions.firstName)}
                    placeholder="Nome"
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
                    placeholder="Cognome"
                  />
                  <div className="form-danger">
                    {errors?.lastName && errors.lastName.message}
                  </div>
                </div>
                <div className="form-input">
                  <label htmlFor="phone">Numero di telefono</label>
                  <div className="flex-row dropdown-white">
                    <select
                      name="phonePrefix"
                      className="has-left-border-radius"
                      id="phonePrefix"
                      disabled={isSubmitted}
                      {...register("phonePrefix", registerOptions.phonePrefix)}
                    >
                      <option value="+39">+39</option>
                    </select>
                    <input
                      type="input"
                      className="has-right-border-radius"
                      id="phone"
                      name="phoneNumber"
                      disabled={isSubmitted}
                      {...register("phoneNumber", registerOptions.phoneNumber)}
                      placeholder="Cellulare"
                    />
                  </div>
                  <div className="form-danger">
                    {errors?.phoneNumber && errors.phoneNumber.message}
                  </div>
                </div>
                <div className="form-dropdown dropdown-light">
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
                    name="tshirtSize"
                    disabled={isSubmitted}
                    {...register("tshirtSize", registerOptions.tshirtSize)}
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
                    {errors?.tshirtSize && errors.tshirtSize.message}
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
              <div className="form-input row-ls">
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
              </div>
              <button
                type="submit"
                disabled={isSubmitted}
                className="form-button btn-fill-dark has-top-border-shadow"
              >
                Invia
              </button>
            </form>
            {isLoading && <Spinner />}
          </div>
          {isSubmitted && (
            <Result content={resultText} clickFunc={clearResult} />
          )}
        </>
      )}

      {/* once submitted, it renders a result page with dynamic text based on whether or not post was succesful */}
    </main>
  );
}
