import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';

import { NamedLink } from '..';

import css from './SectionWhatIs.css';

const SectionWhatIs = props => {
  const { rootClassName, className } = props;

  const classes = classNames(rootClassName || css.root, className);
  return (
    <div className={classes}>
      <div className={css.title}>
        <FormattedMessage id="SectionHowItWorks.titleLineOne" />
      </div>
      <p>
        <FormattedMessage id="Plataforma online que te permite reservar o acesso a uma piscina durante uma manhã, tarde ou dia inteiro. Mergulha na nossa plataforma e encontra a piscina indicada para um dia bem passado, seja ela localizada numa casa particular ou num estabelecimento turístico. O conceito assemelha-se muito às plataformas de reserva de casas e hotéis. Neste caso, em vez da reserva de quartos/casas, poderás reservar o acesso a uma piscina." />
      </p>
      <div className={css.createListingLink}>
        <NamedLink name="NewListingPage">
          <FormattedMessage id="SectionHowItWorks.createListingLink" />
        </NamedLink>
      </div>
    </div>
  );
};

SectionWhatIs.defaultProps = { rootClassName: null, className: null };

const { string } = PropTypes;

SectionWhatIs.propTypes = {
  rootClassName: string,
  className: string,
};

export default SectionWhatIs;
