import React from 'react';
import { string } from 'prop-types';
import { Link } from 'react-router-dom';
import { FormattedMessage, injectIntl, intlShape } from '../../util/reactIntl';
import classNames from 'classnames';
import config from '../../config';
import {
  IconSocialMediaYoutube,
  IconSocialMediaInstagram,
  IconSocialMediaSnapchat,
  IconSocialMediaFacebook,
  Logo,
  ExternalLink,
  NamedLink,
} from '../../components';

import css from './Footer.css';

const renderSocialMediaLinks = intl => {
  const { siteYoutubePage, siteInstagramPage, siteSnapchatPage, siteFacebookPage } = config;

  return [
    <ExternalLink
      key="linkToYoutube"
      href={siteYoutubePage}
      className={css.icon}
      title={intl.formatMessage({ id: 'Footer.goToYoutube' })}
    >
      <IconSocialMediaYoutube />
    </ExternalLink>,

    <ExternalLink
      key="linkToInstagram"
      href={siteInstagramPage}
      className={css.icon}
      title={intl.formatMessage({ id: 'Footer.goToInstagram' })}
    >
      <IconSocialMediaInstagram />
    </ExternalLink>,

    <ExternalLink
      key="linkToSnapchat"
      href={siteSnapchatPage}
      className={css.icon}
      title={intl.formatMessage({ id: 'Footer.goToSnapchat' })}
    >
      <IconSocialMediaSnapchat />
    </ExternalLink>,

    <ExternalLink
      key="linkToFacebook"
      href={siteFacebookPage}
      className={css.icon}
      title={intl.formatMessage({ id: 'Footer.goToFacebook' })}
    >
      <IconSocialMediaFacebook />
    </ExternalLink>,
  ];
};

