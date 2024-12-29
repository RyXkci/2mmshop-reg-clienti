import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import Introduction from "./Introduction";
import Result from "./Result";
import Spinner from "./Spinner";
import Logo from "./Logo";

import { values } from "../utils/formUtils";
import { registerOptions } from "../utils/formUtils";

import "../stylesheets/form.css";
import "../stylesheets/introduction.css";

import { postData } from "../utils/fetches";

import { success, fail } from "../utils/resultText.json";

const apiUrl = import.meta.env.VITE_API_URL;

export default function HookForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [isIntro, setIsIntro] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [resultText, setResultText] = useState(null); //initially null, changes to either success or fail after form submit
  const [isSuccess, setIsSuccess] = useState(null); // STATE TO DETERMINE RESULT COMPONENT RESET

  const [isFocused, setIsFocused] = useState(true);

  // INTO PAGE IS SHOWN FOR TWO SECONDS, THEN FORM RENDERS
  useEffect(() => {
    // Use setTimeout to update the state after 2000 milliseconds
    const timeoutId = setTimeout(() => {
      setIsIntro(false);
    }, 2000);

    // Cleanup function to clear the timeout if the component unmounts
    return () => clearTimeout(timeoutId);
  }, []); // Empty dependency array ensures the effect runs only once

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
    setFocus,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: values,
  });

  //  SETTING THE AUTOMATIC FOCUS SHIFTING ON DATE INPUT

const watchDay = watch('dobDay');
const watchMonth = watch('dobMonth');
const watchYear = watch('dobYear');

useEffect(() => {
  if (watchDay && watchDay.length === 2) {
    setFocus('dobMonth'); // Move to month field after day is completed
    setIsFocused(false);
  }
}, [watchDay, setFocus]);

useEffect(() => {
  if (watchMonth && watchMonth.length === 2) {
    setFocus('dobYear'); // Move to year field after month is completed
    setIsFocused(false);
  }
}, [watchMonth, setFocus]);

