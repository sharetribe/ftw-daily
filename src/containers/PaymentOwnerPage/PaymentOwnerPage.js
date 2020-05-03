import React, { Component } from 'react';
import { StaticPage, TopbarContainer, ProfileSettingsPage } from '../../containers';
import {
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
  ExternalLink,
  NamedLink,
  NamedRedirect,
} from '../../components';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { updateUserMembership } from '../../ducks/user.duck';
import line from './images/sketch.svg';
import crown from './images/crown.png';
import card from './images/card.png';
import css from './PaymentOwnerPage.css';
import paw from './images/paw.png';

export class PaymentOwnerPage extends Component {
  constructor(props) {
    super(props);
    this.state = { didPay: false };
  }
  componentDidMount() {
    const el = document.createElement('script');
    el.onload = () => {
      window.Chargebee.init({
        site: 'trustmypetsitter',
      });
      window.Chargebee.registerAgain();
      window.Chargebee.getInstance().setCheckoutCallbacks(() => {
        // you can define a custom callbacks based on cart object
        return {
          step: value => {
            if (value == 'thankyou_screen') {
              this.props.dispatch(updateUserMembership({ petOwnerMembership: true })).then(() => {
                document.getElementById('cb-container') &&
                  document.getElementById('cb-container').remove();
                document.body.style.overflow = 'auto';
                this.setState({ didPay: true });
              });
            }
          },
        };
      });
    };
    el.setAttribute('src', 'https://js.chargebee.com/v2/chargebee.js');
    document.body.appendChild(el);
  }

  render() {
    return this.state.didPay ? (
      <NamedRedirect name="PaymentAffiliatePage"></NamedRedirect>
    ) : (
      <StaticPage
        title="Buy Membership and Go Premium | Trust My Pet Sitter"
        schema={{
          '@context': 'http://schema.org',
          '@type': 'PaymentOwnerPage',
          description: 'PawSquad',
          name: 'PaymentOwnerPage',
        }}
      >
        <LayoutSingleColumn>
          <LayoutWrapperTopbar>
            <TopbarContainer />
          </LayoutWrapperTopbar>

          <LayoutWrapperMain className={css.PaymentWrapper}>
            <div className={css.sectionContent}>
              <div className={css.gridContainer}>
                {this.props.location.state.planType == 'basic' ? (
                  <div className={css.item1}>
                    <div className={css.firstRow}>
                      <img src={paw} />
                      <h2>Go Basic now</h2>
                      <img className={css.lineImg} src={line} />
                    </div>
                    <p>
                      just <span>{this.props.location.state.currency}119</span> per year
                    </p>
                    <p>(Basic Membership)</p>

                    <div
                      className={css.Chargebee}
                      data-cb-type="checkout"
                      data-cb-plan-id={this.props.location.state.planId}
                    >
                      <img src={card} />
                      Pay with card
                    </div>

                    <div className={css.getHelp}>
                      <p>
                        Need help? <NamedLink name="ContactPage">Send us a message</NamedLink>
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className={css.item1}>
                    <div className={css.firstRow}>
                      <img src={crown} />
                      <h2>Go Premium now</h2>
                      <img className={css.lineImg} src={line} />
                    </div>
                    <p>
                      just <span>{this.props.location.state.currency}199</span> per year
                    </p>
                    <p>(Premium Membership)</p>

                    <div
                      className={css.Chargebee}
                      data-cb-type="checkout"
                      data-cb-plan-id={this.props.location.state.planId}
                    >
                      <img src={card} />
                      Pay with card
                    </div>

                    <div className={css.getHelp}>
                      <p>
                        Need help? <NamedLink name="ContactPage">Send us a message</NamedLink>
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </LayoutWrapperMain>

          <LayoutWrapperFooter>
            <Footer />
          </LayoutWrapperFooter>
        </LayoutSingleColumn>
      </StaticPage>
    );
  }
}

const mapDispatchToProps = dispatch => ({});

// Note: it is important that the withRouter HOC is **outside** the
// connect HOC, otherwise React Router won't rerender any Route
// components since connect implements a shouldComponentUpdate
// lifecycle hook.
//
// See: https://github.com/ReactTraining/react-router/issues/4671
export default compose(connect(mapDispatchToProps))(PaymentOwnerPage);
