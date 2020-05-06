import React from 'react';
import { StaticPage, TopbarContainer, ProfileSettingsPage } from '../../containers';
import { Player, BigPlayButton } from 'video-react';
import {
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
  NamedLink,
  ExternalLink,
  
} from '../../components';

import css from './AboutUsPage.css';
import angela from './team/angela.jpg';
import sinead from './team/sinead.jpg';
import shamus from './team/shamus.jpg';
import aleksa from './team/aleksa.jpg';
import poster from './tmpsposter.png';
import video from './tmps.mp4';
import petsitter from './petsitter.mp4';
import phone from './phone.png';
import follow from './follow.png';
import arrow from './right-arrow.png';
import release from './release.pdf';
import petowner from './petowner.png';
import config from '../../config';
import { twitterPageURL } from '../../util/urlHelpers';
import image from './about-us-1056.jpg';
import ReactPlayer from "react-player"

const AboutUsPage = () => {
   const { siteTwitterHandle, siteFacebookPage } = config;
  const siteTwitterPage = twitterPageURL(siteTwitterHandle);
  // prettier-ignore
  return (
    <StaticPage
      title="About Us | Trust My Pet Sitter"
      schema={{
        '@context': 'http://schema.org',
        '@type': 'AboutUsPage',
        description: 'AboutUsPage',
        name: 'AboutUsPage',
      }}
    >
      <LayoutSingleColumn>
        <LayoutWrapperTopbar>
          <TopbarContainer />
        </LayoutWrapperTopbar>

        <LayoutWrapperMain>
    <div className={css.sectionContent}>
      <h1 className={css.pressTitle}>¡Reactivemos juntos a las Mypes!</h1>
      <p className={css.pressSub}>
      ¿Sabías qué en el Perú hay más 1.9 millones de Mypes (Micro y Pequeñas empresas) - de cada 100 puestos de trabajo 85% se generan de la actividad de Mypes Fuente: {' '}
                <ExternalLink href="https://andina.com.pe/AGENCIA/andina.pe/Agencia/ndina.pe/agencia/noticia-produce-micro-y-pequenas-empresas-aportan-24-al-pbi-nacional-711589.aspx">PRODUCE</ExternalLink>
      </p>
<img className={css.coverImage} src={image} alt="My first ice cream." />

    <div className={css.strike}>
      <h1 className={css.pressTitle2}>Mypes</h1>
     </div>
      <p className={css.pressSub}>
        Las Mypes (Micro y Pequeñas Empresas) representan el el 99.4% del total de empresas formales en la economía peruana - en efecto, 96.2% son microempresas y 3.2% pequeñas. La principal actividad es comercio y servicios (87.6%), y el resto (12.4%) se dedican a la actividad productiva. (manufactura, construcción, agropecuaria, minería y pesca).
      </p>
      <p>
                Fuente: {' '}
                <ExternalLink href="http://ogeiee.produce.gob.pe/index.php/shortcode/estadistica-oee/estadisticas-mipyme">SUNAT 2017 (PRODUCE-OGEIEE)</ExternalLink>  
               </p>
      <h3 className={css.subtitle}>¿Eres una Mype?</h3>
      <p>
                Sabemos que debido a la crisis por el Covid-19 tu negocio se ha visto afecto. No estás solo, Reactivaté Peru, programa de la {' '}
                <ExternalLink href="https://www.facebook.com/REDMEPenaccion/">REDMEP</ExternalLink> te acompañara a que tu negocio se adapte a las nuevas tecnologías dandote acceso está plataforma dónde podras conectar con clientes, así como acceder a capacitaciones.              </p>
      <h3 id="contact" className={css.subtitle}>
                ¿Cómo me inscribo?
              </h3>
              <p>
                Para comenzar pulsa {' '}
                <ExternalLink href="http://localhost:3000/signup">Regístrarte</ExternalLink>. Luego de tu registro nos comunicaremos contigo para completar tu registro y
                  para que comiencés a subir tus productos o servicios.                
              </p>
              <p>
                Si tienes alguna duda puede encontrarnos en{' '}
                <ExternalLink href={siteFacebookPage}>Facebook</ExternalLink>.
              </p>

      <div className={css.strike}>
      <h1 className={css.pressTitle2}>Cómo funciona?</h1>
      <div className={css.pressFlex}>

    

 <div className={css.videoSide}>
       <Player
      playsInline
      poster={poster}
      src={petsitter}>
      <BigPlayButton position="center" />
      </Player>
        </div>

        <div className={css.videoSide}>
       <Player
      playsInline
      poster={petowner}
      src={video}>
      <BigPlayButton position="center" />
      </Player>
        </div>        

     





    {/*     <div className={css.divideo}>
      <ReactPlayer width="450px" 
        url="https://vimeo.com/414026696"/>
    </div>

         <div className={css.divideo}>
      <ReactPlayer width="450px" 
        url="https://vimeo.com/414026696"
      />
    </div>   */}  

      </div>

      <div className={css.linksFlex}>

        <div className={css.linkItem}>
        <div className={css.logo}>
          <img src={phone} />
        </div>
          <ExternalLink href="https://play.google.com/store/apps/details?id=com.trustmypetsitter">Download the App</ExternalLink>
        </div>

        <div className={css.linkItem}>
        <div className={css.logo}>
          <img src={follow} />
        </div>
          <ExternalLink href="https://www.instagram.com/trustmypetsitter/">Follow Us</ExternalLink>
        </div>

      </div>

      <div className={css.strike}>
      <h1 className={css.pressTitle2}>Press Releases</h1>
      </div>

      <p className={css.release}>
        <ExternalLink href={release} download>
        Mother and Daughter Entrepreneurs 
        <img className={css.arr} src={arrow} />
        </ExternalLink>
      </p>

      <p className={css.release}>
        <ExternalLink href="https://www.scotsman.com/business/glasgow-entrepreneurs-seek-funding-to-take-airbnb-for-pets-service-global-1-5062999">
        Air Bnb for Pets 
        <img className={css.arr} src={arrow} />
        </ExternalLink>
      </p>

      <p className={css.release}>
        <ExternalLink href="https://www.insider.co.uk/news/airbnb-pets-start-up-launches-21117774">
        Glasgow-based Trust My Pet Sitter goes for global expansion
        <img className={css.arr} src={arrow} />
        </ExternalLink>
      </p>
     </div>

      </div>

      </LayoutWrapperMain>

        <LayoutWrapperFooter>
          <Footer />
        </LayoutWrapperFooter>
      </LayoutSingleColumn>
    </StaticPage>
  );
};

export default AboutUsPage;