useEffect(() => {
  if (watchYear && watchYear.length === 4) {
    setFocus('phoneNumber'); // Move to year field after month is completed
    setIsFocused(false);
  }
}, [watchYear, setFocus]);

  const submitData = async (formData) => {
    setIsLoading(true);
    const trimmedPhoneNumber = formData.phoneNumber.replace(/\s+/g, ""); // Remove all spaces from number
    console.log(formData.dobDay, formData.dobMonth, formData.dobYear);
    const dob = `${formData.dobYear}-${formData.dobMonth.padStart(
      2,
      "0"
    )}-${formData.dobDay.padStart(2, "0")}`;
    console.log(dob);
    const newClient = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      phoneNumber: `${formData.phonePrefix}${trimmedPhoneNumber}`, //numbers must be saved as single string plus prefix
      dateOfBirth: `${formData.dobYear}-${formData.dobMonth.padStart(
        2,
        "0"
      )}-${formData.dobDay.padStart(2, "0")}`,
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

  const handleFocus = () => {
    setIsFocused(!isFocused);
    setFocus('dobDay')
  }
  return (
    <main className="main">
      {isIntro ? (
        <Introduction />
      ) : (
        <>
          <div className="form-container">
            <section className="form-header">
              <div className="form-header-logo">
                {/* <section className="intro-container-circle sm">
                  <h1 className="intro__title">
                    <span className="intro__title-large">2</span>
                    <span className="intro__title-small">mm</span>
                    <span className="intro-title-break">shop</span>
                  </h1>
                  <p className="intro__subtitle">MyStyleBox</p>
                </section> */}
                <Logo size="sm" />
              </div>{" "}
              {/*WILL BECOME OWN COMPONENT */}
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
                  <label className="sr-only" htmlFor="firstname">
                    Nome
                  </label>
                  <input
                  // style={{outline: errors?.firstName ? "1px solid red" : "none"}}
                    type="text"
                    id="firstname"
                    name="firstName"
                    disabled={isSubmitted}
                    {...register("firstName", registerOptions.firstName)}
                    placeholder="Nome"
                  />
                  {errors?.firstName && <div className="form-danger"> {errors.firstName.message}</div>}
                 {/* { <div className="form-danger">
                    {errors?.firstName && errors.firstName.message}
                  </div>} */}
                </div>
                <div className="form-input">
                  <label className="sr-only" htmlFor="lastname">
                    Cognome
                  </label>
                  <input
                    type="text"
                    id="lastname"
                    name="lastName"
                    disabled={isSubmitted}
                    {...register("lastName", registerOptions.lastName)}
                    placeholder="Cognome"
                  />
                  {errors?.lastName && <div className="form-danger"> {errors.lastName.message}</div>}
                  {/* <div className="form-danger">
                    {errors?.lastName && errors.lastName.message}
                  </div> */}
                </div>
                {/* DATE OF BIRTH */}
                <div className="form-input">
                  <div className="flex-row dob-section">
                    {isFocused && <span onClick={handleFocus} className="dob-placeholder">Data di nascita</span>}
                     
                    <label htmlFor="dob-day" className="sr-only">
                      Giorno
                    </label>
                    <div className="dob-input">
                      <input
                        type="number"
                        pattern="\d*"
                        className="num-arrow-hidden has-left-border-radius"
                        id="dob-day"
                        name="dobDay"
                        disabled={isSubmitted}
                        {...register("dobDay", registerOptions.dobDay)}
                        placeholder="DD"
                        // onFocus={handleFocus}
                        // onBlur={handleFocus}
                      />
                      {errors?.dobDay && <div className="form-danger form-danger-sm"> {errors.dobDay.message}</div>}
                      {/* {<div className="form-danger form-danger-sm">
                        {errors?.dobDay && errors.dobDay.message}
                      </div>} */}
                    </div>
                    <div className="dob-input">
                    <label htmlFor="dob-month" className="sr-only">
                      Giorno
                    </label>
                    <input
                      type="number"
                      className="num-arrow-hidden has-no-border-radius"
                      id="dob-month"
                      name="dobMonth"
                      disabled={isSubmitted}
                      {...register("dobMonth", registerOptions.dobMonth)}
                      placeholder="MM"
                      // onFocus={handleFocus}
                      // onBlur={handleFocus}
                    />
                    {errors?.dobMonth && <div className="form-danger form-danger-sm"> {errors.dobMonth.message}</div>}
                    {/* <div className="form-danger form-danger-sm">
                      {errors?.dobMonth && errors.dobMonth.message}
                    </div> */}
                    </div>
                    <div className="dob-input">
                    <label htmlFor="dob-year" className="sr-only">
                      Giorno
                    </label>
                    <input
                      type="number"
                      className="num-arrow-hidden has-right-border-radius"
                      id="dob-year"
                      name="dobYear"
                      disabled={isSubmitted}
                      {...register("dobYear", registerOptions.dobYear)}
                      placeholder="YYYY"
                      // onFocus={handleFocus}
                      // onBlur={handleFocus}
                    />
                    {errors?.dobYear && <div className="form-danger form-danger-sm"> {errors.dobYear.message}</div>}
                    {/* <div className="form-danger form-danger-sm">
                      {errors?.dobYear && errors.dobYear.message}
                    </div> */}
                  </div>
                    </div>
                    
                  
                </div>
                <div className="form-input">
                  <label className="sr-only" htmlFor="phone">
                    Numero di telefono
                  </label>
                  <div className="flex-row dropdown-light">
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
                      type="text"
                      inputMode="numeric"
                      // pattern="\d*"
                      className="has-right-border-radius"
                      id="phone"
                      name="phoneNumber"
                      disabled={isSubmitted}
                      {...register("phoneNumber", registerOptions.phoneNumber)}
                      placeholder="Cellulare"
                    />
                  </div>
                  {errors?.phoneNumber && <div className="form-danger"> {errors.phoneNumber.message}</div>}
                  {/* <div className="form-danger">
                    {errors?.phoneNumber && errors.phoneNumber.message}
                  </div> */}
                </div>
              </article>
              <section className="form-header">
                <div className="form-header-logo">
                  <Logo size="sm" />
                </div>{" "}
                {/*WILL BECOME OWN COMPONENT */}
                <div className="form-header-subtitle">
                  <p>Il piacere di indossare ciò che vi rende unici</p>
                </div>
                <div className="form-header-description">
                  <p>Compila il form e ricevi offerte su misura</p>
                </div>
                {/* <h1 className="form-title">MyStyle<span className="form-title-text-orange">Box</span></h1>
            <p className="form-subtitle">Inserisci le tue taglie per ricevere <span className="form-title-text-orange">promozioni</span> su <span className="form-title-text-orange">misura!</span></p> */}
              </section>
              <article className="sizes-section has-bottom-border">
                <div className="form-dropdown dropdown-light">
                  <label className="sr-only" htmlFor="sex">
                    Sesso
                  </label>
                  <select
                    className="form-dropdown has-inner-box-shadow max-width"
                    id="sesso"
                    name="sesso"
                    disabled={isSubmitted}
                    {...register("sex", registerOptions.sex)}
                  >
                    <option value="">Sesso</option>
                    <option value="m">M</option>
                    <option value="f">F</option>
                  </select>
                  {errors?.sex && <div className="form-danger"> {errors.sex.message}</div>}
                  {/* <div className="form-danger">
                    {errors?.sex && errors.sex.message}
                  </div> */}
                </div>
                <div className="form-dropdown dropdown-light">
                  <label className="sr-only" htmlFor="tshirt">
                    Maglietta
                  </label>
                  <select
                    className="has-top-box-shadow"
                    id="maglietta"
                    name="tshirtSize"
                    disabled={isSubmitted}
                    {...register("tshirtSize", registerOptions.tshirtSize)}
                  >
                    <option value="">Taglia top</option>
                    <option value="xxs">XXS</option>
                    <option value="xs">XS</option>
                    <option value="s">S</option>
                    <option value="m">M</option>
                    <option value="l">L</option>
                    <option value="xl">XL</option>
                    <option value="xxl">XXL</option>
                  </select>
                  {errors?.tshirtSize && <div className="form-danger"> {errors.tshirtSize.message}</div>}
                  {/* <div className="form-danger">
                    {errors?.tshirtSize && errors.tshirtSize.message}
                  </div> */}
                </div>
                <div className="form-dropdown dropdown-light">
                  <label className="sr-only" htmlFor="pantaloni">
                    Pantaloni
                  </label>
                  <select
                    className="has-top-box-shadow"
                    id="pantaloni"
                    name="trouserSize"
                    disabled={isSubmitted}
                    {...register("trouserSize", registerOptions.trouserSize)}
                  >
                    <option value="">Taglia pantalone</option>
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
                  {errors?.trouserSize && <div className="form-danger"> {errors.trouserSize.message}</div>}
                  {/* <div className="form-danger">
                    {errors?.trouserSize && errors.trouserSize.message}
                  </div> */}
                </div>
                <div className="form-dropdown dropdown-light">
                  <label className="sr-only" htmlFor="scarpe">
                    Scarpe
                  </label>
                  <select
                    className="has-top-box-shadow"
                    id="scarpe"
                    name="shoeSize"
                    disabled={isSubmitted}
                    {...register("shoeSize", registerOptions.shoeSize)}
                  >
                    <option value="">Taglia scarpe</option>
                    <option value="36">36</option>
                    <option value="37">37</option>
                    <option value="38">38</option>
                    <option value="39">39</option>
                    <option value="40">40</option>
                    <option value="41">41</option>
                    <option value="42">42</option>
                    <option value="43">43</option>
                    <option value="44">44</option>
                    <option value="45">45</option>
                    <option value="46">46</option>
                  </select>
                  {errors?.shoeSize && <div className="form-danger"> {errors.shoeSize.message}</div>}
                  {/* <div className="form-danger">
                    {errors?.shoeSize && errors.shoeSize.message}
                  </div> */}
                </div>
              </article>
              <div className="form-input consent-section flex-row">
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
                {errors?.givenConsent && <div className="form-danger"> {errors.givenConsent.message}</div>}
                {/* <div className="form-danger">
                  {errors?.givenConsent && errors.givenConsent.message}
                </div> */}
              </div>
              <button
                type="submit"
                disabled={isSubmitted}
                className="form-button btn-fill has-top-border-shadow"
              >
                Invia
              </button>
            </form>
            {isLoading && <Spinner />}
          </div>
          {isSubmitted && (
            <Result content={resultText} clickFunc={clearResult} isSuccess={isSuccess}  />
          )}
        </>
      )}

      {/* once submitted, it renders a result page with dynamic text based on whether or not post was succesful */}
    </main>
  );
}
