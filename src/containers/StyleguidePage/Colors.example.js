import React from 'react';
import PropTypes from 'prop-types';
import css from './StyleguidePage.module.css';

const ColorCard = props => {
  const { mpColor, name, usage } = props;
  const colorClasses = mpColor || css.color;

  return (
    <div className={css.colorCard}>
      <div className={colorClasses} />
      <div className={css.colorDescription}>
        <p>
          <span>{name}</span>
          <br />
          <span className={css.tinyFont}>{usage}</span>
        </p>
      </div>
    </div>
  );
};

const { string } = PropTypes;

// Jest test strip off CSS classes (css is an empty object). Otherwise this could be required prop.
const defaultProps = { mpColor: undefined };
// Create a real undefined value, not just injecting a hopefully undefined object.
delete defaultProps.mpColor;
ColorCard.defaultProps = defaultProps;

ColorCard.propTypes = {
  mpColor: string,
  name: string.isRequired,
  usage: string.isRequired,
};

const MarketplaceColors = () => {
  return (
    <div className={css.content}>
      <p className={css.spacing2x}>
        Marketplace colors have three groups: branding color and its variations, action colors, and
        grey palette for fine tuning UI elements.
      </p>
      <div className={css.colorsContainer}>
        <div className={css.colorsGroup}>
          <ColorCard
            mpColor={css.marketplaceColorBackground}
            name="--marketplaceColor"
            usage="e.g. color: var(--marketplaceColor);"
          />
          <ColorCard
            mpColor={css.marketplaceColorLightBackground}
            name="--marketplaceColorLight"
            usage="e.g. color: var(--marketplaceColorLight);"
          />
          <ColorCard
            mpColor={css.marketplaceColorDarkBackground}
            name="--marketplaceColorDark"
            usage="e.g. color: var(--marketplaceColorDark);"
          />
        </div>
        <div className={css.colorsGroup}>
          <ColorCard
            mpColor={css.successColorBackground}
            name="--successColor"
            usage="e.g. color: var(--successColor);"
          />
          <ColorCard
            mpColor={css.failColorBackground}
            name="--failColor"
            usage="e.g. color: var(--failColor);"
          />
          <ColorCard
            mpColor={css.attentionColorBackground}
            name="--attentionColor"
            usage="e.g. color: var(--attentionColor);"
          />
        </div>
        <div className={css.colorsGroup}>
          <ColorCard
            mpColor={css.matterColorDarkBackground}
            name="--matterColorDark"
            usage="e.g. color: var(--matterColorDark);"
          />
          <ColorCard
            mpColor={css.matterColorBackground}
            name="--matterColor"
            usage="e.g. color: var(--matterColor);"
          />
          <ColorCard
            mpColor={css.matterColorAntiBackground}
            name="--matterColorAnti"
            usage="e.g. color: var(--matterColorAnti);"
          />
          <ColorCard
            mpColor={css.matterColorNegativeBackground}
            name="--matterColorNegative"
            usage="e.g. color: var(--matterColorNegative);"
          />
          <ColorCard
            mpColor={css.matterColorLightBackground}
            name="--matterColorLight"
            usage="e.g. color: var(--matterColorLight);"
          />
        </div>
      </div>
    </div>
  );
};

export const Colors = {
  component: MarketplaceColors,
  group: 'colors',
  props: {},
};
