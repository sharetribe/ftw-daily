import React from 'react';
import { string } from 'prop-types';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import classNames from 'classnames';
import { twitterPageURL } from '../../util/urlHelpers';
import config from '../../config';
import {
  IconSocialMediaFacebook,
  IconSocialMediaInstagram,
  IconSocialMediaTwitter,
  IconSocialMediaPinterest,
  IconSocialMediaLinkedin,
  IconSocialMediaYoutube,
  // Logo,
  ExternalLink,
  NamedLink,
} from '../../components';

import googlePlay from './images/google.png';
import googlePlayBadge from './images/google-play-badge.png';
import css from './Footer.css';

const renderSocialMediaLinks = intl => {
  const { siteFacebookPage, siteInstagramPage, siteTwitterHandle } = config;
  const siteTwitterPage = twitterPageURL(siteTwitterHandle);

  const goToFb = intl.formatMessage({ id: 'Footer.goToFacebook' });
  const goToInsta = intl.formatMessage({ id: 'Footer.goToInstagram' });
  const goToTwitter = intl.formatMessage({ id: 'Footer.goToTwitter' });

  const fbLink = siteFacebookPage ? (
    <ExternalLink key="linkToFacebook" href={siteFacebookPage} className={css.icon} title={goToFb}>
      <IconSocialMediaFacebook />
    </ExternalLink>
  ) : null;

  const twitterLink = siteTwitterPage ? (
    <ExternalLink
      key="linkToTwitter"
      href={siteTwitterPage}
      className={css.icon}
      title={goToTwitter}
    >
      <IconSocialMediaTwitter />
    </ExternalLink>
  ) : null; 

  const instragramLink = siteInstagramPage ? (
    <ExternalLink
      key="linkToInstagram"
      href={siteInstagramPage}
      className={css.icon}
      title={goToInsta}
    >
      <IconSocialMediaInstagram />
    </ExternalLink>
  ) : null;
  return [fbLink,  instragramLink].filter(v => v != null);
};

