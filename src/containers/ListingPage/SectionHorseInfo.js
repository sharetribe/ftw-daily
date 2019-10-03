import React from 'react';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import config from '../../config';

import css from './ListingPage.css';

const SectionHorseInfo = props => {
  const { data, options } = props;
  return (
    <div className={css.listingSectionContainer}>
      <h2 className={css.listingSectionTitle}>
        <FormattedMessage id="ListingPage.horseInfoTitle" />
      </h2>
      <ul className={css.threeColumns}>
        {Object.keys(data).map(key => (
          <li key={key.toString()} className={css.listingItemContainer}>
            {(() => {
              switch (key) {
                case 'age':
                  return <img className={css.listingIcon} src='/static/icons/streamline-icon-calendar.png' />
                case 'breed':
                  return <img className={css.listingIcon} src='/static/icons/streamline-icon-flash.png' />
                case 'color':
                  return <img className={css.listingIcon} src='/static/icons/streamline-icon-blood-drop.png' />
                case 'gender':
                  return <img className={css.listingIcon} src='/static/icons/streamline-icon-gender-hetero.png' />
                case 'hight':
                  return <img className={css.listingIcon} src='/static/icons/streamline-icon-expand-vertical.png' />
                case 'mainDiscipline':
                  return <img className={css.listingIcon} src='/static/icons/streamline-icon-certified-ribbon.png' />
                default:
                  return null;
              }
            })()}

            <div>
              <p className={classNames(css.listingSecondaryText, css.horseInfoItemTitle)}>
                <FormattedMessage id={`ListingPage.horseInfo.${key}`} />
              </p>
              <p className={classNames(css.listingPrimaryText, css.horseInfoItemValue)}>
                {options[key].find(value => value.key === data[key].toString()).label}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

SectionHorseInfo.defaultProps = {
  options: {
    age: config.custom.ages,
    breed: config.custom.breeds,
    color: config.custom.colors,
    gender: config.custom.genders,
    hight: config.custom.hights,
    mainDiscipline: config.custom.disciplines,
  },
};

export default SectionHorseInfo;
