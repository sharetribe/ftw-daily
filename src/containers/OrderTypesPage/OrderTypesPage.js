import React from 'react';
import { StaticPage, TopbarContainer } from '../../containers';
import { NamedLink, SecondaryButton } from '../../components';
import {
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
} from '../../components';

import css from './OrderTypesPage.css';
import cssButton from '../../components/Button/Button.css';

import yoti from './yoti.png';
import secured from './secured.png';
import sunat from './sunat.png';
import remype from './remype.png';
import reniec from './reniec.png';

const OrderTypesPage = props => {
  const draftId = '00000000-0000-0000-0000-000000000000';
  const draftSlug = 'draft';
  const type = props.params.type ? props.params.type : 'new';
  // prettier-ignore
  return (
    <StaticPage
      title="Order Types | Trust My Pet Sitter"
      schema={{
        '@context': 'http://schema.org',
        '@type': 'OrderTypes',
        description: 'About Trust My Pet Sitter',
        name: 'Order Types',
      }}
    >
      <LayoutSingleColumn>
        <LayoutWrapperTopbar>
          <TopbarContainer />
        </LayoutWrapperTopbar>

        <LayoutWrapperMain>

          <div className={css.whatwedoBg}>

            <div className={css.whatwedoTitle}>
              <div className={css.headTitle}>Elige tu Categoria de ANUNCIOS <span className={css.banner}> </span> </div>
            </div>


            <div className={css.whatwedoTitle}>

             <div className={css.iconitos} ><img src={reniec} className={css.badgeImgs} /> <span className={css.badgeTextFirst}>Verificación Reciec</span></div>
              <div className={css.iconitos} ><img src={sunat} className={css.badgeImgs} /> <span className={css.badgeTextFirst}>Verificación de identidad</span></div>
              <div className={css.iconitos} > <img src={remype} className={css.badgeImgs} /> <span className={css.badgeTextFirst}>Verificación Empresarial</span></div>
            <div className={css.iconitos} >  <img src={secured} className={css.badgeImgs} /> <span className={css.badgeText}>Anuncios Verificados</span></div>
            </div>
          </div>

          <div className={css.staticPageWrapper}>
            <div className={css.sectionContent}>
              <h2 >Selecciona una categoria:</h2>
  
              <div>
                <div name="category">
                  <NamedLink className={css.choose} name="EditListingPage" params={{ slug: draftSlug, id: draftId, type: type, tab: 'description_owner' }}>  
                    <SecondaryButton className={cssButton.orderTypeButton_first}> 
                       Productos 
                    </SecondaryButton>
                  </NamedLink>
                  
                  <NamedLink className={css.choose} name="EditListingPage" params={{ slug: draftSlug, id: draftId, type: type, tab: 'description_service' }}>  
                    <SecondaryButton className={cssButton.orderTypeButton_last}> 
                        Servicios
                    </SecondaryButton>
                  </NamedLink>

                  <NamedLink className={css.choose} name="EditListingPage" params={{ slug: draftSlug, id: draftId, type: type, tab: 'description_sitter' }}>  
                    <SecondaryButton className={cssButton.orderTypeButton}> 
                       Otros
                    </SecondaryButton>
                  </NamedLink>
                </div>
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

export default OrderTypesPage;
