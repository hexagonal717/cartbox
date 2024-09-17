import { useState, useEffect, useCallback } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui-custom/carousel';
import { Button } from '@/components/ui-custom/button';
import { cn } from '@/lib/utils';
import {
  useMediaQuery
} from '@mui/material';

const images = [
  'https://placehold.co/1000x200',
  'https://placehold.co/1000x200',
  'https://placehold.co/1000x200',
];

const mobImages = [
  'https://placehold.co/1000x400',
  'https://placehold.co/1000x400',
  'https://placehold.co/1000x400',
];

const HomePageCarousel = () => {
  const [api, setApi] = useState(null);
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const isMobile = useMediaQuery('(max-width: 1024px)');

  const selectedImages = isMobile ? mobImages : images;

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    const handleSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    api.on('select', handleSelect);

    return () => {
      api.off('select', handleSelect); // Clean up event listener
    };
  }, [api]);

  const handleDotClick = useCallback(
    (index) => {
      api?.scrollTo(index);
    },
    [api]
  );

  return (
    <Carousel
      setApi={setApi}
      className="w-full max-w-[102rem] mx-auto relative"
      opts={{
        loop: true,
      }}
    >
      <CarouselContent>
        {selectedImages.map((src, index) => (
          <CarouselItem key={index}>
            <div className="p-0">
              <img src={src} alt={`Slide ${index + 1}`} className="w-full h-auto" />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      {/* Dots Navigation */}
      {count > 0 && (
        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
          {Array.from({ length: count }).map((_, index) => (
            <Button
              key={index}
              variant="outline"
              size="icon"
              className={cn(
                'w-2 h-2 rounded-full p-0 bg-white',
                current === index ? 'opacity-100' : 'opacity-50'
              )}
              onClick={() => handleDotClick(index)}
            />
          ))}
        </div>
      )}

      {/* Previous and Next buttons */}
      <CarouselPrevious className={cn('absolute left-2', isMobile && '-translate-y-1/2')} />
      <CarouselNext className={cn('absolute right-2', isMobile && '-translate-y-1/2')} />
    </Carousel>
  );
}

export default HomePageCarousel