const Footer = props => {
  const { rootClassName, className, intl } = props;
  const socialMediaLinks = renderSocialMediaLinks(intl);
  const classes = classNames(rootClassName || css.root, className);

  return (
    <div className={classes}>
      <div className={css.topBorderWrapper}>
        <div className={css.content}>
          <div className={css.someLiksMobile}>
            {socialMediaLinks}
             {/* <ExternalLink
                href="https://instagram.com/trustmypetsitter"
                className={css.icon}
                title="Go to Instagram page"
              >
                  <IconSocialMediaInstagram />
              </ExternalLink>*/}
             {/* <ExternalLink
                href="https://pinterest.com/trustmypetsitter"
                className={css.icon}
                title="Go to Pinterest page"
              >
                <IconSocialMediaPinterest />
              </ExternalLink>*/}

             {/* <ExternalLink
                href="https://linkedin.com/company/19270133"
                className={css.icon}
                title="Go to Linkedin page"
              >
                <IconSocialMediaLinkedin />
              </ExternalLink>*/}

            {/*  <ExternalLink
                href="https://youtube.com/channel/UCz2CW5OD_eaeIxiNars87aQ"
                className={css.icon}
                title="Go to Youtube channel"
              >
                <IconSocialMediaYoutube />
              </ExternalLink>*/}
          </div>
          <div className={css.links}>
            <div className={css.organization} id="organization">
              <div className={css.footerTitleContainer}> 
                 <a href="./">
                    REACTIVATE
                  <span>&reg;</span>
                  </a>
              </div>
              <div className={css.organizationInfo}>
                <p className={css.organizationDescription}>
                  <FormattedMessage id="Footer.organizationDescription" />
                </p>
                <p className={css.organizationCopyright}>
                  <NamedLink name="LandingPage" className={css.copyrightLink}>
                    <FormattedMessage id="Footer.copyright" />
                  </NamedLink>
                </p>
              </div>
            </div>
            <div className={css.infoLinks}>
              <ul className={css.list}>
                <li className={css.listItem}>
                 
                  <a className={css.link} href="/ordertype/new">Anuncia</a>
                 
            
                </li>
               {/* <li className={css.listItem}>
                  <a href="https://blog.trustmypetsitter.com" className={css.link}>
                    Blog
                  </a>
                </li>*/}
                <li className={css.listItem}>
                  <NamedLink name="AboutUsPage" className={css.link}>
                    Nosotros
                  </NamedLink>
                </li>
               {/* <li className={css.listItem}>
                  <NamedLink name="PrivacyPolicyPage" className={css.link}>
                    
Términos y privacidad
                  </NamedLink>
                </li>*/}
                <li className={css.listItem}>
                  <NamedLink name="ContactPage" className={css.link}>
                    <FormattedMessage id="Footer.toContactPage" />
                  </NamedLink>
                </li>
              </ul>
            </div>
            <div className={css.searches}>
              <ul className={css.list}>
             <li className={css.listItem}>
                  <NamedLink
                    name="SearchPage"
                    to={{
                      search:
                        's?address=Lima%2C%20Perú&bounds=-11.94376642%2C-76.87075813%2C-12.21475882%2C-77.23209704',
                    }}
                    className={css.link}
                  >
                    <FormattedMessage id="Footer.searchLondon" />
                  </NamedLink>
                </li>
                <li className={css.listItem}>
                 <NamedLink
                    name="SearchPage"
                    to={{
                      search:
                        's?address=Iquitos%2C%20Perú&bounds=-3.66839665%2C-73.17539101%2C-3.93973916%2C-73.52996721',
                    }}
                    className={css.link}
                  >
                    Iquitos
                  </NamedLink>
                </li>
                <li className={css.listItem}>
                   <NamedLink
                    name="SearchPage"
                    to={{
                      search:
                        's?address=Iquitos%2C%20Perú&bounds=-3.66839665%2C-73.17539101%2C-3.93973916%2C-73.52996721',
                    }}
                    className={css.link}
                  >
                    Ica
                  </NamedLink>
                </li>
                 <li className={css.listItem}>
                  <NamedLink
                    name="SearchPage"
                    to={{
                      search:
                        's?address=Ayacucho%2C%20Departamento%20de%20Ayacucho%2C%20Perú&bounds=-13.0678984%2C-74.1876289%2C-13.2033516%2C-74.3006895',
                    }}
                    className={css.link}
                  >
                    Ayacucho
                  </NamedLink>
                </li>
                <li className={css.listItem}>
                <NamedLink
                    name="SearchPage"
                    to={{
                      search:
                        's?address=Cusco%20Jungles%20-%20Hotel%2C%20Calle%20San%20Pedro%20Nro%20128%2C%20Hospital%2C%20Cusco%2C%20Peru%2C%20Cuzco%2C%20Departamento%20de%20Cuzco%2C%20Perú&bounds=-13.50264969445857%2C-71.96538758096318%2C-13.53858230554143%2C-72.00234441903683',
                    }}
                    className={css.link}
                  >
                    Cusco
                  </NamedLink>
                </li>
              </ul>
            </div>
            <div className={css.searchesExtra}>
            <ul className={css.list}>
              
                <li className={css.listItem}>
                  <NamedLink
                    name="SearchPage"
                    to={{
                      search:
                        's?address=Huancayo%2C%20Departamento%20de%20Junín%2C%20Perú&bounds=-11.9014316%2C-74.9476699%2C-12.0870137%2C-75.2357637',
                    }}
                    className={css.link}
                  >
                   Huancayo
                  </NamedLink>
                </li>
                <li className={css.listItem}>
                      <NamedLink
                    name="SearchPage"
                    to={{
                      search:
                        's?address=Trujillo%2C%20Departamento%20de%20La%20Libertad%2C%20Perú&bounds=-8.0849102%2C-78.9831465%2C-8.1514473%2C-79.0634609',
                    }}
                    className={css.link}
                  >
                   Trujillo
                  </NamedLink>
                </li>
                 <li className={css.listItem}>
                  <NamedLink
                    name="SearchPage"
                    to={{
                      search:
                        's?address=Chimbote%2C%20Departamento%20de%20Áncash%2C%20Perú&bounds=-8.6529473%2C-78.1821523%2C-9.1470332%2C-78.6381309',
                    }}
                    className={css.link}
                  >
                   Chimbote
                  </NamedLink>
                </li>
                <li className={css.listItem}>
                   <NamedLink
                    name="SearchPage"
                    to={{
                      search:
                        's?address=Cajamarca%2C%20Departamento%20de%20Cajamarca%2C%20Perú&bounds=-6.8865117%2C-78.4563516%2C-7.2463457%2C-78.6632012',
                    }}
                    className={css.link}
                  >
                   Cajamarca
                  </NamedLink>
                </li>
              </ul>
            </div>
        
            <div className={css.extraLinks}>
              <div className={css.someLinks}>{socialMediaLinks}
              
           {/*   <ExternalLink
                href="https://instagram.com/trustmypetsitter"
                className={css.icon}
                title="Go to Instagram page"
              >
                  <IconSocialMediaInstagram />
              </ExternalLink>*/}
           {/*   <ExternalLink
                href="https://pinterest.com/trustmypetsitter"
                className={css.icon}
                title="Go to Pinterest page"
              >
                <IconSocialMediaPinterest />
              </ExternalLink>*/}

             {/* <ExternalLink
                href="https://linkedin.com/company/19270133"
                className={css.icon}
                title="Go to Linkedin page"
              >
                <IconSocialMediaLinkedin />
              </ExternalLink>*/}

            {/*  <ExternalLink
                href="https://youtube.com/channel/UCz2CW5OD_eaeIxiNars87aQ"
                className={css.icon}
                title="Go to Youtube channel"
              >
                <IconSocialMediaYoutube />
              </ExternalLink>*/}

              </div>
              <div className={css.legalMatters}>
                <ul className={css.tosAndPrivacy}>
                {/*  <ExternalLink href="https://play.google.com/store/apps/details?id=com.trustmypetsitter" className={css.playIcon}>
                      <img src={googlePlayBadge} />
                  </ExternalLink>*/}
                  
                </ul>
              </div>
            </div>
             {/* <ExternalLink href="https://play.google.com/store/apps/details?id=com.trustmypetsitter" className={css.playIconMobile}>
                <img src={googlePlayBadge} />
             </ExternalLink>*/}
          </div>

          <div className={css.copyrightAndTermsMobile}>
            <NamedLink name="LandingPage" className={css.organizationCopyrightMobile}>
              <FormattedMessage id="Footer.copyright" />
            </NamedLink>
            <div className={css.tosAndPrivacyMobile}>
              <NamedLink name="PrivacyPolicyPage" className={css.privacy}>
                <FormattedMessage id="Footer.privacy" />
              </NamedLink>
              <NamedLink name="TermsOfServicePage" className={css.terms}>
                <FormattedMessage id="Footer.terms" />
              </NamedLink>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

Footer.defaultProps = {
  rootClassName: null,
  className: null,
};

Footer.propTypes = {
  rootClassName: string,
  className: string,
  intl: intlShape.isRequired,
};

export default injectIntl(Footer);
