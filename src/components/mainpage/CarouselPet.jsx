import { Carousel } from "@material-tailwind/react";
import React from "react";
 
export default function CarouselPet() {
  return (
    <Carousel
      className="rounded-xl"
      navigation={({ setActiveIndex, activeIndex, length }) => (
        <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
          {new Array(length).fill("").map((_, i) => (
            <span
              key={i}
              className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
              }`}
              onClick={() => setActiveIndex(i)}
            />
          ))}
        </div>
      )}
    >
      <img
        src="https://i.pinimg.com/564x/8c/40/75/8c407526391d0874e3ed95f50fa5e3fc.jpg"
        alt="image 1"
        className="h-full w-full object-cover"
      />
      <img
        src="https://i.pinimg.com/564x/58/6c/7c/586c7c1310d252e8be58399815b74e2f.jpg"
        alt="image 2"
        className="h-full w-full object-cover"
      />
      <img
        src="https://i.pinimg.com/564x/22/74/bd/2274bdf3de630f49d59bbbcb48066e49.jpg"
        alt="image 3"
        className="h-full w-full object-cover"
      />
    </Carousel>
  );
}