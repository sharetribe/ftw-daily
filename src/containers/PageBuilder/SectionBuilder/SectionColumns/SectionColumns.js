import React, { useState } from 'react';
import { arrayOf, bool, func, node, number, object, shape, string } from 'prop-types';
import classNames from 'classnames';

import Field, { hasDataInFields } from '../../Field';
import BlockBuilder from '../../BlockBuilder';

import SectionContainer from '../SectionContainer';
import css from './SectionColumns.module.css';
import { Button, IconCard, PrimaryButton } from '../../../../components';

// The number of columns (numColumns) affects styling and responsive images
const COLUMN_CONFIG = [
  { css: css.oneColumn, responsiveImageSizes: '(max-width: 767px) 100vw, 1200px' },
  { css: css.twoColumns, responsiveImageSizes: '(max-width: 767px) 100vw, 600px' },
  { css: css.threeColumns, responsiveImageSizes: '(max-width: 767px) 100vw, 400px' },
  { css: css.fourColumns, responsiveImageSizes: '(max-width: 767px) 100vw, 265px' },
];
const getIndex = numColumns => numColumns - 1;
const getColumnCSS = numColumns => {
  const config = COLUMN_CONFIG[getIndex(numColumns)];
  return config ? config.css : COLUMN_CONFIG[0].css;
};
const getResponsiveImageSizes = numColumns => {
  const config = COLUMN_CONFIG[getIndex(numColumns)];
  return config ? config.responsiveImageSizes : COLUMN_CONFIG[0].responsiveImageSizes;
};

