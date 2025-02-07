import { useState, useEffect } from "react";

const useImagePreviews = (featuredImage, detailsImages) => {
  const [previewImages, setPreviewImages] = useState([]);

  useEffect(() => {
    const getImageUrls = (files) => 
      files ? Array.from(files).map((file) => URL.createObjectURL(file)) : [];

    const featureImageUrls = getImageUrls(featuredImage);
    const detailsImageUrls = getImageUrls(detailsImages);

    setPreviewImages([...featureImageUrls, ...detailsImageUrls]);

    // Cleanup URLs on unmount to prevent memory leaks
    return () => {
      [...featureImageUrls, ...detailsImageUrls].forEach((url) => URL.revokeObjectURL(url));
    };
  }, [featuredImage, detailsImages]);

  return previewImages;
};

export default useImagePreviews;
