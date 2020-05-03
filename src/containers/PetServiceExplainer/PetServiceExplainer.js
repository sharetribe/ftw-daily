import React from 'react';
import { StaticPage, TopbarContainer } from '../../containers';
import {
  ContactForm,
  GoogleMap,
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer
  // ExternalLink,
} from '../../components';

import css from './PetServiceExplainer.css';
import petservice1 from './petservices-1.png';
import petservice2 from './petservices-2.png';
import petservice3 from './petservices-3.png';

const PetServiceExplainer = () => {
  // const { siteTwitterHandle, siteFacebookPage } = config;
  // const siteTwitterPage = twitterPageURL(siteTwitterHandle);

  // prettier-ignore
  return (
    <StaticPage
      title="Pet Service | Trust My Pet Sitter"
      schema={{
        '@context': 'http://schema.org',
        '@type': 'PetServiceExplainer',
        description: 'Pet Service Explainer',
        name: 'Pet Service Explainer',
      }}
    >
      <LayoutSingleColumn>
        <LayoutWrapperTopbar>
          <TopbarContainer />
        </LayoutWrapperTopbar>

        <LayoutWrapperMain className={css.staticPageWrapper}>
        <div className={css.serviceContent}>	
                <div className={css.sectionContent}>	
                  <h1 className={css.pageTitle}>
                    The Largest Pet Services Directory	
                    <br />	
                    is right here!	
                  </h1>
                  <div className={css.serviceIcons}>	
                    <div className={css.serviceSingle}>	
                      <div className={css.singleIcon}>	
                        <img src={petservice1}></img>	
                      </div>	
                      <hr className={css.serviceHr}></hr>	
                      <h3>STEP 1</h3>	
                      <h2>Search by Location</h2>	
                      <p>Find the top rated Pet Services in your local area.</p>	
                    </div>	

                    <div className={css.serviceSingle}>	
                      <div className={css.singleIcon}>	
                        <img src={petservice2}></img>	
                      </div>	
                      <hr className={css.serviceHr}></hr>	
                      <h3>STEP 2</h3>	
                      <h2>Search by Type</h2>	
                      <p>	
                        Find Dog Walkers, Groomers, Vets, Pet Food, Daycare and	
                        more...	
                      </p>	
                    </div>	

                    <div className={css.serviceSingle}>	
                      <div className={css.singleIcon}>	
                        <img src={petservice3}></img>	
                      </div>	
                      <hr className={css.serviceHr}></hr>	
                      <h3>STEP 3</h3>	
                      <h2>Read Reviews</h2>	
                      <p>	
                        Read reviews from verified pet parents at Trust My Pet	
                        Sitter.	
                      </p>	
                    </div>	
                  </div>	
                  <div className={css.lastBtn}>	
                    <a href="/s?pub_user_type=2">Begin Your Search</a>	
                  </div>	
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

export default PetServiceExplainer;

