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
                  <NamedLink name="WeVetPage" className={css.link}>
                    ¡Anuncia ya!
                  </NamedLink>
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
                <li className={css.listItem}>
                  <NamedLink name="PrivacyPolicyPage" className={css.link}>
                    
Términos y privacidad
                  </NamedLink>
                </li>
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
                        '?address=London%2C%20Greater%20London%2C%20England%2C%20United%20Kingdom&bounds=51.669993%2C0.152641%2C51.384598%2C-0.35167',
                    }}
                    className={css.link}
                  >
                    <FormattedMessage id="Footer.searchLondon" />
                  </NamedLink>
                </li>
                <li className={css.listItem}>
                  <NamedLink
                    name="MembershipPage"
                    className={css.link}
                  >
                    Iquitos
                  </NamedLink>
                </li>
                <li className={css.listItem}>
                  <NamedLink
                    name="PawSquadPage"
                    className={css.link}
                  >
                   Ica
                  </NamedLink>
                </li>
                 <li className={css.listItem}>
                  <NamedLink
                    name="AffiliatePage"
                    className={css.link}
                  >
                    Ayacucho
                  </NamedLink>
                </li>
                <li className={css.listItem}>
                  <NamedLink
                    name="YotiPage"
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
                        '?address=London%2C%20Greater%20London%2C%20England%2C%20United%20Kingdom&bounds=51.669993%2C0.152641%2C51.384598%2C-0.35167',
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
                        '?address=Edinburgh%2C%20Scotland%2C%20United%20Kingdom&bounds=56.0126298325265%2C-3.07495122820668%2C55.8187943486294%2C-3.44953251894456',
                    }}
                    className={css.link}
                  >
                    <FormattedMessage id="Footer.searchEdinburgh" />
                  </NamedLink>
                </li>
                <li className={css.listItem}>
                  <NamedLink
                    name="SearchPage"
                    to={{
                      search:
                        '?address=New%20York%20City%2C%20New%20York%2C%20United%20States%20of%20America&bounds=40.917576401307%2C-73.7008392055224%2C40.477399%2C-74.2590879797556',
                    }}
                    className={css.link}
                  >
                    <FormattedMessage id="Footer.searchNewYork" />
                  </NamedLink>
                </li>
                 <li className={css.listItem}>
                  <NamedLink
                    name="SearchPage"
                    to={{
                      search:
                        '?address=Los%20Angeles%2C%20California%2C%20United%20States%20of%20America&bounds=34.161440999758%2C-118.121305008073%2C33.9018913203336%2C-118.521456965901',
                    }}
                    className={css.link}
                  >
                    <FormattedMessage id="Footer.searchLosAngeles" />
                  </NamedLink>
                </li>
                <li className={css.listItem}>
                  <NamedLink
                    name="SearchPage"
                    to={{
                      search:
                        '?address=San%20Francisco%2C%20California%2C%20United%20States%20of%20America&bounds=37.8324430069081%2C-122.354995082683%2C37.6044780500533%2C-122.517910874663',
                    }}
                    className={css.link}
                  >
                    <FormattedMessage id="Footer.searchSanFrancisco" />
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
