import { useState } from "react";

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

const ProductGallery = ({ images, productName }: ProductGalleryProps) => {
  const [activeImage, setActiveImage] = useState(0);

  return (
    <div className="flex gap-4">
      {/* Thumbnails */}
      <div className="flex flex-col gap-2 w-20">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setActiveImage(index)}
            className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
              activeImage === index
                ? "border-sage-500 shadow-md"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <img
              src={image}
              alt={`${productName} ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>

      {/* Main Image */}
      <div className="flex-1">
        <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden">
          <img
            src={images[activeImage]}
            alt={productName}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductGallery;
