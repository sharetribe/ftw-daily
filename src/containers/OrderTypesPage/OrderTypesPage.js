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
              <div className={css.headTitle}>Choose your <span className={css.banner}> LISTING </span> Category</div>
            </div>


            <div className={css.whatwedoTitle}>
              <img src={yoti} className={css.badgeImgs} /> <span className={css.badgeTextFirst}>Digital Identity</span>
              <img src={secured} className={css.badgeImgs} /> <span className={css.badgeText}>Verified Listings</span>
            </div>
          </div>

          <div className={css.staticPageWrapper}>
            <div className={css.sectionContent}>
              <h2 >Select category:</h2>
  
              <div>
                <div name="category">
                  <NamedLink className={css.choose} name="EditListingPage" params={{ slug: draftSlug, id: draftId, type: type, tab: 'description_owner' }}>  
                    <SecondaryButton className={cssButton.orderTypeButton_first}> 
                        Pet Owner
                    </SecondaryButton>
                  </NamedLink>
                  <NamedLink className={css.choose} name="EditListingPage" params={{ slug: draftSlug, id: draftId, type: type, tab: 'description_sitter' }}>  
                    <SecondaryButton className={cssButton.orderTypeButton}> 
                        Pet Sitter
                    </SecondaryButton>
                  </NamedLink>
                  <NamedLink className={css.choose} name="EditListingPage" params={{ slug: draftSlug, id: draftId, type: type, tab: 'description_service' }}>  
                    <SecondaryButton className={cssButton.orderTypeButton_last}> 
                        Pet Service
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
