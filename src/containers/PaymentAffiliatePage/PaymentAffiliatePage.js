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

import line from './images/sketch.svg';
import crown from './images/crown.png';
import { Redirect } from 'react-router-dom';
import css from './PaymentAffiliatePage.css';

export class PaymentAffiliatePage extends Component {
  constructor(props) {
    super(props);
    this.state = { readyToRedirect: false };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ readyToRedirect: true });
    }, 3000);
  }

  render() {
    if (this.state.readyToRedirect) {
      if (localStorage.getItem('redirectPath')) {
        const redirectUrl = localStorage.getItem('redirectPath');
        localStorage.removeItem('redirectPath');
        return <Redirect to={redirectUrl}></Redirect>;
      } else {
        return <NamedRedirect name="OrderTypesPage" params={{ type: 'new' }}></NamedRedirect>;
      }
    } else {
      return (
        <StaticPage
          title="Buy Membership and Go Premium | Trust My Pet Sitter"
          schema={{
            '@context': 'http://schema.org',
            '@type': 'PaymentAffiliatePage',
            description: 'PawSquad',
            name: 'PaymentAffiliatePage',
          }}
        >
          <LayoutSingleColumn>
            <LayoutWrapperTopbar>
              <TopbarContainer />
            </LayoutWrapperTopbar>

            <LayoutWrapperMain className={css.PaymentWrapper}>
              <img
                src="https://shareasale.com/sale.cfm?amount={{tracking_pixel_code.invoice_amount}}&v=1.0&tracking={{tracking_pixel_code.invoice_id}}&transtype=sale&merchantID=86799"
                width="1"
                height="1"
              />
              <div className={css.sectionContent}>
                <div className={css.gridContainer}>
                  <div className={css.item1}>
                    <div className={css.firstRow}>
                      <img src={crown} />
                      <h2>You are Premium now!</h2>
                      <img className={css.lineImg} src={line} />
                    </div>
                    <p>
                      Enjoy your <strong>Premium</strong> account. We will redirect you in a few
                      seconds.
                    </p>
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
    }
  }
}

export default PaymentAffiliatePage;
