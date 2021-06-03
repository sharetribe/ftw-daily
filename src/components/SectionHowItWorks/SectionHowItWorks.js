import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';

import {ReactComponent as CalendarIcon} from './svgs/new-calendar.svg';
import {ReactComponent as HandShakeIcon} from './svgs/hand_shake.svg';
import {ReactComponent as SearchIcon} from './svgs/search.svg';
import {ReactComponent as MoneyIcon} from './svgs/money.svg';
import {ReactComponent as UploadIcon} from './svgs/upload.svg';

import css from './SectionHowItWorks.module.css';

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

  const touTxt = isUser ? "SectionHowItWorks.titleToggleUser" : "SectionHowItWorks.titleToggleHost";
  const toggleCss = isUser ? css.toggleHeaderBlue : css.toggleHeaderPink;
  const typeOfUser = <span className={toggleCss}><FormattedMessage id={touTxt}/></span>;

  // NOTE to change tglGreyedOutText, must not only change the en.json,
  // it also must be changed inside of the css file...
  // SectionHowItWorks.module.css -> line 101 & line 72 inside of
  // '.tglButton .checkbox:checked + .knobs:before' AND '.tglButton .knobs:before'
  const tglGreyedOutText = isUser ? "SectionHowItWorks.toggleGreyTextUser" : "SectionHowItWorks.toggleGreyTextHost";
  const tglGreyCss = isUser ? css.rightSideGreyToggle : css.leftSideGreyToggle;

  const svgCss = isUser ? classNames(css.svg, css.blue) : classNames(css.svg, css.pink);

  const Step1Icon = isUser ? SearchIcon : UploadIcon;
  const step1Title = isUser ? "SectionHowItWorks.part1UserTitle" : "SectionHowItWorks.part1HostTitle";
  const step1Text = isUser ? "SectionHowItWorks.part1UserText" : "SectionHowItWorks.part1HostText";

  const step2Title = isUser ? "SectionHowItWorks.part2UserTitle" : "SectionHowItWorks.part2HostTitle";
  const step2Text = isUser ? "SectionHowItWorks.part2UserText" : "SectionHowItWorks.part2HostText";

  const Step3Icon = isUser ? HandShakeIcon : MoneyIcon;
  const step3Title = isUser ? "SectionHowItWorks.part3UserTitle" : "SectionHowItWorks.part3HostTitle";
  const step3Text = isUser ? "SectionHowItWorks.part3UserText" : "SectionHowItWorks.part3HostText";

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
          <div className={tglGreyCss} onClick={() => onGreyTxtClick()}>
              <p><FormattedMessage id={tglGreyedOutText}/></p>
          </div>
        </div>
      </div>

      <div className={css.steps}>
        <div className={css.step}>
          <div className={css.svgDiv}>
            <Step1Icon className={svgCss}/>
          </div>
          <h2 className={css.stepTitle}><FormattedMessage id={step1Title}/></h2>
          <p><FormattedMessage id={step1Text}/></p>
        </div>

        <div className={css.step}>
          <div className={css.svgDiv}>
            <CalendarIcon className={svgCss}/>
          </div>
          <h2 className={css.stepTitle}><FormattedMessage id={step2Title}/></h2>
          <p><FormattedMessage id={step2Text}/></p>
        </div>

        <div className={css.step}>
          <div className={css.svgDiv}>
            <Step3Icon className={svgCss}/>
          </div>
          <h2 className={css.stepTitle}><FormattedMessage id={step3Title}/></h2>
          <p><FormattedMessage id={step3Text}/></p>
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
