import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';

import {ReactComponent as CalendarIcon} from './svgs/calendar.svg';
import {ReactComponent as HandShakeIcon} from './svgs/hand_shake.svg';
import {ReactComponent as SearchIcon} from './svgs/search.svg';
import {ReactComponent as MoneyIcon} from './svgs/money.svg';
import {ReactComponent as CreateIcon} from './svgs/create.svg';

import css from './SectionHowItWorks.css';

const userGreyTab =
  <div
    className={css.rightSideGreyToggle}
    onClick={() => onGreyTxtClick()}>
      <p>I have space</p>
  </div>;

const hostGreyTab =
  <div
    className={css.leftSideGreyToggle}
    onClick={() => onGreyTxtClick()}>
      <p>I need space</p>
  </div>;

const onGreyTxtClick = () => {
  const toggleDiv = document.getElementById("toggle");
  toggleDiv.click();
  let checkbox = toggleDiv.firstElementChild;
  checkbox.checked = !checkbox.checked;
}

const SectionHowItWorks = props => {
  const { rootClassName, className } = props;
  const [isUser, setToggle] = useState(true);

  const classes = classNames(rootClassName || css.root, className);
  const typeOfUserTxt = isUser ? 'For Professionals' : 'For Hosts';
  const toggleCss = isUser ? css.toggleHeaderBlue : css.toggleHeaderGreen;
  const typeOfUser = <span className={toggleCss}>{typeOfUserTxt}</span>;
  const svgCss = isUser ? css.svgBlue : css.svgPink;
  const Step1Icon = isUser ? SearchIcon : CreateIcon;
  const Step3Icon = isUser ? HandShakeIcon : MoneyIcon;

  return (
    <div className={classes}>
      <div className={css.title}>
        <FormattedMessage
          id="SectionHowItWorks.titleLineOne"
          values={{userType: typeOfUser}}
        />
      </div>

      <div className={css.toggleSection}>
        <div
          id="toggle"
          onClick={() => setToggle(!isUser)}
          className={classNames(css.tglButton, css.r)}
        >
          <input type="checkbox" className={css.checkbox} />
          <div className={css.knobs} />
          <div className={css.layer} />
          {isUser ? userGreyTab : hostGreyTab}
        </div>
      </div>

      <div className={css.steps}>
        <div className={css.step}>
          <div className={css.svgDiv}>
            <Step1Icon className={svgCss} style={{width: 75, height: 85}} />
          </div>
          <h2 className={css.stepTitle}>
            <FormattedMessage
              id={ isUser ? "SectionHowItWorks.part1UserTitle" : "SectionHowItWorks.part1HostTitle"}
            />
          </h2>
          <p>
            <FormattedMessage
              id={ isUser ? "SectionHowItWorks.part1UserText" : "SectionHowItWorks.part1HostText"}
            />
          </p>
        </div>

        <div className={css.step}>
          <div className={css.svgDiv}>
            <CalendarIcon className={svgCss} style={{width: 75, height: 85}} />
          </div>
          <h2 className={css.stepTitle}>
            <FormattedMessage
              id={ isUser ? "SectionHowItWorks.part2UserTitle" : "SectionHowItWorks.part2HostTitle"}
            />
          </h2>
          <p>
            <FormattedMessage
              id={ isUser ? "SectionHowItWorks.part2UserText" : "SectionHowItWorks.part2HostText"}
            />
          </p>
        </div>

        <div className={css.step}>
          <div className={css.svgDiv}>
            <Step3Icon className={svgCss} style={{width: 75, height: 85}} />
          </div>
          <h2 className={css.stepTitle}>
            <FormattedMessage
              id={ isUser ? "SectionHowItWorks.part3UserTitle" : "SectionHowItWorks.part3HostTitle"}
            />
          </h2>
          <p>
            <FormattedMessage
              id={ isUser ? "SectionHowItWorks.part3UserText" : "SectionHowItWorks.part3HostText"}
            />
          </p>
        </div>
      </div>
    </div>
  );
};

SectionHowItWorks.defaultProps = { rootClassName: null, className: null };

const { string } = PropTypes;

SectionHowItWorks.propTypes = {
  rootClassName: string,
  className: string,
};

export default SectionHowItWorks;
