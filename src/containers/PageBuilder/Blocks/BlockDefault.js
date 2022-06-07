import React from 'react';

import Field from '../Fields/Field.js';

import css from './BlockBuilder.module.css';

///////////////////
// Custom blocks //
///////////////////

const BlockDefault = props => {
  const {
    tag: BlockTag,
    blockId,
    title,
    text,
    callToAction,
    ctaButtonClass,
    media,
    options,
  } = props;

  const fieldMedia = <Field data={media} options={options} />;
  return (
    <BlockTag id={blockId}>
      {fieldMedia ? <div className={css.media}>{fieldMedia}</div> : null}
      <div className="text">
        <Field data={title} options={options} />
        <Field data={text} options={options} />
        <Field data={callToAction} className={ctaButtonClass} options={options} />
      </div>
    </BlockTag>
  );
};

export default BlockDefault;
