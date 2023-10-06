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
  Logo,
  ExternalLink,
  NamedLink,
  ListingLink,
} from '../../components';

import css from './Footer.module.css';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';

const renderSocialMediaLinks = intl => {
  const { siteFacebookPage, siteInstagramPage } = config;

  const goToFb = intl.formatMessage({ id: 'Footer.goToFacebook' });
  const goToInsta = intl.formatMessage({ id: 'Footer.goToInstagram' });

  const fbLink = siteFacebookPage ? (
    <ExternalLink key="linkToFacebook" href={siteFacebookPage} className={css.icon} title={goToFb}>
      <IconSocialMediaFacebook />
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
  return [fbLink, instragramLink].filter(v => v != null);
};

const FooterComponent = props => {
  const { rootClassName, className, intl,currentUserHasOneListings } = props;
  const socialMediaLinks = renderSocialMediaLinks(intl);
  const classes = classNames(rootClassName || css.root, className);

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
                { !(currentUserHasOneListings?.id && currentUserHasOneListings) ? <> <NamedLink className={css.createListingLink} name="NewListingPage">
        <span className={css.createListing}>
          <FormattedMessage id="TopbarDesktop.createListing" />
        </span>
      </NamedLink></>: <ListingLink
         className={classNames(css.profileSettingsLink)}
        listing={currentUserHasOneListings}
        children={"Update Profile"}
      />}
                  {/* <NamedLink name="NewListingPage" className={css.link}>
                    <FormattedMessage id="Footer.becomePartner" />
                  </NamedLink> */}
                </li>
                <li className={css.listItem}>
                  <NamedLink name="FaqPage" className={css.link}>
                    <FormattedMessage id="Footer.toFAQPage" />
                  </NamedLink>
                </li>
                <li className={css.listItem}>
                  <NamedLink
                    name="ContactPage"
                    // params={{ pageId: 'about' }}
                    // to={{ hash: '#contact' }}
                    className={css.link}
                  >
                    <FormattedMessage id="Footer.toContactPage" />
                  </NamedLink>
                </li>
                <li className={css.listItem}>
                  <NamedLink
                    name="AboutUsPage"
                    // params={{ pageId: 'about' }}
                    // to={{ hash: '#contact' }}
                    className={css.link}
                  >
                    <FormattedMessage id="About Us" />
                  </NamedLink>
                </li>
              </ul>
            </div>
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

FooterComponent.defaultProps = {
  rootClassName: null,
  className: null,
};

FooterComponent.propTypes = {
  rootClassName: string,
  className: string,
  intl: intlShape.isRequired,
};

const mapStateToProps = state => {
  const {
    currentUserHasOneListings,
   
  } = state.user;
  
 
  return {
    currentUserHasOneListings,
  };
};

const Footer = compose(
  withRouter,
  connect(
    mapStateToProps,
  
  )
)(FooterComponent);

// export default UserNav;
export default injectIntl(Footer);
