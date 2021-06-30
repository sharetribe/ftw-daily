import React from 'react';
import { string, arrayOf, shape, node, object, oneOf, oneOfType } from 'prop-types';
import classNames from 'classnames';
import { ExternalLink, NamedLink } from '../../components';

import css from './SectionThumbnailLinks.module.css';

const ThumbnailLink = props => {
  const {
    className,
    rootClassName,
    imageWrapperClassName,
    linksPerRow,
    imageUrl,
    imageAltText,
    linkProps,
    text,
  } = props;
  const { type, name, params, to, href } = linkProps;
  const classes = classNames(rootClassName || css.link, className, {
    [css.link2Columns]: linksPerRow === 2,
    [css.link3Columns]: linksPerRow === 3,
  });
  const imageWrapperClasses = classNames(imageWrapperClassName || css.imageWrapper);

  const LinkComponentProps = type === 'NamedLink' ? { name, params, to } : { href };
  const LinkComponent = type === 'NamedLink' ? NamedLink : ExternalLink;

  return (
    <LinkComponent {...LinkComponentProps} className={classes}>
      <div className={imageWrapperClasses}>
        <div className={css.aspectWrapper}>
          <img src={imageUrl} alt={imageAltText} className={css.image} />
        </div>
      </div>
      <div className={css.text}>{text}</div>
    </LinkComponent>
  );
};

const SectionThumbnailLinks = props => {
  const {
    rootClassName,
    className,
    linksPerRow,
    links,
    heading,
    subHeading,
    headingRootClassName,
    subHeadingRootClassName,
    linkClassName,
    linkRootClassName,
    imageWrapperClassName,
  } = props;
  const classes = classNames(rootClassName || css.root, className);
  const headingClasses = headingRootClassName || css.heading;
  const subHeadingClasses = subHeadingRootClassName || css.subHeading;
  return (
    <div className={classes}>
      {heading ? <h2 className={headingClasses}>{heading}</h2> : null}
      {subHeading ? <p className={subHeadingClasses}>{subHeading}</p> : null}
      <div className={css.links}>
        {links.map((link, i) => (
          <ThumbnailLink
            key={i}
            linksPerRow={linksPerRow}
            linkRootClassName={linkRootClassName}
            className={linkClassName}
            imageWrapperClassName={imageWrapperClassName}
            {...link}
          />
        ))}
      </div>
    </div>
  );
};

SectionThumbnailLinks.defaultProps = {
  rootClassName: null,
  className: null,
  heading: null,
  subHeading: null,
  headingRootClassName: null,
  subHeadingRootClassName: null,
  imageWrapperClassName: null,
};

const namedLinkShape = shape({
  type: oneOf(['NamedLink']).isRequired,
  name: string.isRequired,
  params: object,
  to: shape({
    search: string,
    hash: string,
  }),
});

const externalLinkShape = shape({
  type: oneOf(['ExternalLink']).isRequired,
  href: string.isRequired,
});

SectionThumbnailLinks.propTypes = {
  rootClassName: string,
  className: string,

  linksPerRow: oneOf([2, 3]).isRequired,
  links: arrayOf(
    shape({
      imageUrl: string.isRequired,
      imageAltText: string.isRequired,
      linkProps: oneOfType([namedLinkShape, externalLinkShape]).isRequired,
      text: node.isRequired,
    })
  ).isRequired,

  // Styles are defined with the assumption that either both the
  // heading and the subHeading are given, or neither of them are. If
  // only one of them is given, the margins most likely won't make
  // sense.
  heading: node,
  subHeading: node,
  headingRootClassName: string,
  subHeadingRootClassName: string,
  linkClassName: string,
  linkRootClassName: string,
  imageWrapperClassName: string,
};

export default SectionThumbnailLinks;
