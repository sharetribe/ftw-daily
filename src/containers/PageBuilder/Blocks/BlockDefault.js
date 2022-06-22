import React from 'react';

import Field from '../Fields/Field.js';
import BlockTag from './BlockTag.js';

import css from './BlockDefault.module.css';

const BlockDefault = props => {
  const {
    blockId,
    blockClassName,
    mediaClassName,
    textClassName,
    title,
    text,
    callToAction,
    ctaButtonClass,
    media,
    options,
  } = props;

  const fieldMedia = <Field data={media} options={options} />;
  return (
    <BlockTag id={blockId} className={classNames(blockClassName, css.root)}>
      {fieldMedia ? (
        <div className={classNames(mediaClassName, css.media)}>{fieldMedia}</div>
      ) : null}
      <div className={classNames(textClassName, css.text)}>
        <Field data={title} options={options} />
        <Field data={text} options={options} />
        <Field data={callToAction} className={ctaButtonClass} options={options} />
      </div>
    </BlockTag>
  );
};

export default BlockDefault;
