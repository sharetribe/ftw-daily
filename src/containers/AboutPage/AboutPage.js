import React from 'react';
import config from '../../config';
import { twitterPageURL } from '../../util/urlHelpers';
import { StaticPage, TopbarContainer } from '../../containers';
import {
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
  ExternalLink,
} from '../../components';

import css from './AboutPage.css';
import image from './about-us-1056.jpg';

const AboutPage = () => {
  const { siteTwitterHandle, siteFacebookPage } = config;
  const siteTwitterPage = twitterPageURL(siteTwitterHandle);

  // prettier-ignore
  return (
    <StaticPage
      title="About Us"
      schema={{
        '@context': 'http://schema.org',
        '@type': 'AboutPage',
        description: 'About Saunatime',
        name: 'About page',
      }}
    >
      <LayoutSingleColumn>
        <LayoutWrapperTopbar>
          <TopbarContainer />
        </LayoutWrapperTopbar>

        <LayoutWrapperMain className={css.staticPageWrapper}>
          <h1 className={css.pageTitle}>¡Reactivemos juntos a las Mypes!</h1>
          <img className={css.coverImage} src={image} alt="My first ice cream." />

          <div className={css.contentWrapper}>
            <div className={css.contentSide}>
              <p>¿Sabías qué en el Perú hay más 1.9 millones de Mypes (Micro y Pequeñas empresas) - de cada 100 puestos de trabajo 85% se generan de la actividad de Mypes Fuente: {' '}
                <ExternalLink href="https://andina.com.pe/AGENCIA/andina.pe/Agencia/ndina.pe/agencia/noticia-produce-micro-y-pequenas-empresas-aportan-24-al-pbi-nacional-711589.aspx">PRODUCE</ExternalLink></p>
            </div>

            <div className={css.contentMain}>
              <h2>
                Las Mypes (Micro y Pequeñas Empresas) representan el el 99.4% del total de empresas formales en la economía peruana - en efecto, 96.2% son microempresas y 3.2% pequeñas. La principal actividad es comercio y servicios (87.6%), y el resto (12.4%) se dedican a la actividad productiva. (manufactura, construcción, agropecuaria, minería y pesca).
              </h2>

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

export default AboutPage;
