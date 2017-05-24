import React, { PropTypes } from 'react';
import classNames from 'classnames';
import css from './StyleguidePage.css';
import mpStyle from '../../marketplace.css';


const Font = props =>  {
  const { component: TextComponent, description, styling } = props;
  return (
    <div className={css.fontCard}>
      <div className={css.element}>
        <TextComponent/>
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
}

const Fonts = () =>  {
  const h1FontStyling =
  `Styles affecting size:
  font-size: 48px;
  line-height: 54px;
  padding: 5px 0 1px 0;`;

  const h2FontStyling = `Styles affecting size:
  font-size: 30px;
  line-height: 36px;
  padding: 3.5px 0 2.5px 0;`;

  const h3FontStyling = `Styles affecting size:
  font-size: 24px;
  line-height: 30px;
  padding: 3px 0 3px 0;`;

  const h4FontStyling = `Styles affecting size:
  font-size: 20px;
  line-height: 24px;
  padding: 2px 0 4px 0;`;

  const h5FontStyling = `Styles affecting size:
  font-size: 16px;
  line-height: 24px;
  padding: 3.5px 0 2.5px 0;`;

  const h6FontStyling = `Styles affecting size:
  font-size: 14px;
  line-height: 18px;
  padding: 1.5px 0 4.5px 0;`;

  const bodyFontStyling = `Styles affecting size:
  font-size: 18px;
  line-height: 24px;
  padding: 2.5px 0 3.5px 0;`;

  const tinyFontStyling = `Styles affecting size:
  font-size: 13px;
  line-height: 18px;
  padding: 2px 0 4px 0;`;

  const fontsContainerClasses = classNames(css.fontsContainer, css.baselines);

  return (
    <div className={css.content}>
      <p className={css.spacing2x}>
        The line-height of typographic elements is an multiple of 6px on mobile and multiple of 8px
        on desktop. In addition to line-height, baselines are adjusted with vertical padding
        (the sum of those paddings will be 6px on mobile or 8px on desktop). As a result one can
        position following typographic elements with margins that are also multiples of 6px (or 8px).
      </p>
      <p className={css.spacing2x}>
        N.B. box-sizing is border-box, so borders affect to the total height of elements.
      </p>
      <p className={css.spacing2x}>
        TODO: breakpoints for desktop are missing (desktop fonts needs to be extracted.
      </p>
      <div className={fontsContainerClasses}>
        <Font
          component={() => (<h1>H1 (.h1Font): Lorem ipsum dolor sit amet</h1>)}
          description="Biggest font style. Used in main heading on a page. "
          styling={h1FontStyling}
        />
        <Font
          component={() => (<h2>H2 (.h2Font): Lorem ipsum dolor sit amet</h2>)}
          description="Works as a subtitle. Inline component using .h2Font can be aligned with .h1Font to the same baseline by dropping it 18px (e.g. with margin-top)."
          styling={h2FontStyling}
        />
        <Font
          component={() => (<h3>H3 (.h3Font): Lorem ipsum dolor sit amet</h3>)}
          description="Works as a subtitle and in sidebar menu."
          styling={h3FontStyling}
        />
        <Font
          component={() => (<h4>H4 (.h4Font): Lorem ipsum dolor sit amet</h4>)}
          description="Works as a subtitle."
          styling={h4FontStyling}
        />
        <Font
          component={() => (<h5>H5 (.h5Font): Lorem ipsum dolor sit amet</h5>)}
          description="Can be used as a subtitle and also as a label font for form inputs."
          styling={h5FontStyling}
        />
        <Font
          component={() => (<h6>H6 (.h6Font): Lorem ipsum dolor sit amet consectetur adebisci velit</h6>)}
          description="Works as a subtitle."
          styling={h6FontStyling}
        />
        <Font
          component={() => (<p>Default font (.bodyFont, p, button, etc.): Lorem ipsum dolor sit amet</p>)}
          description="Paragraphs and other body texts."
          styling={bodyFontStyling}
        />
        <Font
          component={() => (<p className={mpStyle.tinyFont}>Tiny mobile text (.tinyFont): Lorem ipsum dolor sit amet</p>)}
          description="Very small print."
          styling={tinyFontStyling}
        />
      </div>
    </div>
  );
};

export const Typography = {
  component: Fonts,
  props: {},
};
