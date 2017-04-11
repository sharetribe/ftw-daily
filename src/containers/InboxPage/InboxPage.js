import React, { PropTypes } from 'react';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { PageLayout, NamedLink, H1 } from '../../components';

import css from './InboxPage.css';

export const InboxPageComponent = props => {
  const { tab, intl } = props;

  const ordersTitle = intl.formatMessage({ id: 'InboxPage.ordersTitle' });
  const salesTitle = intl.formatMessage({ id: 'InboxPage.salesTitle' });
  const title = tab === 'orders' ? ordersTitle : salesTitle;

  return (
    <PageLayout title={title}>
      <H1 className={css.title}>
        <FormattedMessage id="InboxPage.title" />
      </H1>
      <nav>
        <NamedLink className={css.tab} name="InboxOrdersPage" activeClassName={css.activeTab}>
          <FormattedMessage id="InboxPage.ordersTabTitle" />
        </NamedLink>
        <NamedLink className={css.tab} name="InboxSalesPage" activeClassName={css.activeTab}>
          <FormattedMessage id="InboxPage.salesTabTitle" />
        </NamedLink>
      </nav>
    </PageLayout>
  );
};

const { oneOf } = PropTypes;

InboxPageComponent.propTypes = {
  tab: oneOf(['orders', 'sales']).isRequired,

  // from injectIntl
  intl: intlShape.isRequired,
};

const InboxPage = injectIntl(InboxPageComponent);

export default InboxPage;
