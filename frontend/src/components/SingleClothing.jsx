import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"

const apiUrl = import.meta.env.VITE_API_URL;

import ClothCarousel from "./ClothCarousel";

export default function SingleClothing() {
const {id} = useParams();


const [cloth, setCloth] = useState({});

useEffect(() => {
    const fetchCloth = async() => {
        const response = await fetch(`${apiUrl}/api/clothing/${id}`);
        const json = await response.json();
        setCloth(json);
    }

    fetchCloth()
}, [])

console.log(cloth)


    return (
        <>
        <h1>{cloth.name}</h1>
        {/* <ClothCarousel images={cloth} /> */}
        {cloth.images?.details && <ClothCarousel images={cloth.images.details} />}
        {/* {cloth && <ClothCarousel images={cloth.images.details} />} */}
        </>
    )
}