import React, { PropTypes } from 'react';
import classNames from 'classnames';
import css from './StyleguidePage.css';
import mpStyle from '../../marketplace.css';

const Font = props => {
  const { component: TextComponent, description, styling } = props;
  return (
    <div className={css.fontCard}>
      <div className={css.element}>
        <TextComponent />
      </div>
      <div className={css.description}>
        <p>{description}</p>
        <pre className={mpStyle.tinyFont}>{styling}</pre>
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
  padding: 1px 0 5px;

  Desktop styles:
  font-size: 90px;
  line-height: 96px;
  padding: 1px 0 7px;`;

  const h1FontStyling = `Mobile styles:
  font-size: 30px;
  line-height: 36px;

  Desktop styles:
  font-size: 48px;
  line-height: 56px;`;

  const h2FontStyling = `Mobile styles:
  font-size: 24px;
  line-height: 30px;
  padding: 5px 0 1px;

  Desktop styles:
  font-size: 24px;
  line-height: 32px;
  padding: 5px 0 3px;`;

  const h3FontStyling = `Mobile styles:
  font-size: 20px;
  line-height: 24px;
  padding: 4px 0 2px;

  Desktop styles:
  font-size: 20px;
  line-height: 24px;
  padding: 4px 0 4px;`;

  const h4FontStyling = `Mobile styles:
  font-size: 16px;
  line-height: 24px;
  padding: 0;

  Desktop styles:
  font-size: 16px;
  line-height: 24px;
  padding: 5px 0 3px;`;

  const h5FontStyling = `Mobile styles:
  font-size: 14px;
  line-height: 18px;
  padding: 4px 0 2px;

  Desktop styles:
  font-size: 14px;
  line-height: 16px;
  padding: 2px 0 6px;`;

  const h6FontStyling = `Mobile styles:
  font-size: 12px;
  line-height: 18px;
  padding: 4px 0 2px;

  Desktop styles:
  font-size: 12px;
  line-height: 16px;
  padding: 2px 0 6px;`;

  const bodyFontStyling = `Mobile styles:
  font-size: 18px;
  line-height: 24px;
  padding: 2.5px 0 3.5px;

  Desktop styles:
  font-size: 20px;
  line-height: 32px;
  padding: 5px 0 3px;`;

  const tinyFontStyling = `Mobile styles:
  font-size: 13px;
  line-height: 18px;
  padding: 2px 0 4px;

  Desktop styles:
  font-size: 13px;
  line-height: 18px;
  padding: 7px 0 1px;`;

  const fontsContainerClasses = classNames(css.fontsContainer, css.baselines);

  return (
    <div className={css.typographyContent}>
      <p className={css.spacing2x}>
        The line-height of typographic elements is an multiple of 6px on mobile and multiple of 8px
        on desktop. In addition to line-height, baselines are adjusted with vertical padding
        (the sum of those paddings will be 6px on mobile or 8px on desktop). As a result one can
        position following typographic elements with margins that are also multiples of 6px (or 8px).
      </p>
      <p className={css.spacing2x}>
        N.B. box-sizing is border-box, so borders affect to the total height of elements.
      </p>
      <div className={fontsContainerClasses}>
        <Font
          component={() => (
            <p className={mpStyle.heroTitle}>
              Hello beautiful world.
            </p>
          )}
          description=".heroTitle: Biggest font style. Used in the hero in landingPage. Works as a site title."
          styling={heroTitleFontStyling}
        />
        <Font
          component={() => <h1>Listing + Page title</h1>}
          description="H1 / .h1Font: Works as a page title. Inline component using .h2Font can be aligned with .h1Font to the same baseline by dropping it 18px (e.g. with margin-top)."
          styling={h1FontStyling}
        />
        <Font
          component={() => <h2>This many listings found in here</h2>}
          description="H2 / .h2Font: Works as a page subtitle and in sidebar menu link."
          styling={h2FontStyling}
        />
        <Font
          component={() => <h3>About this listing</h3>}
          description="H3 / .h3Font: Works as a paragraph subtitle."
          styling={h3FontStyling}
        />
        <Font
          component={() => <h4>H4 (.h4Font): Lorem ipsum dolor sit amet</h4>}
          description="Can be used as a subtitle and also as a label font for form inputs."
          styling={h4FontStyling}
        />
        <Font
          component={() => (
            <h5>You will only be charged if your request is accepted by the provider.</h5>
          )}
          description="H5 / .h5Font: Can be used as a fine print text."
          styling={h5FontStyling}
        />
        <Font
          component={() => <h6>Close</h6>}
          description="H6 / .h6Font: Works as a close text."
          styling={h6FontStyling}
        />
        <Font
          component={() => (
            <p>
              Curabitur blandit tempus porttitor. Etiam porta sem malesuada magna mollis euismod. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.
            </p>
          )}
          description=".bodyFont, p, button, etc: Paragraphs and other body texts."
          styling={bodyFontStyling}
        />
        <Font
          component={() => (
            <p className={mpStyle.tinyFont}>
              Hosted by user
            </p>
          )}
          description=".tinyFont: Very small print."
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
