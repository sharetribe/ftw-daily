import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';
import { lazyLoadWithDimensions } from '../../util/contextHelpers';

import friendsWorking from './images/what-is-hotpatch.png';

import css from './SectionWhatIsHotpatch.css';

class CategoryImage extends Component {
  render() {
    const { alt, ...rest } = this.props;
    return <img alt={alt} {...rest} />;
  }
}
const LazyImage = lazyLoadWithDimensions(CategoryImage);

const SectionWhatIsHotpatch = props => {
  const { rootClassName, className } = props;
  const classes = classNames(rootClassName || css.root, className);

  return (
    <div className={classes}>
      <div className={css.title}>
        <FormattedMessage id="SectionWhatIsHotpatch.title" />
      </div>

      <div className={css.container}>
        <div className={css.descriptionDiv} >
          <p>
            <FormattedMessage id="SectionWhatIsHotpatch.text1"/>
          </p>
          <p>
            <FormattedMessage id="SectionWhatIsHotpatch.text2"/>
            <FormattedMessage id="SectionWhatIsHotpatch.text3"/>
            <FormattedMessage id="SectionWhatIsHotpatch.text4"/>
          </p>
          <p>
            <FormattedMessage id="SectionWhatIsHotpatch.text5"/>
          </p>
          <p>
            <FormattedMessage id="SectionWhatIsHotpatch.text6"/>
            <FormattedMessage id="SectionWhatIsHotpatch.text7"/>
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

SectionWhatIsHotpatch.defaultProps = { rootClassName: null, className: null };

const { string } = PropTypes;

SectionWhatIsHotpatch.propTypes = {
  rootClassName: string,
  className: string,
};

export default SectionWhatIsHotpatch;
