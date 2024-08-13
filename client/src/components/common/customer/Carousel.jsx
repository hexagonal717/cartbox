import { useState } from 'react';

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = [
    'https://via.placeholder.com/800x400',
    'https://via.placeholder.com/800x400',
    'https://via.placeholder.com/800x400',
  ];

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1,
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1,
    );
  };

  return (
    <div className="relative mb-4 w-full overflow-hidden rounded lg:max-w-screen-md">
      <div
        className="flex transition-transform duration-500"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {slides.map((slide, index) => (
          <div key={index} className="w-full flex-shrink-0">
            <img
              src={slide}
              className="w-full object-cover"
              alt={`Slide ${index + 1}`}
            />
          </div>
        ))}
      </div>

      <button
        onClick={handlePrev}
        className="absolute left-2 top-1/2 h-10 w-10 -translate-y-1/2 rounded-full bg-neutral-800
          text-white">
        &#10094;
      </button>

      <button
        onClick={handleNext}
        className="absolute right-2 top-1/2 h-10 w-10 -translate-y-1/2 rounded-full bg-neutral-800
          text-white">
        &#10095;
      </button>
    </div>
  );
};

export default Carousel;
