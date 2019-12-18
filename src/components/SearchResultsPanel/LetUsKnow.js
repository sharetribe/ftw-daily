import React from 'react';
import { FormattedMessage } from 'react-intl';
import css from './SearchResultsPanel.css';

const LET_US_KNOW_FORM_URL = 'https://mailchi.mp/5a03ac4aab1a/nr7802vc1c';

function LetUsKnow() {
  return (
    <article className={css.letUsKnowContainer}>
      <div>
        <h2>
          <FormattedMessage id="LetUsKnow.cantFind" />
        </h2>
        <a href={LET_US_KNOW_FORM_URL} className={css.letUsKnowLink}>
          <span>
            <FormattedMessage id="LetUsKnow.letUsKnow" />
          </span>
        </a>
        <p>
          <FormattedMessage id="LetUsKnow.onTheCase" />
        </p>
      </div>
    </article>
  );
}

export default LetUsKnow;