// Section component that's able to show blocks in multiple different columns (defined by "numColumns" prop)
const SectionColumns = props => {
  const {
    sectionId,
    className,
    rootClassName,
    defaultClasses,
    numColumns,
    title,
    description,
    appearance,
    callToAction,
    blocks,
    isInsideContainer,
    options,
  } = props;

  const [toggle, setToggle] = useState(false);

  const handleToggleState = () => {
    setToggle(prev => !prev);
    onShowMap()
  };
  // If external mapping has been included for fields
  // E.g. { h1: { component: MyAwesomeHeader } }
  const fieldComponents = options?.fieldComponents;
  const fieldOptions = { fieldComponents };

  const hasHeaderFields = hasDataInFields([title, description, callToAction], fieldOptions);
  const hasBlocks = blocks?.length > 0;

  return (
    <SectionContainer
      id={sectionId}
      className={className}
      rootClassName={rootClassName}
      appearance={appearance}
      options={fieldOptions}
      sectionId={sectionId}
    >
      {hasHeaderFields ? (
        <header className={defaultClasses.sectionDetails}>
          <Field data={title} className={
            sectionId == "featured-locations" ? css.headingServices :
              sectionId == "petcrib-work" ? css.headingServices :
                defaultClasses.title}
            options={fieldOptions}
          />
          <Field data={description} className={defaultClasses.description} options={fieldOptions} />
          <Field data={callToAction} className={defaultClasses.ctaButton} options={fieldOptions} />
        </header>
      ) : null}
      {hasBlocks ? (
        <div
          className={classNames(
            sectionId == "petcrib-work" ? css.petGrid :
              sectionId == "intro" ? css.introSection :
                sectionId == "featured-locations" ? css.serviceGrid :
                  defaultClasses.blockContainer, getColumnCSS(numColumns),
            { [css.noSidePaddings]: isInsideContainer, })}
        >
          <BlockBuilder
            ctaButtonClass={defaultClasses.ctaButton}
            blocks={blocks}
            responsiveImageSizes={getResponsiveImageSizes(numColumns)}
            options={options}
          />
          {sectionId == "intro" ?
            <div className={css.searchBox}>
              <div className={css.formRow}>
                <div className={css.selectForm}>
                  <label>Type of Pet</label>
                  <select>
                    <option>Dog </option>
                    <option>Cat</option>
                  </select>
                </div>
                <div className={css.selectForm}>
                  <label>Number of Pets</label>
                  <select>
                    <option>1 </option>
                    <option>2</option>
                    <option>3+</option>
                  </select>
                </div>
              </div>
              <div className={css.selectForm}>
                <label>Type of Hosting Services</label>
                <select>
                  <option>Overnight Stay	</option>
                  <option>Day Care Stay	</option>
                </select>
              </div>
              <div className={css.daysCalender}>
                <div className={css.dateInput}>
                  <label>Start date</label>
                  <div className={css.dateInputBox}>
                    <input
                      type='date'
                    />
                  </div>
                </div>
                <div className={css.dateInput}>
                  <label>End date</label>
                  <div className={css.dateInputBox}>
                    <input
                      type='date'
                    />
                  </div>
                </div>
              </div>
              <div className={css.servicesNeedTime}>
                <div className={css.needServicesHeading}>How often do you need this service?</div>
                <div className={css.servicesSelect}>
                  <div
                    className={classNames(css.service, {
                      [css.selected]: toggle,
                    })}
                    onClick={handleToggleState}
                  >
                    <IconCard brand="calender" />
                    <span>One Time</span>
                  </div>
                  <div
                    onClick={handleToggleState}
                    className={classNames(css.service, {
                      [css.selected]: toggle,
                    })}
                  >
                    <IconCard brand="repeat" />
                    <span>Repeat Weekly</span>
                  </div>
                </div>
              </div>
              <div className={css.daysSelected}>
                <div className={css.daysLeft}>
                  <label>For which days?</label>
                  <div className={css.daysWeek}>
                    <span>Sun</span>
                    <span>Mon</span>
                    <span>Tue</span>
                    <span>Wed</span>
                    <span>Thu</span>
                    <span>Fri</span>
                    <span>Sat</span>
                  </div>
                </div>
                <div className={css.daysRight}>
                  <div className={css.dateInput}>
                    <label>Start date</label>
                    <div className={css.dateInputBox}>
                      <input
                        type='date'
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className={css.locationForm}>
                <div className={css.inputBox}>
                  <input
                    type='text'
                    placeholder='Location (Postcode)'
                  />
                </div>
              </div>
              <div className={css.weightBox}>
                <div className={css.weightList}>
                  <div className={css.weightKg}>0-6 Kg</div>
                  <div className={css.weightType}>Small</div>
                </div>
                <div className={css.weightList}>
                  <div className={css.weightKg}>7-20 Kgs</div>
                  <div className={css.weightType}>Medium</div>
                </div>
                <div className={css.weightList}>
                  <div className={css.weightKg}>20-40 Kgs</div>
                  <div className={css.weightType}>Large</div>
                </div>
                <div className={css.weightList}>
                  <div className={css.weightKg}>40+ Kg</div>
                  <div className={css.weightType}>Gaint</div>
                </div>
              </div>
              <div className={css.bottomButton}>
                <Button>
                  Search
                </Button>
              </div>
            </div>
            : null}
        </div>
      ) : null}
    </SectionContainer>
  );
};

const propTypeOption = shape({
  fieldComponents: shape({ component: node, pickValidProps: func }),
});

SectionColumns.defaultProps = {
  className: null,
  rootClassName: null,
  defaultClasses: null,
  textClassName: null,
  numColumns: 1,
  title: null,
  description: null,
  appearance: null,
  callToAction: null,
  blocks: [],
  isInsideContainer: false,
  options: null,
};

SectionColumns.propTypes = {
  sectionId: string.isRequired,
  className: string,
  rootClassName: string,
  defaultClasses: shape({
    sectionDetails: string,
    title: string,
    description: string,
    ctaButton: string,
  }),
  numColumns: number,
  title: object,
  description: object,
  appearance: object,
  callToAction: object,
  blocks: arrayOf(object),
  isInsideContainer: bool,
  options: propTypeOption,
};

export default SectionColumns;
