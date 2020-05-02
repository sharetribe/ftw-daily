import React from "react";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import { injectIntl, intlShape } from "react-intl";
import { isScrollingDisabled } from "../../ducks/UI.duck";
import config from "../../config";
import {
  Page,
  SectionLocations,
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
  SliderHero,
  NamedLink,
  FeaturedIn,
  Button,
  Testimonials,
  NewsletterForm,
} from "../../components";
import { TopbarContainer } from "../../containers";

import carefully from "./carefully.jpg";
import wevet from "./wevet.jpg";
import superhog from "./superhog.jpg";
import yoti from "./yoti.jpg";
import pawsquad from "./pawsquad.png";
import facebookImage from "../../assets/saunatimeFacebook-1200x630.jpg";
import twitterImage from "../../assets/saunatimeTwitter-600x314.jpg";
import featured1 from "./featuredin/1.png";
import featured2 from "./featuredin/2.png";
import featured3 from "./featuredin/3.png";
import featured4 from "./featuredin/4.png";
import elite from './elite.jpg';
import css from "./LandingPage.css";
import discoverCheck from "./select.png";
import discoverShield from "./shield.png";
import discoverNetwork from "./network.png";

export const LandingPageComponent = props => {
  const { history, intl, location, scrollingDisabled } = props;

  // Schema for search engines (helps them to understand what this page is about)
  // http://schema.org
  // We are using JSON-LD format
  const siteTitle = config.siteTitle;
  const schemaTitle = intl.formatMessage(
    { id: "LandingPage.schemaTitle" },
    { siteTitle }
  );
  const schemaDescription = intl.formatMessage({
    id: "LandingPage.schemaDescription"
  });
  const schemaImage = `${config.canonicalRootURL}${facebookImage}`;

  const handleSignUpClick = () => {
    history.push("/signup");
  }

  return (
    <Page
      className={css.root}
      scrollingDisabled={scrollingDisabled}
      contentType="website"
      description={schemaDescription}
      title={schemaTitle}
      facebookImages={[{ url: facebookImage, width: 1200, height: 630 }]}
      twitterImages={[
        {
          url: `${config.canonicalRootURL}${twitterImage}`,
          width: 600,
          height: 314
        }
      ]}
      schema={{
        "@context": "http://schema.org",
        "@type": "WebPage",
        description: schemaDescription,
        name: schemaTitle,
        image: [schemaImage]
      }}
    >
      <LayoutSingleColumn>
        <LayoutWrapperTopbar>
          <TopbarContainer />
        </LayoutWrapperTopbar>
        <LayoutWrapperMain>
        {/* 
          <div className={css.heroContainer}>
            <SectionHero className={css.hero} history={history} location={location} />
          </div>
        */}
        <div className={css.sliderFeaturedWrapper}>
          <div>
          <SliderHero />
          <div className={css.featuredIn}>
              <div className={css.featuredSection}>
              <div className={css.featuredMobile} id="fM">
                <h1>Featured In</h1>
                <FeaturedIn />
              </div>
                <div className={css.featuredWrapper}>
                  <div className={css.featuredItem}>FEATURED IN</div>
                  <a className={css.featuredItem}>
                    <img src={featured1} />
                  </a>
                  <a className={css.featuredItem}>
                    <img src={featured2} />
                  </a>
                  <a className={css.featuredItem}>
                    <img src={featured3} />
                  </a>
                  <a className={css.featuredItem}>
                    <img src={featured4} />
                  </a>
                </div>
              </div>
            </div>
            </div>

        </div>

          <ul className={css.sections}>

            <li className={css.sections}>
            <br />
                 <div className={css.sectionContent}>
                <SectionLocations />
              </div>
            </li>

            <li className={css.sections}>
              <div className={(css.sectionServiceContent, css.sectionWeVet)}>
                <div className={css.WeVetSection}>
                  <h1 className={(css.vettitle)}>
                    Compra y da trabajo a un Peruano
                  </h1>

                <div>  <p className={css.WeVetDiv}>Tú también puedes listar tus productos y servicios en Reactivate Perú en sólo unos minutos.</p>
                  <p className={css.WeVetLearn}>
                    <NamedLink name="AboutUsPage">¡Reactivemos juntos a las Mypes! <span className={css.WeVetArrow}>&rarr;</span></NamedLink>

                    <Button onClick={handleSignUpClick}>Ingresa</Button>
                  </p></div>
                </div>
                <div className={css.WeVetImage}>
                  <img src={wevet} />
                </div>
              </div>
            </li>
            
            <li className={css.sections}>
              <div className={css.sectionHomestay}>
                <div className={css.newstandardSection}>
                  <h1 className={css.vettitle}>
                    ¿Cómo funciona Reactivaté Perú?
                  </h1>
                  <div className={css.newstandardCol}>
                  <div className={css.newstandardItem}>
                    <p className={css.discoverFlex}>
                      <span><img src={discoverCheck} /></span>
                      <span><h2>1. Busca</h2><br />
                            Empieza buscando por ubicación. <br className={css.noPc} /> Una vez queencuentres lo que <br className={css.noPc} /> estabas buscando revisa <br className={css.noPc} />la disponibilidad y realiza <br className={css.noPc} />el pago rápido y fácilmente.</span>
                    </p>
                  </div>
                  <div className={css.newstandardItem}></div>
                  <div className={css.newstandardItem}>
                    <p className={css.discoverFlex}>
                      <span><img src={discoverShield}  /></span>
                      <span><h2>2. Disfruta</h2><br />
                            Recibe tu producto o servicio por <br className={css.noPc} /> parte delvendedor en la fecha<br className={css.noPc} /> seleccionada y disfruta el haber contribuido a <br className={css.noPc} />darle trabajo a un peruano.</span>
                    </p>
                  </div>
                  <div className={css.newstandardItem}></div>
                  <div className={css.newstandardItem}>
                    <p className={css.discoverFlex}>
                      <span><img src={discoverNetwork}  /></span>
                      <span><h2>3. Deja una reseña</h2><br />
                            Si disfrutaste la experiencia, <br className={css.noPc} />déjaselo saber a otros al dejar una<br className={css.noPc} /> reseña. Ayuda a otros a saber a quien eligir.</span>
                    </p>
                  </div>
                  </div>
                </div>
              </div>
            </li>

            <li className={css.sections}>
              <div className={css.sectionHomestay}>
                <div className={css.newstandardSection}>
                  <div className={css.carefullyselectedCol}>
                  <div className={css.carefullyselectedItem}>
                  <h1>We’ve got you Covered</h1>
                    <p>
                       From Dogs, Cats and Rabbits to Gecko’s, Parrots and Horses
                    </p>
                   <ul className={css.carefullyCopy}>
                     <li><img src="https://i.imgur.com/5acrgq1.png" /> Pets are happiest at home in their own environment</li>
                     <li><img src="https://i.imgur.com/5acrgq1.png" /> 1:1 care and attention</li>
                     <li><img src="https://i.imgur.com/5acrgq1.png" /> Get regular updates from your sitter</li>
                     <li><img src="https://i.imgur.com/5acrgq1.png" /> Pets follow their familiar routines when you are away</li>
                     <li><img src="https://i.imgur.com/5acrgq1.png" /> Minimise disruption to your family</li>
                     <li><img src="https://i.imgur.com/5acrgq1.png" /> Choose the sitter that is right for your pets</li>
                     <li><img src="https://i.imgur.com/5acrgq1.png" /> Our sitters come with an Insurance backed guarantee</li>
                     <li><img src="https://i.imgur.com/5acrgq1.png" /> Happy Pets = Happy Owners</li>
                   </ul>
                  </div>
                  <div className={css.carefullyselectedItem}>
                    <div className={css.carefullyImage}>
                      <img src={carefully} />
                    </div>
                  </div>
                  </div>
                </div>
              </div>
            </li>

            <li className={css.sections}>
              <div className={css.sectionHomestay}>
                <div className={css.newstandardSection}>
                  <h1 className={css.vettitle}>
                     Register at Trust My Pet Sitter<br /><span>(It's free!)</span>
                  </h1>
                  <div className={css.newstandardCol}>
                  <div className={css.newstandardItem}>
                    <p>
                      <img src="https://i.imgur.com/7MfnIDd.png" />
                      <span>Browse the<br />Latest Listings</span>
                    </p>
                  </div>
                  <div className={css.newstandardItem}></div>
                  <div className={css.newstandardItem}>
                  <p>
                      <img src="https://i.imgur.com/nfn41TC.png" />
                      <span>Access Special<br />Offers and Discounts </span>
                  </p> 
                  <div className={css.signNews}>
                    <NewsletterForm />
                   </div>
                  </div>
                  <div className={css.newstandardItem}></div>
                  <div className={css.newstandardItem}>
                  <p>
                      <img src="https://i.imgur.com/GWhGyiU.png" />
                      <span>Join our<br />Pet Community</span>
                  </p>
                  </div>
                  </div>
                </div>
              </div>
            </li>

            <li className={css.sections}>
              <div className={css.testimonialsSection}>
                <h1>Lifestyle Choice</h1>
                <div className={css.mobTestimonials} id="mT">
                  <Testimonials />
                </div>
                 <div className={css.testimonials}>
                   <div className={css.testimonial}>
                     <p className={css.tContent}>I love being a Pet Sitter.  I am free to choose the location and dates that suit me. I get to meet amazing animals and their owners. I get to stay in some amazing locations and houses. The best job ever!</p>
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
                     <p className={css.tContent}>There's many things I love about a pet sitter, I love getting to spend so much time with a variety of loving pets.  The relationship I build with them and their owners is lovely and very rewarding.</p>
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
                   <p className={css.tContent}>I love being a pet sitter because I am surrounded by animals and enjoy the chance to look after them. I know how important is to have someone reliable to look after your pets and I love what I do.</p>
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
                     <p className={css.tContent}>I love getting to know the pets and travelling to different locations.  When you watch a pet in their own home it ends up feeling like you are home too. I love being a Pet Sitter!</p>
                      <div className={css.testimonialAuthor}>
                       <img src="https://thumbs.dreamstime.com/b/default-placeholder-profile-icon-avatar-gray-man-90197971.jpg" />
                       <span className={css.testR}>
                         <p className={css.smallAuthor}>
                           Sebastian D - <span className={css.tLoc}>Europe</span>
                         </p>
                       </span>
                     </div>
                   </div>
                 </div>
              </div>
            </li>

            <hr className={css.hpHr} />

            <li className={css.sections}>
              <div className={css.sectionHomestay}>
                <div className={css.newstandardSection}>
                  <h1 className={css.vettitle}>
                    Our Trusted Partners
                  </h1>
                  <div className={css.newstandardCol}>
                  <div className={css.newstandardItem}>
                    <div className={css.ourPartners}>
                      <div className={css.ourPartnersItem1}>
                         <img src={yoti} />
                      </div>
                      <div className={css.ourPartnersItem2}>
                        <h2>YOTI</h2>
                        <p>YOTI works by allowing you to set<br className={css.noPc} /> up a trusted, genuine and verified <br className={css.noPc} />digital identity.</p>
                        <p className={css.secondCol}><NamedLink name="YotiPage">Learn more <span className={css.WeVetArrow5}>→</span></NamedLink></p>
                      </div>
                    </div>
                  </div>
                  <div className={css.newstandardItem}>
                    <div className={css.ourPartners}>
                      <div className={css.ourPartnersItem1}>
                         <img src={superhog} />
                      </div>
                      <div className={css.ourPartnersItem2}>
                        <h2>Superhog</h2>
                        <p>An Insurance backed guarantee working<br className={css.noPc} /> to protect your home and contents <br className={css.noPc} />for up to £1 million.</p>
                        <p className={css.secondCol}><NamedLink name="SuperHogPage">Learn more <span className={css.WeVetArrow5}>→</span></NamedLink></p>
                      </div>
                    </div>
                  </div>
                  <div className={css.newstandardItem}>
                    <div className={css.ourPartners}>
                      <div className={css.ourPartnersItem1}>
                         <img src={pawsquad} />
                      </div>
                      <div className={css.ourPartnersItem2}>
                        <h2>Pawsquad</h2>
                        <p>PawSquad lets you video call or text chat<br className={css.noPc} /> with a qualified vet free at any time or day <br className={css.noPc} />or night, 365 days a year.</p>
                        <p className={css.secondCol}><NamedLink name="PawSquadPage">Learn more <span className={css.WeVetArrow5}>→</span></NamedLink></p>
                      </div>
                    </div>
                  </div>
                  </div>
                </div>
              </div>
            </li>

            <hr className={css.hpHr} />

            <li className={css.section}>
            
            </li>

          </ul>
        </LayoutWrapperMain>
        <LayoutWrapperFooter>
          <Footer />
        </LayoutWrapperFooter>
      </LayoutSingleColumn>
    </Page>
  );
};

const { bool, object } = PropTypes;

LandingPageComponent.propTypes = {
  scrollingDisabled: bool.isRequired,

  // from withRouter
  history: object.isRequired,
  location: object.isRequired,

  // from injectIntl
  intl: intlShape.isRequired
};

const mapStateToProps = state => {
  return {
    scrollingDisabled: isScrollingDisabled(state)
  };
};

// Note: it is important that the withRouter HOC is **outside** the
// connect HOC, otherwise React Router won't rerender any Route
// components since connect implements a shouldComponentUpdate
// lifecycle hook.
//
// See: https://github.com/ReactTraining/react-router/issues/4671
const LandingPage = compose(
  withRouter,
  connect(mapStateToProps),
  injectIntl
)(LandingPageComponent);

export default LandingPage;
