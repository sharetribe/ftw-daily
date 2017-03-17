/**
 * This module defines custom PropTypes shared within the application.
 *
 * To learn about validating React component props with PropTypes, see:
 *
 *     https://facebook.github.io/react/docs/typechecking-with-proptypes.html
 *
 * For component specific PropTypes, it's perfectly ok to inline them
 * to the component itself. If the type is shared or external (SDK or
 * API), however, it should be in this file for sharing with other
 * components.
 *
 * PropTypes should usually be validated only at the lowest level
 * where the props are used, not along the way in parents that pass
 * along the props to their children. Those parents should usually
 * just validate the presense of the prop key and that the value is
 * defined. This way we get the validation errors only in the most
 * specific place and avoid duplicate errros.
 */
import { PropTypes } from 'react';
import { types as sdkTypes } from './sdkLoader';

const { UUID, LatLng, LatLngBounds } = sdkTypes;
const { arrayOf, bool, func, instanceOf, number, oneOf, shape, string } = PropTypes;

// Fixed value
export const value = val => oneOf([val]);

// SDK type instances
export const uuid = instanceOf(UUID);
export const latlng = instanceOf(LatLng);
export const latlngBounds = instanceOf(LatLngBounds);

// Configuration for a single route
export const route = shape({
  name: string.isRequired,
  path: string.isRequired,
  exact: bool,
  strict: bool,
  component: func.isRequired,
  loadData: func,
});

// Place object from LocationAutocompleteInput
export const place = shape({
  address: string.isRequired,
  origin: latlng.isRequired,
  bounds: latlngBounds, // optional viewport bounds
});

// Denormalised user object
export const user = shape({
  id: uuid.isRequired,
  type: value('user').isRequired,
  attributes: shape({
    email: string.isRequired,
    profile: shape({
      firstName: string.isRequired,
      lastName: string.isRequired,
      slug: string.isRequired,
    }).isRequired,
  }),
});

// Denormalised image object
export const image = shape({
  id: uuid.isRequired,
  type: value('image').isRequired,
  attributes: shape({
    sizes: arrayOf(
      shape({
        width: number.isRequired,
        height: number.isRequired,
        name: string.isRequired,
        url: string.isRequired,
      })
    ).isRequired,
  }),
});

// Denormalised listing object
export const listing = shape({
  id: uuid.isRequired,
  type: value('listing').isRequired,
  attributes: shape({
    title: string.isRequired,
    description: string.isRequired,
    address: string.isRequired,
    geolocation: latlng.isRequired,
  }),
  author: user,
  images: arrayOf(image),
});