const Footer = props => {
  const { rootClassName, className, intl } = props;
  const socialMediaLinks = renderSocialMediaLinks(intl);
  const classes = classNames(rootClassName || css.root, className);

  return (
    <div className={classes}>
      <div className={css.topBorderWrapper}>
        <div className={css.content}>
          <div className={css.links}>
            <div className={css.footerContainerHorizontal}>
              <div className={css.footerContainerVertical23}>
                <div className={css.verticalContainerHeader}>
                  <Link to="#">Jetzt anmelden</Link>
                </div>
                <div className={css.verticalContainerContent}>
                  <ul className={css.list}>
                    <li className={css.listItem}>
                      <Link to="#" className={css.link}>
                        So funktioniert's
                      </Link>
                    </li>
                    <li className={css.listItem}>
                      <Link to="#" className={css.link}>
                        Kostenlos anmelden <Link to="/signup" className={css.greenLabel}>Neu</Link>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              <div className={css.footerContainerVertical23}>
                <div className={css.verticalContainerHeader}>
                  <Link to="#">Unsere Community</Link>
                </div>
                <div className={css.verticalContainerContent}>
                  <ul className={css.list}>
                    <li className={css.listItem}>
                      <Link to="#" className={css.link}>
                        Community
                      </Link>
                    </li>
                    <li className={css.listItem}>
                      <Link to="#" className={css.link}>
                        Karriere
                      </Link>
                    </li>
                    <li className={css.listItem}>
                      <Link to="#" className={css.link}>
                        Kontakt
                      </Link>
                    </li>
                    <li className={css.listItem}>
                      <Link to="#" className={css.link}>
                        FAQ
                      </Link>
                    </li>
                    <li className={css.listItem}>
                      <Link to="#" className={css.link}>
                        Hilfe
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              <div className={css.footerContainerVertical31}>
                <div className={css.verticalContainerHeader}>
                  <Link to="#">Finde Dein Pferd</Link>
                </div>
                <div className={css.verticalContainerContent}>
                  <div className={css.topCitiesContainer}>
                    <div className={css.topCitiesColumn}>
                      <ul className={css.list}>
                        <li className={css.listItem}>
                          <NamedLink
                            name="SearchPage"
                            to={{
                              search:
                                '?address=Zurich%2C%20Canton%20of%20Zürich%2C%20Switzerland&bounds=48.03439456%2C9.21423359%2C46.76216594%2C8.04552939',
                            }}
                            className={css.link}
                          >
                            <FormattedMessage id="Footer.searchZürich" />
                          </NamedLink>
                        </li>
                        <li className={css.listItem}>
                          <NamedLink
                            name="SearchPage"
                            to={{
                              search:
                                '?address=Aargau%2C%20Switzerland&bounds=48.04509095%2C8.60959767%2C46.71479074%2C7.38796464',
                            }}
                            className={css.link}
                          >
                            <FormattedMessage id="Footer.searchAargau" />
                          </NamedLink>
                        </li>
                        <li className={css.listItem}>
                          <NamedLink
                            name="SearchPage"
                            to={{
                              search:
                                '?address=Lucerne%2C%20Canton%20of%20Lucerne%2C%20Switzerland&bounds=47.61802365%2C8.83002879%2C46.56293299%2C7.66021279',
                            }}
                            className={css.link}
                          >
                            <FormattedMessage id="Footer.searchLucerne" />
                          </NamedLink>
                        </li>
                        <li className={css.listItem}>
                          <NamedLink
                            name="SearchPage"
                            to={{
                              search:
                                '?address=Bern%2C%20Canton%20of%20Bern%2C%20Switzerland&bounds=48.18692884%2C8.83537674%2C45.2640319%2C6.32771643',
                            }}
                            className={css.link}
                          >
                            <FormattedMessage id="Footer.searchBern" />
                          </NamedLink>
                        </li>
                        <li className={css.listItem}>
                          <NamedLink
                            name="SearchPage"
                            to={{
                              search:
                                '?address=Basel%2C%20Basel-Stadt%2C%20Switzerland&bounds=47.97975327%2C8.19880895%2C46.8479182%2C7.21543715',
                            }}
                            className={css.link}
                          >
                            <FormattedMessage id="Footer.searchBasel" />
                          </NamedLink>
                        </li>
                      </ul>
                    </div>
                    <div className={css.topCitiesColumn}>
                      <ul className={css.list}>
                        <li className={css.listItem}>
                          <NamedLink
                            name="SearchPage"
                            to={{
                              search:
                                '?address=St.%20Gallen%2C%20Canton%20of%20St.%20Gallen%2C%20Switzerland&bounds=48.37292177%2C10.24753452%2C46.25794811%2C8.41315868',
                            }}
                            className={css.link}
                          >
                            <FormattedMessage id="Footer.searchStGallen" />
                          </NamedLink>
                        </li>
                        <li className={css.listItem}>
                          <NamedLink
                            name="SearchPage"
                            to={{
                              search:
                                '?address=Solothurn%2C%20Canton%20of%20Solothurn%2C%20Switzerland&bounds=48.38947993%2C8.71781782%2C46.07014286%2C6.70936838',
                            }}
                            className={css.link}
                          >
                            <FormattedMessage id="Footer.searchSolothurn" />
                          </NamedLink>
                        </li>
                        <li className={css.listItem}>
                          <NamedLink
                            name="SearchPage"
                            to={{
                              search:
                                '?address=Schwyz%2C%20Canton%20of%20Schwyz%2C%20Switzerland&bounds=47.6784065%2C9.32045944%2C46.37994062%2C8.2004517',
                            }}
                            className={css.link}
                          >
                            <FormattedMessage id="Footer.searchSchwyz" />
                          </NamedLink>
                        </li>
                        <li className={css.listItem}>
                          <NamedLink
                            name="SearchPage"
                            to={{
                              search:
                                '?address=Waadt&bounds=47.710466%2C7.95099205%2C45.37554257%2C5.38795205',
                            }}
                            className={css.link}
                          >
                            <FormattedMessage id="Footer.searchWaadt" />
                          </NamedLink>
                        </li>
                        <li className={css.listItem}>
                          <NamedLink
                            name="SearchPage"
                            to={{
                              search:
                                '?address=Freiburg&bounds=47.75298377%2C8.32192402%2C45.80215255%2C6.17133202',
                            }}
                            className={css.link}
                          >
                            <FormattedMessage id="Footer.searchFreiburg" />
                          </NamedLink>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className={css.footerContainerVertical23}>
                <div className={css.verticalContainerHeader}>
                  <div>{socialMediaLinks}</div>
                </div>
                <div className={css.verticalContainerContent}>
                  <Link to="#" className={css.link}>
                    Entdecke unseren Store
                  </Link>
                </div>
              </div>
            </div>
            <div className={css.footerContainerHorizontal}>
              <div className={css.bottomLine}>
                <div className={css.bottomLineItem}>
                  <Link to="#" className={css.link}>
                    <FormattedMessage id="Footer.copyright" />
                  </Link>
                </div>
                <div className={css.bottomLineItem}>
                  <Link to="#" className={css.link}>
                    Impressum
                  </Link>
                </div>
                <div className={css.bottomLineItem}>
                  <Link to="#" className={css.link}>
                    Kontakt
                  </Link>
                </div>
                <div className={css.bottomLineItem}>
                  <Link to="/privacy-policy" className={css.link}>
                    Datenschutz
                  </Link>
                </div>
                <div className={css.bottomLineItem}>
                  <Link to="/terms-of-service" className={css.link}>
                    Nutzungsbedingungen
                  </Link>
                </div>
              </div>
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
