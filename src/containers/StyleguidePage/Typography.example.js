import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import css from './StyleguidePage.module.css';

const Font = props => {
  const { component: TextComponent, description, styling } = props;
  return (
    <div className={css.fontCard}>
      <div className={css.element}>
        <TextComponent />
      </div>
      <div className={css.description}>
        <p>{description}</p>
        <pre className={css.tinyFont}>{styling}</pre>
      </div>
    </div>
  );
};

const { func, string } = PropTypes;

Font.propTypes = {
  component: func.isRequired,
  description: string.isRequired,
  styling: string.isRequired,
};

const Fonts = () => {
  const heroTitleFontStyling = `Mobile styles:
  font-size: 48px;
  line-height: 54px;
  margin-top: 25px;
  margin-bottom: 29px;

  Desktop styles:
  font-size: 90px;
  line-height: 96px;
  margin-top: 25px;
  margin-bottom: 31px;`;

  const h1FontStyling = `Mobile styles:
  font-size: 30px;
  line-height: 36px;
  margin-top: 18px;
  margin-bottom: 18px;

  Desktop styles:
  font-size: 48px;
  line-height: 56px;
  margin-top: 24px;
  margin-bottom: 24px;`;

  const h2FontStyling = `Mobile styles:
  font-size: 24px;
  line-height: 30px;
  margin-top: 21px;
  margin-bottom: 17px;

  Desktop styles:
  font-size: 24px;
  line-height: 32px;
  margin-top: 21px;
  margin-bottom: 19px;`;

  const h3FontStyling = `Mobile styles:
  font-size: 20px;
  line-height: 24px;
  margin-top: 16px;
  margin-bottom: 14px;

  Desktop styles:
  font-size: 20px;
  line-height: 24px;
  margin-top: 16px;
  margin-bottom: 16px;`;

  const h4FontStyling = `Mobile styles:
  font-size: 16px;
  line-height: 24px;
  margin-top: 12px;
  margin-bottom: 12px;

  Desktop styles:
  font-size: 16px;
  line-height: 24px;
  margin-top: 17px;
  margin-bottom: 15px;`;

  const h5FontStyling = `Mobile styles:
  font-size: 14px;
  line-height: 18px;
  margin-top: 10px;
  margin-bottom: 8px;

  Desktop styles:
  font-size: 14px;
  line-height: 16px;
  margin-top: 10px;
  margin-bottom: 14px;`;

  const h6FontStyling = `Mobile styles:
  font-size: 12px;
  line-height: 18px;
  margin-top: 10px;
  margin-bottom: 8px;

  Desktop styles:
  font-size: 12px;
  line-height: 16px;
  margin-top: 10px;
  margin-bottom: 6px;`;

  const bodyFontStyling = `Mobile styles:
  font-size: 18px;
  line-height: 24px;
  margin-top: 12px;
  margin-bottom: 12px;

  Desktop styles:
  font-size: 20px;
  line-height: 32px;
  margin-top: 16px;
  margin-bottom: 16px;`;

  const tinyFontStyling = `Mobile styles:
  font-size: 13px;
  line-height: 18px;
  margin-top: 9.5px;
  margin-bottom: 8.5px;

  Desktop styles:
  font-size: 13px;
  line-height: 18px;
  margin-top: 10.5px;
  margin-bottom: 13.5px;`;

  const fontsContainerClasses = classNames(css.fontsContainer, css.baselines);

  return (
    <div className={css.typographyContent}>
      <p className={css.spacing2x}>
        The line-height of typographic elements is an multiple of 6px on mobile and multiple of 8px
        on desktop. In addition to line-height, baselines are adjusted with vertical padding (the
        sum of those paddings will be 6px on mobile or 8px on desktop). As a result one can position
        following typographic elements with margins that are also multiples of 6px (or 8px).
      </p>
      <p className={css.spacing2x}>
        N.B. box-sizing is border-box, so borders affect to the total height of elements.
      </p>
      <div className={fontsContainerClasses}>
        <Font
          component={() => <p className={css.heroTitle}>Hello beautiful world.</p>}
          description="--marketplaceHeroTitleFontStyles: Biggest font style. Used in the hero in landingPage. Works as a site title."
          styling={heroTitleFontStyling}
        />
        <Font
          component={() => <h1>Listing + Page title</h1>}
          description="H1 / --marketplaceH1FontStyles: Works as a page title. Inline component using --marketplaceH1FontStyles can be aligned with .h1Font to the same baseline by dropping it 18px (e.g. with margin-top)."
          styling={h1FontStyling}
        />
        <Font
          component={() => <h2>This many listings found in here</h2>}
          description="H2 / --marketplaceH2FontStyles: Works as a page subtitle and in sidebar menu link."
          styling={h2FontStyling}
        />
        <Font
          component={() => <h3>About this listing</h3>}
          description="H3 / --marketplaceH3FontStyles: Works as a paragraph subtitle."
          styling={h3FontStyling}
        />
        <Font
          component={() => <h4>H4 (--marketplaceH4FontStyles): Lorem ipsum dolor sit amet</h4>}
          description="Can be used as a subtitle and also as a label font for form inputs."
          styling={h4FontStyling}
        />
        <Font
          component={() => (
            <h5>You will only be charged if your request is accepted by the provider.</h5>
          )}
          description="H5 / --marketplaceH5FontStyles: Can be used as a fine print text."
          styling={h5FontStyling}
        />
        <Font
          component={() => <h6>Close</h6>}
          description="H6 / --marketplaceH6FontStyles: Works as a close text."
          styling={h6FontStyling}
        />
        <Font
          component={() => (
            <p>
              Curabitur blandit tempus porttitor. Etiam porta sem malesuada magna mollis euismod.
              Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Duis
              mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec
              elit.
            </p>
          )}
          description="--marketplaceBodyFontStyles, p, button, etc: Paragraphs and other body texts."
          styling={bodyFontStyling}
        />
        <Font
          component={() => <p className={css.tinyFont}>Hosted by user</p>}
          description="--marketplaceTinyFontStyles: Very small print."
          styling={tinyFontStyling}
        />
      </div>
    </div>
  );
};

export const Typography = {
  component: Fonts,
  props: {},
  group: 'typography',
};
