import React from 'react';
import { string } from 'prop-types';
import { FormattedMessage, injectIntl, intlShape } from '../../util/reactIntl';
import classNames from 'classnames';
import { twitterPageURL } from '../../util/urlHelpers';
import config from '../../config';
import {
  IconSocialMediaFacebook,
  IconSocialMediaInstagram,
  IconSocialMediaTwitter,
  IconSocialMediaYoutube,
  IconSocialMediaLinkedin,
  IconSocialMediaTikTok,
  Logo,
  ExternalLink,
  NamedLink,
} from '../../components';

import css from './Footer.module.css';

const renderSocialMediaLinks = intl => {
  const {
    siteFacebookPage,
    siteInstagramPage,
    siteTwitterHandle,
    siteLinkedinPage,
    siteYoutubePage,
    siteTikTokPage
   } = config;

  const siteTwitterPage = twitterPageURL(siteTwitterHandle);

  const goToFb = intl.formatMessage({ id: 'Footer.goToFacebook' });
  const goToInsta = intl.formatMessage({ id: 'Footer.goToInstagram' });
  const goToTwitter = intl.formatMessage({ id: 'Footer.goToTwitter' });
  const goToLinkedin = intl.formatMessage({ id: 'Footer.goToLinkedin' });
  const goToYoutube = intl.formatMessage({ id: 'Footer.goToYoutube' });
  const goToTikTok = intl.formatMessage({ id: 'Footer.goToTikTok' });
  
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

  const linkedinLink = siteLinkedinPage ? (
    <ExternalLink
      key="linkToLinkedin"
      href={siteLinkedinPage}
      className={css.icon}
      title={goToLinkedin}
    >
      <IconSocialMediaLinkedin />
    </ExternalLink>
  ) : null;
  
  const youtubeLink = siteYoutubePage ? (
    <ExternalLink
      key="linkToYoutube"
      href={siteYoutubePage}
      className={css.icon}
      title={goToYoutube}
    >
      <IconSocialMediaYoutube />
    </ExternalLink>
  ) : null;

  const tikTokLink = siteTikTokPage ? (
    <ExternalLink
      key="linkToTikTok"
      href={siteTikTokPage}
      className={css.icon}
      title={goToTikTok}
    >
      <IconSocialMediaTikTok />
    </ExternalLink>
  ) : null;

  return [fbLink, instragramLink, twitterLink, linkedinLink, youtubeLink, tikTokLink].filter(v => v != null);
};

