import React from 'react';
import { string } from 'prop-types';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import { NamedLink } from '../../components';
import MainSearchForm from '../../forms/MainSearchForm/MainSearchForm'
import { handleSearch } from './../../services/Search'

import css from './SectionHero.css';

const SectionHero = props => {
  const { rootClassName, className } = props;
  const classes = classNames(rootClassName || css.root, className);
  const handleSubmit = (values) => {
    handleSearch({
      values, 
      history: props.history,
      currentSearchParams: props.currentSearchParams,
    })
  }
  return (
    <div className={classes}>
      <div className={css.heroContent}>
        <MainSearchForm
          form="TopbarSearchForm"
          onSubmit={handleSubmit}
          initialValues={null}
          isMobile={false}
        />
      </div>
    </div>
  );
};

SectionHero.defaultProps = { rootClassName: null, className: null };

SectionHero.propTypes = {
  rootClassName: string,
  className: string,
};

export default SectionHero;
