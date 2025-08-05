import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import "./ImageSlider.css";

function ImageSlider({ imageCover, images }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const allImages = [imageCover, ...images];

  return (
    <>
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2 rounded"
      >
        {allImages.map((img, i) => (
          <SwiperSlide key={i}>
            <img src={img} alt={`main-${i}`} className="md:w-[90%]  w-full object-contain" />
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={8}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper mt-3"
      >
        {allImages.map((img, i) => (
          <SwiperSlide key={i}>
            <img src={img} alt={`thumb-${i}`} className="rounded w-[85%] h-20 object-cover" />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

export default ImageSlider;
