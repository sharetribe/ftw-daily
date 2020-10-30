import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';
import { lazyLoadWithDimensions } from '../../util/contextHelpers';

import friendsWorking from './images/coworking.jpg';

import css from './SectionWhat.css';

class CategoryImage extends Component {
  render() {
    const { alt, ...rest } = this.props;
    return <img alt={alt} {...rest} />;
  }
}
const LazyImage = lazyLoadWithDimensions(CategoryImage);

const SectionWhat = props => {
  const { rootClassName, className } = props;
  const classes = classNames(rootClassName || css.root, className);

  return (
    <div className={classes}>
      <div className={css.title}>
        <FormattedMessage id="SectionWhat.title" />
      </div>

      <div className={css.container}>
        <div className={css.descriptionDiv} >
          <p>
            <FormattedMessage id="SectionWhat.text1"/>
          </p>
          <p>
            <FormattedMessage id="SectionWhat.text2"/>
            <FormattedMessage id="SectionWhat.text3"/>
            <FormattedMessage id="SectionWhat.text4"/>
          </p>
          <p>
            <FormattedMessage id="SectionWhat.text5"/>
          </p>
          <p>
            <FormattedMessage id="SectionWhat.text6"/>
            <FormattedMessage id="SectionWhat.text7"/>
          </p>
        </div>
        <div className={css.imageContainer}>
          <div className={css.imageWrapper}>
            <div className={css.aspectWrapper}>
              <LazyImage src={friendsWorking} alt={"What is Hotpatch"} className={css.mainImage} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

SectionWhat.defaultProps = { rootClassName: null, className: null };

const { string } = PropTypes;

SectionWhat.propTypes = {
  rootClassName: string,
  className: string,
};

export default SectionWhat;
