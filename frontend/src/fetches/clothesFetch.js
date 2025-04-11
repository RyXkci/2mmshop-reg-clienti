const apiUrl = import.meta.env.VITE_API_URL;

const getClothes = async() => {
    const response = await fetch(`${apiUrl}/api/clothing`);
      const json = await response.json();
      return json;
}

const getSingleClothes = async (id) => {
  const response = await fetch(`${apiUrl}/api/clothing/${id}`);
  const json = await response.json();
  return json;
}

const postClothes = async(clothes) => {
        const price = parseFloat(clothes.price);
    const discount = parseFloat(clothes.discount);
    clothes.discountedPrice = price - (price * discount) / 100;
    const formData = new FormData();
    console.log("CLOTHES IN UPLOAD:", clothes);

    // Append the clothing object's metadata
    formData.append("type", clothes.type);
    formData.append("category", clothes.category);
    formData.append("name", clothes.name);
    formData.append("price", clothes.price);
    formData.append("discountedPrice", clothes.discountedPrice);
    formData.append("description", clothes.description);
    clothes.sizes.forEach((size) => {
      formData.append("sizes", size);
    });
    formData.append("sex", clothes.sex);

    // Append featured image (one file per clothing item)
    if (clothes.featuredImage) {
      formData.append("featured", clothes.featuredImage[0]);
    }

    // Append each image for the current clothing object
    Array.from(clothes.detailsImages).forEach((image, imgIndex) => {
      formData.append("details", image);
    });

    console.log(formData);

    try {
      const response = await fetch(`${apiUrl}/api/clothing`, {
        method: "POST",

        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      return result;

} catch(error) {
    console.error("Error uploading data:", error);
}
}

const deleteClothes = async () => {
  try {
    const response = await fetch(`${apiUrl}/api/clothing/delete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    console.log("Deleted", result);
  } catch (error) {
    console.error("Error uploading data:", error);
  }
};

export {getClothes, getSingleClothes, postClothes, deleteClothes};