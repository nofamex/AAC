import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import Image from "next/image";

interface SliderProps {
  images: string[];
}

export default function Slider({ images }: SliderProps) {
  return (
    <div className="w-64 h-64 md:h-80 md:w-80 xl:w-landingText lg:h-96">
      <AliceCarousel
        autoPlay
        autoPlayInterval={5000}
        infinite
        animationType="fadeout"
        touchTracking={false}
        disableDotsControls
        disableButtonsControls
      >
        {images.map((image, index) => (
          <div className="w-full h-64 md:h-80 lg:h-96 relative" key={index}>
            <Image
              src={image}
              alt="picture"
              layout="fill"
              className="object-cover rounded-lg"
            />
          </div>
        ))}
      </AliceCarousel>
    </div>
  );
}