const Footer = props => {
  const { rootClassName, className, intl } = props;
  const socialMediaLinks = renderSocialMediaLinks(intl);
  const classes = classNames(rootClassName || css.root, className);
  const base_url = '?address=CITY%2C%20United%20Kingdom';

  return (
    <div className={classes}>
      <div className={css.topBorderWrapper}>
        <div className={css.content}>
          <div className={css.someLiksMobile}>{socialMediaLinks}</div>
          <div className={css.links}>
            <div className={css.organization} id="organization">
              <NamedLink name="LandingPage" className={css.logoLink}>
                <Logo format="desktop" className={css.logo} />
              </NamedLink>
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
                  <NamedLink name="NewListingPage" className={css.link}>
                    <FormattedMessage id="Footer.toNewListingPage" />
                  </NamedLink>
                </li>
                <li className={css.listItem}>
                  <NamedLink name="AboutPage" className={css.link}>
                    <FormattedMessage id="Footer.toAboutPage" />
                  </NamedLink>
                </li>
                <li className={css.listItem}>
                  <NamedLink name="FaqPage" className={css.link}>
                    <FormattedMessage id="Footer.toFAQPage" />
                  </NamedLink>
                </li>
                <li className={css.listItem}>
                  <a href="mailto:hello@hotpatch.com" className={css.link}>
                    <FormattedMessage id="Footer.toContactPage" />
                  </a>
                </li>
                <li className={css.listItem}>
                  <ExternalLink href="https://www.hotpatch.com/blog/" className={css.link}>
                    <FormattedMessage id="Footer.toBlogPage" />
                  </ExternalLink>
                </li>
              </ul>
            </div>

            <div className={css.searches}>
             <ul className={css.list}>
               <li className={css.listItem}>
                 <NamedLink
                   name="SearchPage"
                   to={{
                     search: base_url.replace('CITY', 'London') + `&bounds=${51.67789511}%2C${0.29732496}%2C${51.3925498}%2C${-0.57645}`,
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
                     search: base_url.replace('CITY', 'Birmingham') + `&bounds=${52.57779203}%2C${-1.72540735}%2C${52.32126288}%2C${-2.03104471}`,
                   }}
                   className={css.link}
                 >
                   <FormattedMessage id="Footer.searchBirmingham" />
                 </NamedLink>
               </li>
               <li className={css.listItem}>
                 <NamedLink
                   name="SearchPage"
                   to={{
                     search: base_url.replace('CITY', 'Manchester') + `&bounds=${53.59821106}%2C${-2.08320402}%2C${53.3476832}%2C${-2.38884138}`,
                   }}
                   className={css.link}
                 >
                   <FormattedMessage id="Footer.searchManchester" />
                 </NamedLink>
               </li>
               <li className={css.listItem}>
                 <NamedLink
                   name="SearchPage"
                   to={{
                     search: base_url.replace('CITY', 'Edinburgh') + `&bounds=${56.21396061}%2C${-2.98871222}%2C${55.74296152}%2C${-3.58918372}`,
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
                     search: base_url.replace('CITY', 'Liverpool') + `&bounds=${53.5729014}%2C${-2.77243704}%2C${53.31894244}%2C${-3.08142752}`,
                   }}
                   className={css.link}
                 >
                   <FormattedMessage id="Footer.searchLiverpool" />
                 </NamedLink>
               </li>
               <li className={css.listItem}>
                 <NamedLink
                   name="SearchPage"
                   to={{
                     search: base_url.replace('CITY', 'Sheffield') + `&bounds=${53.40297225}%2C${-1.43730778}%2C${53.34019056}%2C${-1.51371712}`,
                   }}
                   className={css.link}
                 >
                   <FormattedMessage id="Footer.searchSheffield" />
                 </NamedLink>
               </li>
             </ul>
           </div>

           {/* <div className={css.searchesExtra}>
             <ul className={css.list}>
               <li className={css.listItem}>
                 <NamedLink
                   name="SearchPage"
                   to={{
                     search: base_url.replace('CITY', 'Sheffield') + `&bounds=${53.40297225}%2C${-1.43730778}%2C${53.34019056}%2C${-1.51371712}`,
                   }}
                   className={css.link}
                 >
                   <FormattedMessage id="Footer.searchSheffield" />
                 </NamedLink>
               </li>
             </ul>
           </div> */}

            <div className={css.extraLinks}>
              <div className={css.someLinks}>{socialMediaLinks}</div>
              <div className={css.legalMatters}>
                <ul className={css.tosAndPrivacy}>
                  <li>
                    <NamedLink name="TermsOfServicePage" className={css.legalLink}>
                      <FormattedMessage id="Footer.termsOfUse" />
                    </NamedLink>
                  </li>
                  <li>
                    <NamedLink name="PrivacyPolicyPage" className={css.legalLink}>
                      <FormattedMessage id="Footer.privacyPolicy" />
                    </NamedLink>
                  </li>
                  <li>
                    <NamedLink name="CancellationPage" className={css.legalLink}>
                      <FormattedMessage id="Footer.cancellations" />
                    </NamedLink>
                  </li>
                  <li>
                  <NamedLink name="GuidelinesPage" className={css.legalLink}>
                    <FormattedMessage id="Footer.guidelines" />
                  </NamedLink>
                  </li>
                  <li>
                    <NamedLink name="FeesPage" className={css.legalLink}>
                      <FormattedMessage id="Footer.fees" />
                    </NamedLink>
                  </li>
                </ul>
              </div>
            </div>
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
