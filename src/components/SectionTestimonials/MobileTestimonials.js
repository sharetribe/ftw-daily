import React from "react";
import AliceCarousel from "react-alice-carousel";
import css from './SectionTestimonials.module.css';
import {
  testimonialSection,
  quote1, author1, authorJob1, authorLoc1,
  quote2, author2, authorJob2, authorLoc2,
  quote3, author3, authorJob3, authorLoc3,
  quote4, author4, authorJob4, authorLoc4,
} from './helpers';

const MobileTestimonials = () => {
  const responsive = {
    0: { items: 1 },
    630: { items: 2 },
  };
  const handleOnDragStart = e => e.preventDefault();
  const items = [
    testimonialSection(quote1, author1, authorJob1, authorLoc1),
    testimonialSection(quote2, author2, authorJob2, authorLoc2),
    testimonialSection(quote3, author3, authorJob3, authorLoc3),
    testimonialSection(quote4, author4, authorJob4, authorLoc4),
  ];

  return (
    <AliceCarousel
      mouseTrackingEnabled
      responsive={responsive}
      autoPlay
      autoPlayInterval={5000}
      items={items}
    />
  );
};

export default MobileTestimonials;
