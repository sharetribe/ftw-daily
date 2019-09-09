import { func, shape } from 'prop-types';
import {
  IntlProvider,
  FormattedMessage,
  FormattedDate,
  FormattedHTMLMessage,
  injectIntl,
} from 'react-intl';

const intlShape = shape({
  formatDate: func.isRequired,
  formatHTMLMessage: func.isRequired,
  formatMessage: func.isRequired,
  formatNumber: func.isRequired,
  formatPlural: func.isRequired,
  formatRelativeTime: func.isRequired,
  formatTime: func.isRequired,
});
export {
  IntlProvider,
  FormattedMessage,
  FormattedDate,
  FormattedHTMLMessage,
  injectIntl,
  intlShape,
};
