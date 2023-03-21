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
                  <br></br>
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
                <li className={css.listItem}>
                 <NamedLink
                   name="SearchPage"
                   to={{
                     search: base_url.replace('CITY', 'Dubai') + `&bounds=${25.35856066265986}%2C${55.56452157241026}%2C${24.79348418590246}%2C${54.89045432509004}`,
                   }}
                   className={css.link}
                 >
                   <FormattedMessage id="Footer.searchDubai" />
                 </NamedLink>
               </li>
               <li className={css.listItem}>
                 <NamedLink
                   name="SearchPage"
                   to={{
                     search: base_url.replace('CITY', 'New York') + `&bounds=${40.91757705070789}%2C${-73.70027206817629}%2C${40.47739906045452}%2C${-74.25908991427882}`,
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
                     search: base_url.replace('CITY', 'Los Angeles') + `&bounds=${34.33730608759191}%2C${-118.155289077463}%2C${33.70365193147634}%2C${-118.6681759484859}`,
                   }}
                   className={css.link}
                 >
                   <FormattedMessage id="Footer.searchLosAngeles" />
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
           <div className={css.links}>
            <div className={css.infoLinks2}>
              <ul className={css.list}>
              <li className={css.listItem}>
                  <p><strong>
                    <a href="https://www.hotpatch.com/s?address=&bounds=59.49417013%2C4.15978193%2C49.54972301%2C-10.51994741&pub_category=has_any%3Ahair-stylist%2Cbarber%2Cmakeup-artist%2Cnail-technician%2Ccosmetics%2Caesthetics%2Ctattoo-and-piercing"><FormattedMessage id="Footer.categoryHairBeauty" />
                    </a>
                    </strong>
                  </p>
                </li>
                <li className={css.listItem}>
                  <a href="https://www.hotpatch.com/s?address=&bounds=59.49417013%2C4.15978193%2C49.54972301%2C-10.51994741&pub_category=has_any%3Ahair-stylist" className={css.link}>
                    <FormattedMessage id="Footer.categorySalonChair" />
                  </a>
                </li>
                <li className={css.listItem}>
                  <a href="https://www.hotpatch.com/s?address=&bounds=59.49417013%2C4.15978193%2C49.54972301%2C-10.51994741&pub_category=has_any%3Abarber" className={css.link}>
                    <FormattedMessage id="Footer.categoryBarberChair" />
                  </a>
                </li>
                <li className={css.listItem}>
                  <a href="https://www.hotpatch.com/s?address=&bounds=59.49417013%2C4.15978193%2C49.54972301%2C-10.51994741&pub_category=has_any%3Amakeup-artist" className={css.link}>
                    <FormattedMessage id="Footer.categoryBeautySpace" />
                  </a>
                </li>
                <li className={css.listItem}>
                  <a href="https://www.hotpatch.com/s?address=&bounds=59.94465441%2C2.08236843%2C48.96664222%2C-8.44253391&pub_category=has_any%3Anail-technician" className={css.link}>
                    <FormattedMessage id="Footer.categoryNailStation" />
                  </a>
                </li>
                <li className={css.listItem}>
                  <a href="https://www.hotpatch.com/s?address=&bounds=59.94465441%2C2.08236843%2C48.96664222%2C-8.44253391&pub_category=has_any%3Acosmetics" className={css.link}>
                    <FormattedMessage id="Footer.categoryBeautyRoom" />
                  </a>
                </li>
                <li className={css.listItem}>
                  <a href="https://www.hotpatch.com/s?address=&bounds=59.94465441%2C2.08236843%2C48.96664222%2C-8.44253391&pub_category=has_any%3Aaesthetics" className={css.link}>
                    <FormattedMessage id="Footer.categoryAesthetics" />
                  </a>
                </li>
                <li className={css.listItem}>
                  <a href="https://www.hotpatch.com/s?address=&bounds=59.94465441%2C2.08236843%2C48.96664222%2C-8.44253391&pub_category=has_any%3Atattoo-and-piercing" className={css.link}>
                    <FormattedMessage id="Footer.categoryTattooPiercing" />
                  </a>
                </li>
               
              </ul>
            </div>
            <div className={css.infoLinks2}>
              <ul className={css.list}>
              <li className={css.listItem}>
                  <p><strong>
                    <a href="https://www.hotpatch.com/s?address=&bounds=59.49417013%2C4.15978193%2C49.54972301%2C-10.51994741&pub_category=has_any%3Atherapy-room%2Cmassage-room%2Cclinical-room">
                    <FormattedMessage id="Footer.categoryWellness" />
                    </a>
                    </strong>
                  </p>
                </li>
                <li className={css.listItem}>
                  <a href="https://www.hotpatch.com/s?address=&bounds=59.94465441%2C2.08236843%2C48.96664222%2C-8.44253391&pub_category=has_any%3Atherapy-room" className={css.link}>
                    <FormattedMessage id="Footer.categoryTherapyRoom" />
                  </a>
                </li>
                <li className={css.listItem}>
                  <a href="https://www.hotpatch.com/s?address=&bounds=59.94465441%2C2.08236843%2C48.96664222%2C-8.44253391&pub_category=has_any%3Amassage-room" className={css.link}>
                    <FormattedMessage id="Footer.categoryMassageRoom" />
                  </a>
                </li>
                <li className={css.listItem}>
                  <a href="https://www.hotpatch.com/s?address=&bounds=59.94465441%2C2.08236843%2C48.96664222%2C-8.44253391&pub_category=has_any%3Aclinical-room" className={css.link}>
                    <FormattedMessage id="Footer.categoryClinicalRoom" />
                  </a>
                </li>
                
              </ul>
            </div>

           <div className={css.infoLinks2}>
              <ul className={css.list}>
              <li className={css.listItem}>
                  <p><strong>
                    <a href="https://www.hotpatch.com/s?address=&bounds=59.49417013%2C4.15978193%2C49.54972301%2C-10.51994741&pub_category=has_any%3Afitness%2Cyoga-studio%2Cdance-studio%2Csports-hall%2Coutdoor-sport-space%2Cactivity-room">
                    <FormattedMessage id="Footer.categoryFitness" />
                    </a>
                    </strong>
                  </p>
                </li>
                
                <li className={css.listItem}>
                  <a href="https://www.hotpatch.com/s?address=&bounds=59.94465441%2C2.08236843%2C48.96664222%2C-8.44253391&pub_category=has_any%3Afitness" className={css.link}>
                    <FormattedMessage id="Footer.categoryFitnessStudio" />
                  </a>
                </li>
                <li className={css.listItem}>
                  <a href="https://www.hotpatch.com/s?address=&bounds=59.94465441%2C2.08236843%2C48.96664222%2C-8.44253391&pub_category=has_any%3Ayoga-studio" className={css.link}>
                    <FormattedMessage id="Footer.categoryYogaStudio" />
                  </a>
                </li>
                <li className={css.listItem}>
                  <a href="https://www.hotpatch.com/s?address=&bounds=59.94465441%2C2.08236843%2C48.96664222%2C-8.44253391&pub_category=has_any%3Adance-studio" className={css.link}>
                    <FormattedMessage id="Footer.categoryDanceStudio" />
                  </a>
                </li>
                <li className={css.listItem}>
                  <a href="https://www.hotpatch.com/s?address=&bounds=59.94465441%2C2.08236843%2C48.96664222%2C-8.44253391&pub_category=has_any%3Asports-hall" className={css.link}>
                    <FormattedMessage id="Footer.categorySportsHall" />
                  </a>
                </li>
                <li className={css.listItem}>
                  <a href="https://www.hotpatch.com/s?address=&bounds=59.94465441%2C2.08236843%2C48.96664222%2C-8.44253391&pub_category=has_any%3Aoutdoor-sport-space" className={css.link}>
                    <FormattedMessage id="Footer.categoryOutdoorSportSpace" />
                  </a>
                </li>
                <li className={css.listItem}>
                  <a href="https://www.hotpatch.com/s?address=&bounds=59.94465441%2C2.08236843%2C48.96664222%2C-8.44253391&pub_category=has_any%3Aactivity-room" className={css.link}>
                    <FormattedMessage id="Footer.categoryActivityRoom" />
                  </a>
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

           <div className={css.infoLinks2}>
              <ul className={css.list}>
              <li className={css.listItem}>
                  <p><strong>
                    <a href="https://www.hotpatch.com/s?address=&bounds=59.49417013%2C4.15978193%2C49.54972301%2C-10.51994741&pub_category=has_any%3Amusic-venue%2Cprivate-event-space%2Csports-venue%2Cconference-exhibition%2Coutdoor-events%2Cprivate-dining">
                    <FormattedMessage id="Footer.categoryEvents" />
                    </a>
                    </strong>
                  </p>
                </li>
                <li className={css.listItem}>
                  <a href="https://www.hotpatch.com/s?address=&bounds=59.94465441%2C2.08236843%2C48.96664222%2C-8.44253391&pub_category=has_any%3Amusic-venue" className={css.link}>
                    <FormattedMessage id="Footer.categoryMusicVenue" />
                  </a>
                </li>
                <li className={css.listItem}>
                  <a href="https://www.hotpatch.com/s?address=&bounds=59.94465441%2C2.08236843%2C48.96664222%2C-8.44253391&pub_category=has_any%3Aprivate-event-space" className={css.link}>
                    <FormattedMessage id="Footer.categoryPrivateEventSpace" />
                  </a>
                </li>
                <li className={css.listItem}>
                  <a href="https://www.hotpatch.com/s?address=&bounds=59.94465441%2C2.08236843%2C48.96664222%2C-8.44253391&pub_category=has_any%3Asports-venue" className={css.link}>
                    <FormattedMessage id="Footer.categorySportsVenue" />
                  </a>
                </li>
                <li className={css.listItem}>
                  <a href="https://www.hotpatch.com/s?address=&bounds=59.94465441%2C2.08236843%2C48.96664222%2C-8.44253391&pub_category=has_any%3Aconference-exhibition" className={css.link}>
                    <FormattedMessage id="Footer.categoryConferenceExhibition" />
                  </a>
                </li>
                <li className={css.listItem}>
                  <a href="https://www.hotpatch.com/s?address=&bounds=59.94465441%2C2.08236843%2C48.96664222%2C-8.44253391&pub_category=has_any%3Aoutdoor-events" className={css.link}>
                    <FormattedMessage id="Footer.categoryOutdoorEvents" />
                  </a>
                </li>
                <li className={css.listItem}>
                  <a href="https://www.hotpatch.com/s?address=&bounds=59.94465441%2C2.08236843%2C48.96664222%2C-8.44253391&pub_category=has_any%3Aprivate-dining" className={css.link}>
                    <FormattedMessage id="Footer.categoryPrivateDining" />
                  </a>
                </li>
                
              </ul>
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
          <div className={css.links}>
            <div className={css.infoLinks2}>
              <ul className={css.list}>
              <li className={css.listItem}>
                  <p><strong>
                    <a href="https://www.hotpatch.com/s?address=&bounds=59.49417013%2C4.15978193%2C49.54972301%2C-10.51994741&pub_category=has_any%3Adesk-space%2Coffice-space%2Cmeeting-room-space%2Cconference-room%2Cclassroom">
                    <FormattedMessage id="Footer.categoryCoworking" />
                    </a>
                    </strong>
                  </p>
                </li>
                <li className={css.listItem}>
                  <a href="https://www.hotpatch.com/s?address=&bounds=59.94465441%2C2.08236843%2C48.96664222%2C-8.44253391&pub_category=has_any%3Adesk-space" className={css.link}>
                    <FormattedMessage id="Footer.categoryCoworkingSpace" />
                  </a>
                </li>
                <li className={css.listItem}>
                  <a href="https://www.hotpatch.com/s?address=&bounds=59.94465441%2C2.08236843%2C48.96664222%2C-8.44253391&pub_category=has_any%3Aoffice-space" className={css.link}>
                    <FormattedMessage id="Footer.categoryPrivateOffice" />
                  </a>
                </li>
                <li className={css.listItem}>
                  <a href="https://www.hotpatch.com/s?address=&bounds=59.94465441%2C2.08236843%2C48.96664222%2C-8.44253391&pub_category=has_any%3Ameeting-room-space" className={css.link}>
                    <FormattedMessage id="Footer.categoryMeetingRoom" />
                  </a>
                </li>
                <li className={css.listItem}>
                  <a href="https://www.hotpatch.com/s?address=&bounds=59.94465441%2C2.08236843%2C48.96664222%2C-8.44253391&pub_category=has_any%3Aconference-room" className={css.link}>
                    <FormattedMessage id="Footer.categoryConferenceRoom" />
                  </a>
                </li>
                <li className={css.listItem}>
                  <a href="https://www.hotpatch.com/s?address=&bounds=59.94465441%2C2.08236843%2C48.96664222%2C-8.44253391&pub_category=has_any%3Aclassroom" className={css.link}>
                    <FormattedMessage id="Footer.categoryClassroom" />
                  </a>
                </li>
                
              </ul>
            </div>
            <div className={css.infoLinks2}>
              <ul className={css.list}>
              <li className={css.listItem}>
                  <p><strong>
                    <a href="https://www.hotpatch.com/s?address=&bounds=59.49417013%2C4.15978193%2C49.54972301%2C-10.51994741&pub_category=has_any%3Amusic-studio%2Crecording-studio%2Cgallery-space%2Cart-studio%2Crehearsal-space%2Cdrama-studio%2Ctheatre-space">
                    <FormattedMessage id="Footer.categoryMusicArts" />
                    </a>
                    </strong>
                  </p>
                </li>
                <li className={css.listItem}>
                  <a href="https://www.hotpatch.com/s?address=&bounds=59.94465441%2C2.08236843%2C48.96664222%2C-8.44253391&pub_category=has_any%3Amusic-studio" className={css.link}>
                    <FormattedMessage id="Footer.categoryMusicStudio" />
                  </a>
                </li>
                <li className={css.listItem}>
                  <a href="https://www.hotpatch.com/s?address=&bounds=59.94465441%2C2.08236843%2C48.96664222%2C-8.44253391&pub_category=has_any%3Arecording-studio" className={css.link}>
                    <FormattedMessage id="Footer.categoryRecordingStudio" />
                  </a>
                </li>
                <li className={css.listItem}>
                  <a href="https://www.hotpatch.com/s?address=&bounds=59.94465441%2C2.08236843%2C48.96664222%2C-8.44253391&pub_category=has_any%3Agallery-space" className={css.link}>
                    <FormattedMessage id="Footer.categoryGallerySpace" />
                  </a>
                </li>
                <li className={css.listItem}>
                  <a href="https://www.hotpatch.com/s?address=&bounds=59.94465441%2C2.08236843%2C48.96664222%2C-8.44253391&pub_category=has_any%3Aart-studio" className={css.link}>
                    <FormattedMessage id="Footer.categoryArtStudio" />
                  </a>
                </li>
                <li className={css.listItem}>
                  <a href="https://www.hotpatch.com/s?address=&bounds=59.94465441%2C2.08236843%2C48.96664222%2C-8.44253391&pub_category=has_any%3Arehearsal-space" className={css.link}>
                    <FormattedMessage id="Footer.categoryRehearsalSpace" />
                  </a>
                </li>
                <li className={css.listItem}>
                  <a href="https://www.hotpatch.com/s?address=&bounds=59.94465441%2C2.08236843%2C48.96664222%2C-8.44253391&pub_category=has_any%3Adrama-studio" className={css.link}>
                    <FormattedMessage id="Footer.categoryDramaStudio" />
                  </a>
                </li>
                <li className={css.listItem}>
                  <a href="https://www.hotpatch.com/s?address=&bounds=59.94465441%2C2.08236843%2C48.96664222%2C-8.44253391&pub_category=has_any%3Atheatre-space" className={css.link}>
                    <FormattedMessage id="Footer.categoryTheatreSpace" />
                  </a>
                </li>
               
              </ul>
            </div>

           <div className={css.infoLinks2}>
              <ul className={css.list}>
              <li className={css.listItem}>
                  <p><strong>
                    <a href="https://www.hotpatch.com/s?address=&bounds=59.49417013%2C4.15978193%2C49.54972301%2C-10.51994741&pub_category=has_any%3Alocation-shoot%2Coutdoor-site%2Cphotography">
                    <FormattedMessage id="Footer.categoryPhotographyFilm" />
                    </a>
                    </strong>
                  </p>
                </li>
                <li className={css.listItem}>
                  <a href="https://www.hotpatch.com/s?address=&bounds=59.94465441%2C2.08236843%2C48.96664222%2C-8.44253391&pub_category=has_any%3Aphotography" className={css.link}>
                    <FormattedMessage id="Footer.categoryPhotoStudio" />
                  </a>
                </li>
                <li className={css.listItem}>
                  <a href="https://www.hotpatch.com/s?address=&bounds=59.94465441%2C2.08236843%2C48.96664222%2C-8.44253391&pub_category=has_any%3Alocation-shoot" className={css.link}>
                    <FormattedMessage id="Footer.categoryLocationShoot" />
                  </a>
                </li>
                <li className={css.listItem}>
                  <a href="https://www.hotpatch.com/s?address=&bounds=59.94465441%2C2.08236843%2C48.96664222%2C-8.44253391&pub_category=has_any%3Aoutdoor-site" className={css.link}>
                    <FormattedMessage id="Footer.categoryOutdoorSite" />
                  </a>
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

           <div className={css.infoLinks2}>
              <ul className={css.list}>
              <li className={css.listItem}>
                  <p><strong>
                    <a href="https://www.hotpatch.com/s?address=&bounds=59.49417013%2C4.15978193%2C49.54972301%2C-10.51994741&pub_category=has_any%3Akitchen-space%2Cpop-up-space">
                    <FormattedMessage id="Footer.categoryKitchenPopup" />
                    </a>
                    </strong>
                  </p>
                </li>
                <li className={css.listItem}>
                  <a href="https://www.hotpatch.com/s?address=&bounds=59.94465441%2C2.08236843%2C48.96664222%2C-8.44253391&pub_category=has_any%3Akitchen-space" className={css.link}>
                    <FormattedMessage id="Footer.categoryKitchen" />
                  </a>
                </li>
                <li className={css.listItem}>
                  <a href="https://www.hotpatch.com/s?address=&bounds=59.94465441%2C2.08236843%2C48.96664222%2C-8.44253391&pub_category=has_any%3Apop-up-space" className={css.link}>
                    <FormattedMessage id="Footer.categoryPopup" />
                  </a>
                </li>
                
              </ul>
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
