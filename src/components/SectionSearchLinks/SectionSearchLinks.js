import React from 'react';
import { string, arrayOf, shape, node, oneOf } from 'prop-types';
import classNames from 'classnames';
import { NamedLink } from '../../components';

import css from './SectionSearchLinks.css';

const SearchLink = props => {
  const { linksPerRow, imageUrl, imageAltText, searchQuery, text } = props;
  const classes = classNames(css.link, {
    [css.link2Columns]: linksPerRow === 2,
    [css.link3Columns]: linksPerRow === 3,
  });
  return (
    <NamedLink name="SearchPage" to={{ search: searchQuery }} className={classes}>
      <div className={css.imageWrapper}>
        <div className={css.aspectWrapper}>
          <img src={imageUrl} alt={imageAltText} className={css.image} />
        </div>
      </div>
      <div className={css.text}>{text}</div>
    </NamedLink>
  );
};

const SectionSearchLinks = props => {
  const {
    rootClassName,
    className,
    linksPerRow,
    links,
    heading,
    subHeading,
    headingRootClassName,
    subHeadingRootClassName,
  } = props;
  const classes = classNames(rootClassName || css.root, className);
  const headingClasses = headingRootClassName || css.heading;
  const subHeadingClasses = subHeadingRootClassName || css.subHeading;
  return (
    <div className={classes}>
      {heading ? <h2 className={headingClasses}>{heading}</h2> : null}
      {subHeading ? <p className={subHeadingClasses}>{subHeading}</p> : null}
      <div className={css.links}>
        {links.map(link => (
          <SearchLink key={link.searchQuery} linksPerRow={linksPerRow} {...link} />
        ))}
      </div>
    </div>
  );
};

SectionSearchLinks.defaultProps = {
  rootClassName: null,
  className: null,
  heading: null,
  subHeading: null,
  headingRootClassName: null,
  subHeadingRootClassName: null,
};

SectionSearchLinks.propTypes = {
  rootClassName: string,
  className: string,

  linksPerRow: oneOf([2, 3]).isRequired,
  links: arrayOf(
    shape({
      imageUrl: string.isRequired,
      imageAltText: string.isRequired,
      searchQuery: string.isRequired,
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
};

export default SectionSearchLinks;
