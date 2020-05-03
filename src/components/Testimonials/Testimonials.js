import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import css from "../../containers/LandingPage/LandingPage.css";

const Testimonials = () => {
  const responsive = {
    0: { items: 1 },
    630: { items: 2 },
  };
  const handleOnDragStart = e => e.preventDefault();
  return (
    <AliceCarousel
      mouseTrackingEnabled
      responsive={responsive}
      autoPlay
      autoPlayInterval={5000}
    >
      <div className={css.testimonial}>
        <p className={css.tContent}>
          I love being a Pet Sitter. I am free to choose the location and dates
          that suit me. I get to meet amazing animals and their owners. I get to
          stay in some amazing locations and houses. The best job ever!
        </p>
        <div className={css.testimonialAuthor}>
          <img src="https://thumbs.dreamstime.com/b/default-avatar-profile-icon-grey-photo-placeholder-women-default-avatar-profile-icon-grey-photo-placeholder-illustrations-vectors-99724605.jpg" />
          <span className={css.testR}>
            <p className={css.smallAuthor}>
              Julie O - <span className={css.tLoc}>UK</span>
            </p>
          </span>
        </div>
      </div>
      <div className={css.testimonial}>
        <p className={css.tContent}>
          There's many things I love about a pet sitter, I love getting to spend
          so much time with a variety of loving pets. The relationship I build
          with them and their owners is lovely and very rewarding.
        </p>
        <div className={css.testimonialAuthor}>
          <img src="https://thumbs.dreamstime.com/b/default-avatar-profile-icon-grey-photo-placeholder-women-default-avatar-profile-icon-grey-photo-placeholder-illustrations-vectors-99724605.jpg" />
          <span className={css.testR}>
            <p className={css.smallAuthor}>
              Holly P - <span className={css.tLoc}>UK</span>
            </p>
          </span>
        </div>
      </div>
      <div className={css.testimonial}>
        <p className={css.tContent}>
        I love being a pet sitter because I am surrounded by animals and enjoy the chance to look after them. I know how important is to have someone reliable to look after your pets and I love what I do.
        </p>
        <div className={css.testimonialAuthor}>
          <img src="https://thumbs.dreamstime.com/b/default-avatar-profile-icon-grey-photo-placeholder-women-default-avatar-profile-icon-grey-photo-placeholder-illustrations-vectors-99724605.jpg" />
          <span className={css.testR}>
            <p className={css.smallAuthor}>
              Paula Alexandra - <span className={css.tLoc}>UK</span>
            </p>
          </span>
        </div>
      </div>
      <div className={css.testimonial}>
        <p className={css.tContent}>
          I love getting to know the pets and travelling to different locations.
          When you watch a pet in their own home it ends up feeling like you are
          home too. I love being a Pet Sitter!
        </p>
        <div className={css.testimonialAuthor}>
          <img src="https://thumbs.dreamstime.com/b/default-placeholder-profile-icon-avatar-gray-man-90197971.jpg" />
          <span className={css.testR}>
            <p className={css.smallAuthor}>
              Sebastian D - <span className={css.tLoc}>Europe</span>
            </p>
          </span>
        </div>
      </div>
    </AliceCarousel>
  );
};

export default Testimonials;
