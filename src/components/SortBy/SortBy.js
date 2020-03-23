import React from 'react';
import { string, bool } from 'prop-types';
import { intlShape, injectIntl } from '../../util/reactIntl';

import config from '../../config';

import SortByPlain from './SortByPlain';
import SortByPopup from './SortByPopup';

const SortBy = props => {
  const { sort, showAsPopup, isKeywordFilterActive, intl, ...rest } = props;

  const { relevanceKey } = config.custom.sortConfig;

  const options = config.custom.sortConfig.options.map(option => {
    const isRelevance = option.key === relevanceKey;
    return {
      ...option,
      disabled: (isRelevance && !isKeywordFilterActive) || (!isRelevance && isKeywordFilterActive),
    };
  });
  const defaultValue = 'createdAt';
  const componentProps = {
    urlParam: 'sort',
    label: intl.formatMessage({ id: 'SortBy.heading' }),
    options,
    initialValue: isKeywordFilterActive ? relevanceKey : sort || defaultValue,
    ...rest,
  };
  return showAsPopup ? <SortByPopup {...componentProps} /> : <SortByPlain {...componentProps} />;
};

SortBy.defaultProps = {
  sort: null,
  showAsPopup: false,
};

SortBy.propTypes = {
  sort: string,
  showAsPopup: bool,
  isKeywordFilterActive: bool.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(SortBy);
