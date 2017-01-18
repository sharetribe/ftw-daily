/**
 * This file exports variables that can be shared for both CSS and JS.
 *
 * The build process sets this the exports from this file as the
 * variables for postcss-custom-properties. These variables should
 * **not** have the -- prefix and cannot be overridden in CSS files.
 *
 * See: https://github.com/postcss/postcss-custom-properties
 *
 * Example when this file would export a `baseColor` value:
 *
 * In JavaScript, the module should be imported:
 *
 *     import cssVariables from '../../styles/variables';
 *
 *     const MyReactComponent = (props) =>
 *       <p style={{ color: cssVariables.baseColor }}>hello, world</p>;
 *
 * In CSS, no import is required:
 *
 *     .title {
 *       color: var(--baseColor);
 *     }
 *
 * This file should only be used for variables that are needed in both
 * JS and CSS. As this file is only imported in the start of the build
 * process, changes to this file require restarting the (dev)
 * server. For variables only needed in CSS, a separate CSS file with
 * those variables can be used to support hot loading changes with no
 * need to restart.
 *
 * Note that this file is required for the build process.
 */

module.exports = {};
