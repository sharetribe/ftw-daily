import React from 'react';
import { arrayOf, bool, func, node, object, shape, string } from 'prop-types';
import classNames from 'classnames';

import Field, { hasDataInFields } from '../../Field';
import BlockBuilder from '../../BlockBuilder';

import SectionContainer from '../SectionContainer';

import css from './SectionFeatures.module.css';

// Section component that shows features.
// Block content are shown in a row-like way:
// [image] text
// text [image]
// [image] text
const SectionFeatures = props => {
  const {
    sectionId,
    className,
    rootClassName,
    defaultClasses,
    title,
    ingress,
    background,
    callToAction,
    blocks,
    isInsideContainer,
    options,
  } = props;

  // If external mapping has been included for fields
  // E.g. { h1: { component: MyAwesomeHeader } }
  const fieldComponents = options?.fieldComponents;
  const fieldOptions = { fieldComponents };

  const hasHeaderFields = hasDataInFields([title, ingress, callToAction], fieldOptions);
  const hasBlocks = blocks?.length > 0;

  return (
    <SectionContainer
      id={sectionId}
      className={className}
      rootClassName={rootClassName}
      background={background}
      options={fieldOptions}
    >
      {hasHeaderFields ? (
        <header className={defaultClasses.sectionDetails}>
          <Field data={title} className={defaultClasses.title} options={fieldOptions} />
          <Field data={ingress} className={defaultClasses.ingress} options={fieldOptions} />
          <Field data={callToAction} className={defaultClasses.ctaButton} options={fieldOptions} />
        </header>
      ) : null}
      {hasBlocks ? (
        <div className={classNames(css.featuresMain, { [css.noSidePaddings]: isInsideContainer })}>
          <BlockBuilder
            rootClassName={css.block}
            ctaButtonClass={defaultClasses.ctaButton}
            blocks={blocks}
            options={options}
          />
        </div>
      ) : null}
    </SectionContainer>
  );
};

const propTypeOption = shape({
  fieldComponents: shape({ component: node, pickValidProps: func }),
});

SectionFeatures.defaultProps = {
  className: null,
  rootClassName: null,
  defaultClasses: null,
  textClassName: null,
  title: null,
  ingress: null,
  background: null,
  backgroundImage: null,
  callToAction: null,
  blocks: [],
  isInsideContainer: false,
  options: null,
};

SectionFeatures.propTypes = {
  sectionId: string.isRequired,
  className: string,
  rootClassName: string,
  defaultClasses: shape({
    sectionDetails: string,
    title: string,
    ingress: string,
    ctaButton: string,
  }),
  title: object,
  ingress: object,
  background: object,
  backgroundImage: object,
  callToAction: object,
  blocks: arrayOf(object),
  isInsideContainer: bool,
  options: propTypeOption,
};

export default SectionFeatures;
