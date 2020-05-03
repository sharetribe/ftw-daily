import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import featured1 from "./featuredin/1.png";
import featured2 from "./featuredin/2.png";
import featured3 from "./featuredin/3.png";
import featured4 from "./featuredin/4.png";
 
const FeaturedIn = () => {
  const handleOnDragStart = (e) => e.preventDefault()
  return (
    <AliceCarousel 
    mouseTrackingEnabled
    responsive
    autoPlay
    autoPlayInterval={5000} >
      <img src={featured1} onDragStart={handleOnDragStart} />
      <img src={featured2} onDragStart={handleOnDragStart} />
      <img src={featured3} onDragStart={handleOnDragStart} />
      <img src={featured4} onDragStart={handleOnDragStart} />
    </AliceCarousel>
  )
}

export default FeaturedIn;