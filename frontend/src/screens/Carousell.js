import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./Carousel.css";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items:1,
    slidesToSlide: 1 // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 768 },
    items: 1,
    slidesToSlide: 1 // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 767, min: 200 },
    items: 1,
    slidesToSlide: 1 // optional, default to 1.
  }
};
const sliderImageUrl = [
  //First image url
  {
    url:"https://m.media-amazon.com/images/G/31/img23/Beauty/Jupiter23/KSD/headers/revise/HAIRCARE_PC._CB576830289_.png"
  },
  
  //Second image url
  {
    url:
      "https://m.media-amazon.com/images/G/31/img23/Beauty/AWPC/SkincarePC1._CB597570551_.png"
  },
  //Third image url
  {
    url:
      "https://m.media-amazon.com/images/G/31/img23/Beauty/AWPC/HaircarePC1._CB597611545_.png"
  },

];
const Carosuell = () => {
  return (
    <div className="parent">
      <Carousel
        responsive={responsive}
        autoPlay={true}
        autoPlaySpeed={2000}
        swipeable={true}
        draggable={true}
        infinite={true}
        partialVisible={false}
        arrows={false}
        dotListClass="custom-dot-list-style"
      >
        {sliderImageUrl.map((imageUrl, index) => {
          return (
            <div className="slider" key={index}>
              <img src={imageUrl.url} alt="movie" className="mx-auto d-block"/>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};
export default Carosuell;
