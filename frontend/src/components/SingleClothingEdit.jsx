// import { useState, useEffect } from "react";
// import { v4 as uuid } from "uuid";

// import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";

// import { getSingleClothes } from "../fetches/clothesFetch";

// import { useParams, useSearchParams } from "react-router-dom";

// import ClothesForm from "./ClothesForm";

// import {
//   clothesValues,
//   clothesSizes,
//   clothesCategories,
//   registerOptions,
//   clothesOptions,
// } from "../utils/clothesFormUtils";

// export default function SingleClothingEdit() {
//   const baseUrl = import.meta.env.VITE_LOCAL_URL;

//   const { id } = useParams();

//   console.log(id);

//   const queryClient = useQueryClient();

//   const query = useQuery({
//     queryKey: ["cloth", id],
//     queryFn: () => getSingleClothes(id),
//   });

//   const cloth = query.data;

//   console.log(cloth)

//   const editFormValues = {...cloth};
//  console.log("VALUES", editFormValues)

//   const sizes = clothesOptions[cloth.type].sizes;
//   // const categories = clothesOptions[cloth.type].categories;


//   // const sizeOptions = clothesSizes[cloth?.type];
//   // const categories = clothesOptions[cloth?.type].cateogories;


//   // console.log("VALUES", editFormValues)
//   // console.log("OPTIONS", clothesOptions)

//   // console.log(clothesOptions[cloth?.type].sizes)

 
//   console.log("SIZES", sizes)
//   // console.log("CATEGORIES", categories)


//   return (
//     <>
//                      {/* <ClothesForm
//                       //  formType={formType}
//                        sizes={sizes}
//                        values={editFormValues}
//                        categories={categories}
//                        // imgPreviews={images}
//                        registerOptions={registerOptions}
//                        // handleFileChange={handleFileChange}
//                       //  handleSave={onSubmit}
//                       //  formPreviewImages={formPreviewImages}
//                      /> */}

//     </>
//   );
// }
