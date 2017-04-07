import React from 'react';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { types } from '../../util/sdkLoader';
import { PageLayout } from '../../components';
import { StripePaymentForm } from '../../containers';

import css from './CheckoutPage.css';

const { UUID, LatLng } = types;

export const CheckoutPageComponent = props => {
  const { intl } = props;

  const listing = {
    id: new UUID('00000000-0000-0000-0000-000000000000'),
    type: 'listing',
    attributes: {
      title: 'Example listing',
      description: 'Listing description here.',
      address: 'Helsinki, Finland',
      geolocation: new LatLng(60.16985569999999, 24.93837899999994),
    },
  };
  const imageUrl = 'https://placehold.it/750x470';
  const title = intl.formatMessage(
    {
      id: 'CheckoutPage.title',
    },
    {
      listingTitle: listing.attributes.title,
    }
  );

  const handleSubmit = token => {
    // eslint-disable-next-line no-console
    console.log('submit token:', token);
  };

  return (
    <PageLayout title={title}>
      <h1 className={css.title}>{title}</h1>
      <img alt={listing.attributes.title} src={imageUrl} style={{ width: '100%' }} />
      <section className={css.payment}>
        <h2 className={css.paymentTitle}>
          <FormattedMessage id="CheckoutPage.paymentTitle" />
        </h2>
        <p>
          <FormattedMessage id="CheckoutPage.paymentInfo" />
        </p>
        <StripePaymentForm onSubmit={handleSubmit} />
      </section>
    </PageLayout>
  );
};

CheckoutPageComponent.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(CheckoutPageComponent);
