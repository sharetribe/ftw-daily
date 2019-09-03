import React from 'react';
import { withRouter } from 'react-router-dom';
import KeywordFilter from './KeywordFilter';
import { stringify, parse } from '../../util/urlHelpers';

const URL_PARAM = 'keywords';

const handleSubmit = (urlParam, values, history) => {
  console.log('Submitting values', values);
  const queryParams = values ? `?${stringify({ [urlParam]: values })}` : '';
  history.push(`${window.location.pathname}${queryParams}`);
};

const KeywordFilterPopup = withRouter(props => {
  const { history, location } = props;

  const params = parse(location.search);
  const keyword = params[URL_PARAM];
  const initialValues = !!keyword ? keyword : '';

  return (
    <KeywordFilter
      id="KeywordFilterPopupExample"
      name="keyword"
      urlParam={URL_PARAM}
      label="Keyword"
      onSubmit={(urlParam, values) => handleSubmit(urlParam, values, history)}
      showAsPopup={true}
      liveEdit={false}
      initialValues={initialValues}
      contentPlacementOffset={-14}
    />
  );
});

export const KeywordFilterPopupExample = {
  component: KeywordFilterPopup,
  props: {},
  group: 'filters',
};

const KeywordFilterPlain = withRouter(props => {
  const { history, location } = props;

  const params = parse(location.search);
  const keyword = params[URL_PARAM];
  const initialValues = !!keyword ? keyword : '';

  return (
    <KeywordFilter
      id="KeywordFilterPlainExample"
      name="keyword"
      urlParam={URL_PARAM}
      label="Keyword"
      onSubmit={(urlParam, values) => {
        handleSubmit(urlParam, values, history);
      }}
      showAsPopup={false}
      liveEdit={true}
      initialValues={initialValues}
    />
  );
});

export const KeywordFilterPlainExample = {
  component: KeywordFilterPlain,
  props: {},
  group: 'filters',
};
