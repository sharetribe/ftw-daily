import React from 'react';
import classNames from 'classnames';

import Field from '../Fields/Field.js';

import css from './BlockBuilder.module.css';

///////////////////
// Block wrapper //
///////////////////

// This element can be used to wrap some common styles and features,
// if there are multiple blockTypes,
const BlockTag = props => {
  const { className, rootClassName, as, ...otherProps } = props;
  const Tag = as || 'div';
  const classes = classNames(rootClassName || css.blockTag, className);

  return <Tag className={classes} {...otherProps} />;
};

///////////////////
// Custom blocks //
///////////////////

const BlockDefault = props => {
  const { blockId, title, text, callToAction, ctaButtonClass, media, options } = props;

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

////////////////////
// Blocks builder //
////////////////////

const defaultBlockComponents = {
  ['default-block']: { component: BlockDefault },
};

const BlockBuilder = props => {
  const { blocks, ctaButtonClass, options } = props;
  const ctaButtonClassMaybe = ctaButtonClass ? { ctaButtonClass } : {};

  // If external mapping has been included for fields
  // E.g. { h1: { component: MyAwesomeHeader } }
  const { blockComponents, fieldComponents } = options || {};
  const blockOptionsMaybe = fieldComponents ? { options: { fieldComponents } } : {};

  // If there's no block, we can't render the correct block component
  if (!blocks || blocks.length === 0) {
    return null;
  }

  // Selection of Block components
  const components = { ...defaultBlockComponents, ...blockComponents };

  return (
    <>
      {blocks.map(block => {
        const config = components[block.blockType];
        const Block = config?.component;
        if (Block) {
          return (
            <Block key={block.blockId} {...ctaButtonClassMaybe} {...blockOptionsMaybe} {...block} />
          );
        } else {
          // If the block type is unknown, the app can't know what to render
          console.warn(`Unknown block type (${block.blockType}) detected.`);
          return null;
        }
      })}
    </>
  );
};

export { BlockTag, BlockDefault };

export default BlockBuilder;
