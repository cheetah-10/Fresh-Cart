import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import sliderImage1 from '../../assets/finalProject assets/images/slider-image-1.jpeg'
import sliderImage2 from '../../assets/finalProject assets/images/slider-image-2.jpeg'
import sliderImage3 from '../../assets/finalProject assets/images/slider-image-3.jpeg'
import sliderImage4 from '../../assets/finalProject assets/images/slider-2.jpeg'
import sliderImage5 from '../../assets/finalProject assets/images/grocery-banner.png'
import sliderImage6 from '../../assets/finalProject assets/images/grocery-banner-2.jpeg'

export default function HomeSlider() {


  var settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay:true,
    autoplaySpeed:3000,
  };

  return (
    <Slider {...settings} >
      <div>
        <img className="w-full h-56 lg:h-80" src={sliderImage1} alt=""/>
      </div>
      <div>
        <img className="w-full h-56 lg:h-80" src={sliderImage2} alt=""/>
      </div>
      <div>
        <img className="w-full h-56 lg:h-80" src={sliderImage3} alt=""/>
      </div>
      <div>
        <img className="w-full h-56 lg:h-80" src={sliderImage4} alt=""/>
      </div>
      <div>
        <img className="w-full h-56 lg:h-80" src={sliderImage5} alt=""/>
      </div>
      <div>
        <img className="w-full h-56 lg:h-80" src={sliderImage6} alt=""/>
      </div>
    </Slider>
  );
}
